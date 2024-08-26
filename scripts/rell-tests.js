const { spawnSync, exec } = require('child_process');
const path = require('path');
require('dotenv').config();

const rellDirectory = path.join(__dirname, '..', 'rell');
console.log('Executing tests for', rellDirectory);

function verifyDocker() {
  const { status } = spawnSync(`docker ps`, { shell: true });
  console.log('Docker is running!');

  if (status !== 0) {
    console.error('Docker is not running');
    process.exit(1);
  }
}

async function test(config) {
  const currentWorkingDirectory = process.cwd();
  const baseCommand = `docker run --rm --network yours_network -v ${currentWorkingDirectory}:/usr/app ${process.env.CLI_IMAGE} chr test --use-db`;
  const command = config.tests
    //? `${baseCommand} --sql-log --tests ${config.tests}`
    ? `${baseCommand} --tests ${config.tests}`
    : baseCommand;

  console.log(command);

  try {
    const { status } = spawnSync(command, { shell: true, stdio: 'inherit' });

    if (status !== 0) {
      console.error('Tests failed');
      process.exit(1);
    }
  } finally {
    spawnSync('npm run stop', { shell: true });
  }
}

async function main() {
  const config = {
    tests: process.env.npm_config_filter,
  };
  verifyDocker();
  await test(config);
}

const prestartCommand =
  'npm run prestart:test';

exec(`${prestartCommand}`, (err, stdout, stderr) => {
  if (err) {
    console.error('PRESTART EXEC ERRROR:', '\n', err);
    return;
  }

  if (stderr) console.error('PRESTART ERROR:', '\n', stderr);

  console.log('PRESTART DONE AS:', '\n', `  RESULT: ${stdout}`);
  main();
});
