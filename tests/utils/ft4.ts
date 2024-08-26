import { IClient, KeyPair } from "postchain-client";
import { createInMemoryFtKeyStore, createKeyStoreInteractor, createSingleSigAuthDescriptorRegistration, hours, registerAccount, ttlLoginRule, registrationStrategy } from "@chromia/ft4";

export async function createAccount(client: IClient, keyPair: KeyPair) {
  const keyStore = createInMemoryFtKeyStore(keyPair);
  const keyStoreInteractor = createKeyStoreInteractor(
    client,
    keyStore
  );
  if ((await keyStoreInteractor.getAccounts()).length > 0) {
    throw new Error("Account already exists");
  }

  const authDescriptor = createSingleSigAuthDescriptorRegistration(["A", "T"], keyPair.pubKey);
  const { session } = await registerAccount(client, keyStore, registrationStrategy.open(authDescriptor, {
    config: {
      rules: ttlLoginRule(hours(1)),
      flags: []
    }
  }));
  return session;
}