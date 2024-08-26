import { getTestEnvironment, teardown, TestEnvironment } from "./utils/setup";
import { TEST_PROJECT, TIMEOUT_SETUP, TIMEOUT_TEST } from "./utils/constants";
import { createAccount } from "./utils/ft4";
import { serializeTokenMetadata } from "./utils/metadata";
import { randomCollectionName } from "./utils/random";
import { TokenMetadata } from "./utils/types";
import { encryption } from "postchain-client";
import { performCrossChainTransfer } from "./utils/crosschain";
import { op, Session } from "@chromia/ft4";

describe('Crosschain', () => {
  let environment: TestEnvironment;

  beforeAll(async () => {
    environment = await getTestEnvironment();
  }, TIMEOUT_SETUP);

  afterAll(async () => {
    await teardown();
  }, TIMEOUT_SETUP);

  it('able to parse and update properties', async () => {
    // Arrange
    const keyPair = encryption.makeKeyPair();
    const dapp1Session = await createAccount(environment.dapp1Client, keyPair);
    const dapp2Session = await createAccount(environment.dapp2Client, keyPair);

    const collection = randomCollectionName();
    const tokenMetadata = createTokenMetadata(collection);

    const tokenId = 0;
    const params: CrosschainTestParams = {
      dapp1Session,
      dapp2Session,
      tokenType: 'nft',
      collection,
      tokenId,
      mintAmount: 1,
      tokenMetadata,
      transferAmount: 1
    }

    // Act
    await testCrossChainTransfer(params);

    // Verify
    const metadataDapp2 = await dapp2Session.query<TokenMetadata>("yours.metadata", { project: TEST_PROJECT, collection, token_id: tokenId });
    expect(metadataDapp2.properties["times_bridged"]).toEqual(1);
  }, TIMEOUT_TEST);

  it('able to parse and update properties when returning from crosschain', async () => {
    // Arrange
    const keyPair = encryption.makeKeyPair();
    const dapp1Session = await createAccount(environment.dapp1Client, keyPair);
    const dapp2Session = await createAccount(environment.dapp2Client, keyPair);

    const collection = randomCollectionName();
    const tokenMetadata = createTokenMetadata(collection);

    const tokenId = 0;
    const params: CrosschainTestParams = {
      dapp1Session,
      dapp2Session,
      tokenType: 'nft',
      collection,
      tokenId,
      mintAmount: 1,
      tokenMetadata,
      transferAmount: 1
    }

    // Act
    await testCrossChainTransfer(params);

    const destinationMetadata = await dapp2Session.query<TokenMetadata>("yours.metadata", { project: TEST_PROJECT, collection, token_id: tokenId });
    console.log("destinationMetadata", destinationMetadata);
    await performCrossChainTransfer(
      dapp2Session,
      environment.dapp1Client,
      dapp1Session.account.id,
      tokenId,
      1,
      destinationMetadata
    );

    // Verify
    const sourceMetadata = await dapp1Session.query<TokenMetadata>("yours.metadata", { project: TEST_PROJECT, collection, token_id: tokenId });
    console.log("sourceMetadata", sourceMetadata);
    expect(sourceMetadata.properties["times_bridged"]).toEqual(2);
  }, TIMEOUT_TEST);

  it('able to bridge a Non-Fungible Token with expected properties following along', async () => {
    // Arrange
    const keyPair = encryption.makeKeyPair();
    const dapp1Session = await createAccount(environment.dapp1Client, keyPair);
    const dapp2Session = await createAccount(environment.dapp2Client, keyPair);

    const collection = randomCollectionName();
    const tokenMetadata = createTokenMetadata(collection);
    const tokenId = 0;
    const params: CrosschainTestParams = {
      dapp1Session,
      dapp2Session,
      tokenType: 'nft',
      collection,
      tokenId,
      mintAmount: 1,
      tokenMetadata,
      transferAmount: 1
    }

    // Act
    await testCrossChainTransfer(params);

    // Verify
    const metadataDapp2 = await dapp2Session.query<TokenMetadata>("yours.metadata", { project: TEST_PROJECT, collection, token_id: tokenId });
    expect(metadataDapp2.properties.simple_property).toEqual(tokenMetadata.properties.simple_property);
    expect(metadataDapp2.properties.rich_property).toEqual(tokenMetadata.properties.rich_property);
    expect(metadataDapp2.properties.array_property).toEqual(tokenMetadata.properties.array_property);
  }, TIMEOUT_TEST);

  it('able to bridge a Semi-Fungible Token', async () => {
    // Arrange
    const keyPair = encryption.makeKeyPair();
    const dapp1Session = await createAccount(environment.dapp1Client, keyPair);
    const dapp2Session = await createAccount(environment.dapp2Client, keyPair);

    const collection = randomCollectionName();
    const tokenMetadata = createTokenMetadata(collection);
    const tokenId = 0;
    const params: CrosschainTestParams = {
      dapp1Session,
      dapp2Session,
      tokenType: 'sft',
      collection,
      tokenId,
      tokenMetadata,
      mintAmount: 20,
      transferAmount: 15
    }

    // Act
    await testCrossChainTransfer(params);

    // Verify
    const metadataDapp2 = await dapp2Session.query<TokenMetadata>("yours.metadata", { project: TEST_PROJECT, collection, token_id: tokenId });
    expect(metadataDapp2.properties.simple_property).toEqual(tokenMetadata.properties.simple_property);
    expect(metadataDapp2.properties.rich_property).toEqual(tokenMetadata.properties.rich_property);
    expect(metadataDapp2.properties.array_property).toEqual(tokenMetadata.properties.array_property);
  }, TIMEOUT_TEST);

  const createTokenMetadata = (collection: string, name: string = "A Test Token"): TokenMetadata => ({
    name,
    properties: {
      simple_property: "example value",
      rich_property: {
        name: "Name",
        value: "123",
        display_value: "123 Example Value",
        class: "emphasis",
        css: {
          color: "#ffffff",
          "font-weight": "bold",
          "text-decoration": "underline"
        }
      },
      array_property: {
        name: "Name",
        value: [1, 2, 3, 4],
        class: "emphasis"
      }
    },
    yours: {
      modules: [],
      project: TEST_PROJECT,
      collection,
    },
    description: "A Test Description",
    image: "A Test Image",
    animation_url: "A Test Animation"
  });

  type CrosschainTestParams = {
    dapp1Session: Session;
    dapp2Session: Session;
    tokenType: 'nft' | 'sft';
    collection: string;
    tokenId: number;
    tokenMetadata: TokenMetadata;
    mintAmount: number;
    transferAmount: number;
  }

  const testCrossChainTransfer = async (params: CrosschainTestParams) => {
    if (params.tokenType === 'nft') {
      await params.dapp1Session.transactionBuilder()
        .add(op("importer.nft", serializeTokenMetadata(params.tokenMetadata), params.tokenId))
        .buildAndSend();
    } else {
      await params.dapp1Session.transactionBuilder()
        .add(op("importer.sft", serializeTokenMetadata(params.tokenMetadata)))
        .add(op("importer.mint", TEST_PROJECT, params.collection, params.tokenId, params.mintAmount))
        .buildAndSend();
    }

    const metadata = await params.dapp1Session
      .query<TokenMetadata>("yours.metadata", {
        project: TEST_PROJECT,
        collection: params.collection,
        token_id: params.tokenId
      });

    await performCrossChainTransfer(
      params.dapp1Session,
      params.dapp2Session.client,
      params.dapp2Session.account.id,
      params.tokenId,
      params.transferAmount,
      metadata
    );

    const dapp1Balance = await params.dapp1Session.query<number>(
      "yours.balance",
      {
        account_id: params.dapp1Session.account.id,
        project: TEST_PROJECT,
        collection: params.collection,
        token_id: params.tokenId
      }
    );
    expect(dapp1Balance).toBe(params.mintAmount - params.transferAmount);

    const dapp2Balance = await params.dapp2Session.query<number>(
      "yours.balance",
      {
        account_id: params.dapp2Session.account.id,
        project: TEST_PROJECT,
        collection: params.collection,
        token_id: params.tokenId
      }
    );
    expect(dapp2Balance).toBe(params.transferAmount);
  };
});