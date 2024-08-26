import { encryption } from "postchain-client";
import { createAccount } from "./utils/ft4";
import { getTestEnvironment, teardown, TestEnvironment } from "./utils/setup";
import { TEST_PROJECT, TIMEOUT_SETUP, TIMEOUT_TEST } from "./utils/constants";
import { op } from "@chromia/ft4";
import { TokenMetadata } from "./utils/types";
import { serializeTokenMetadata } from "./utils/metadata";
import { expect } from "@jest/globals";
import { randomCollectionName } from "./utils/random";

describe('Non-Fungible Token', () => {
  let environment: TestEnvironment;

  beforeAll(async () => {
    environment = await getTestEnvironment();
  }, TIMEOUT_SETUP);

  afterAll(async () => {
    await teardown();
  }, TIMEOUT_SETUP);

  it('able to create a Non-Fungible Token', async () => {
    const keyPair = encryption.makeKeyPair();
    const session = await createAccount(environment.dapp1Client, keyPair);

    const collection = randomCollectionName();
    const tokenId = 0;

    const tokenMetadata: TokenMetadata = {
      name: `Avatar #${tokenId}`,
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
    };

    await session.transactionBuilder()
      .add(op("importer.nft", serializeTokenMetadata(tokenMetadata), tokenId))
      .buildAndSend();

    const balance = await session.query<number>(
      "yours.balance", 
      { 
        account_id: session.account.id, 
        project: TEST_PROJECT, 
        collection, 
        token_id: tokenId 
      }
    );
    expect(balance).toBe(1);
  }, TIMEOUT_TEST);

  it('NFT has correct metadata', async () => {
    const keyPair = encryption.makeKeyPair();
    const session = await createAccount(environment.dapp1Client, keyPair);

    const collection = randomCollectionName();
    const tokenId = 1;

    const tokenMetadata: TokenMetadata = {
      name: `Avatar #${tokenId}`,
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
      description: "Avatar Description",
      image: "Avatar Image",
      animation_url: "Avatar Animation"
    };

    const serializedMetadata = serializeTokenMetadata(tokenMetadata);

    await session.transactionBuilder()
      .add(op("importer.nft", serializedMetadata, tokenId))
      .buildAndSend();

    const metadata = await session.query<TokenMetadata>("yours.metadata", { project: TEST_PROJECT, collection, token_id: tokenId });
    expect(metadata.name).toBe(tokenMetadata.name);
    expect(metadata.properties["rich_property"]["name"]).toEqual(tokenMetadata.properties.rich_property["name"]);
    expect(metadata.properties["rich_property"]["value"]).toEqual(tokenMetadata.properties.rich_property["value"]);
    expect(metadata.properties["rich_property"]["display_value"]).toEqual(tokenMetadata.properties.rich_property["display_value"]);
    expect(metadata.properties["rich_property"]["class"]).toEqual(tokenMetadata.properties.rich_property["class"]);
    expect(metadata.properties["rich_property"]["css"]["color"]).toEqual(tokenMetadata.properties.rich_property["css"]["color"]);
    expect(metadata.properties["rich_property"]["css"]["font-weight"]).toEqual(tokenMetadata.properties.rich_property["css"]["font-weight"]);
    expect(metadata.properties["rich_property"]["css"]["text-decoration"]).toEqual(tokenMetadata.properties.rich_property["css"]["text-decoration"]);
    expect(metadata.yours.modules).toBeDefined();
    expect(metadata.yours.project).toEqual(tokenMetadata.yours.project);
    expect(metadata.yours.collection).toEqual(tokenMetadata.yours.collection);
    expect(metadata.description).toBe(tokenMetadata.description);
    expect(metadata.image).toBe(tokenMetadata.image);
    expect(metadata.animation_url).toBe(tokenMetadata.animation_url);
  }, TIMEOUT_TEST);
});