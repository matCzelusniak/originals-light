/**
 * Manual setup of the test environment.
 * 
 * This is a manual setup because we need to create the network and the database
 * manually. We do this because the testcontainers library does not support
 * having a predictable port for the Chromia Node exposed externally which causes
 * issues in Directory Chain Query `cm_get_blockchain_api_urls` because it returns 7740
 * instead of the actual port exposed by TestContainers.
 */
import { config } from 'dotenv';
import { createClient, IClient } from 'postchain-client';
import { exec } from 'child_process';
import { promisify } from 'util';
import { spawn } from 'child_process';

const execAsync = promisify(exec);

config();

export interface TestEnvironment {
  networkName: string;
  postgresPort: number;
  nodePort: number;
  dapp1Client: IClient;
  dapp2Client: IClient;
}

export async function getTestEnvironment(): Promise<TestEnvironment> {
  const networkName = `chromia-test-network-${Date.now()}`;
  const postgresPort = 5432;
  const nodePort = 7740;

  await teardown();

  // Create a Docker network
  await execAsync(`docker network create ${networkName}`);

  // Start PostgreSQL container
  await execAsync(`
    docker run -d --name postgres-test \
      --network ${networkName} \
      -p ${postgresPort}:5432 \
      -e POSTGRES_DB=postchain \
      -e POSTGRES_PASSWORD=postchain \
      -e POSTGRES_USER=postchain \
      postgres:14.9-alpine3.18
  `);

  await waitForContainerInitialization(`postgres-test`, 'PostgreSQL init process complete');

  // Start Chromia node container
  await execAsync(`
    docker run -d --name chromia-node-test \
      --network ${networkName} \
      -p ${nodePort}:${nodePort} \
      -e CHR_DB_URL=jdbc:postgresql://postgres-test/postchain \
      -v ${process.cwd()}:/usr/app \
      ${process.env.CLI_IMAGE} \
      chr node start --directory-chain-mock -p api.port=${nodePort}
  `);

  await waitForContainerInitialization(`chromia-node-test`, 'Node is initialized');

  const dapp1Client = await createClient({
    directoryNodeUrlPool: `http://localhost:${nodePort}`,
    blockchainIid: 1,
  });
  
  const dapp2Client = await createClient({
    directoryNodeUrlPool: `http://localhost:${nodePort}`,
    blockchainIid: 2,
  });

  return {
    networkName,
    postgresPort,
    nodePort,
    dapp1Client,
    dapp2Client,
  };
}

function waitForContainerInitialization(containerName: string, message: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const logs = spawn('docker', ['logs', '-f', containerName]);

    logs.stdout.on('data', (data) => {
      if (data.toString().includes(message)) {
        logs.kill();
        resolve();
      }
    });

    setTimeout(() => {
      logs.kill();
      reject(new Error('Timeout waiting for node initialization'));
    }, 15000);
  });
}

async function isContainerRunning(containerName: string): Promise<boolean> {
  try {
    const { stdout } = await execAsync(`docker container inspect -f '{{.State.Running}}' ${containerName}`);
    return stdout.trim() === 'true';
  } catch (error) {
    return false;
  }
}

async function cleanupEnvironment() {
  const containersToRemove = ['chromia-node-test', 'postgres-test'];
  
  for (const container of containersToRemove) {
    if (await isContainerRunning(container)) {
      await execAsync(`docker stop ${container}`);
      await execAsync(`docker rm ${container}`);
    }
  }
  
  // Remove all networks that start with our test network prefix
  const { stdout } = await execAsync(`docker network ls --filter "name=chromia-test-network-" --format "{{.Name}}"`);
  const networks = stdout.split('\n').filter(Boolean);
  for (const network of networks) {
    await execAsync(`docker network rm ${network}`);
  }
}

export async function teardown() {
  await cleanupEnvironment();
}