import { encryption } from "postchain-client";
import { createAccount } from "./utils/ft4";
import { getTestEnvironment, teardown, TestEnvironment } from "./utils/setup";
import { TIMEOUT_SETUP } from "./utils/constants";

describe('FT4', () => {
  let environment: TestEnvironment;

  beforeAll(async () => {
    environment = await getTestEnvironment();
  }, TIMEOUT_SETUP);

  afterAll(async () => {
    await teardown();
  }, TIMEOUT_SETUP);

  it('able to register an account to dapp1', async () => {
    const keyPair = encryption.makeKeyPair();
    const session = await createAccount(environment.dapp1Client, keyPair);
    expect(session).toBeDefined();
    expect(session.account).toBeDefined();
  });

  it('able to register an account to dapp2', async () => {
    const keyPair = encryption.makeKeyPair();
    const session = await createAccount(environment.dapp2Client, keyPair);
    expect(session).toBeDefined();
    expect(session.account).toBeDefined();
  });
});