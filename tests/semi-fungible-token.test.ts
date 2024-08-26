import { IClient, encryption } from "postchain-client";
import { createAccount } from "./utils/ft4";
import { getTestEnvironment, teardown, TestEnvironment } from "./utils/setup";
import { TEST_PROJECT, TIMEOUT_SETUP, TIMEOUT_TEST } from "./utils/constants";
import { op } from "@chromia/ft4";
import { TokenMetadata } from "./utils/types";
import { serializeTokenMetadata } from "./utils/metadata";
import { expect } from "@jest/globals";
import { randomCollectionName } from "./utils/random";

describe('Semi-Fungible Token', () => {
  let environment: TestEnvironment;

  beforeAll(async () => {
    environment = await getTestEnvironment();
  }, TIMEOUT_SETUP);

  afterAll(async () => {
    await teardown();
  }, TIMEOUT_SETUP);

  it('able to create a Semi-Fungible Token', async () => {
    const keyPair = encryption.makeKeyPair();
    const session = await createAccount(environment.dapp1Client, keyPair);

    const collection = randomCollectionName();

    const tokenMetadata: TokenMetadata = {
      name: `A Test Semi-Fungible Token`,
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
      .add(op("importer.sft", serializeTokenMetadata(tokenMetadata)))
      .buildAndSend();
  }, TIMEOUT_TEST);

  it('able to mint a Semi-Fungible Token', async () => {
    const keyPair = encryption.makeKeyPair();
    const session = await createAccount(environment.dapp1Client, keyPair);

    const collection = randomCollectionName();

    const tokenMetadata: TokenMetadata = {
      name: `A Test Semi-Fungible Token`,
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

    const mintAmount = 2;
    await session.transactionBuilder()
      .add(op("importer.sft", serializeTokenMetadata(tokenMetadata)))
      .add(op("importer.mint", TEST_PROJECT, collection, 0, mintAmount))
      .buildAndSend();

    const balance = await session.query<number>(
      "yours.balance", 
      { 
        account_id: session.account.id, 
        project: TEST_PROJECT, 
        collection, 
        token_id: 0
      }
    );
    expect(balance).toBe(mintAmount)
  }, TIMEOUT_TEST);

  it('SFT has correct metadata', async () => {
    const keyPair = encryption.makeKeyPair();
    const session = await createAccount(environment.dapp1Client, keyPair);

    const collection = randomCollectionName();

    const tokenMetadata: TokenMetadata = {
      name: `A Test Semi-Fungible Token`,
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
      .add(op("importer.sft", serializeTokenMetadata(tokenMetadata)))
      .add(op("importer.mint", TEST_PROJECT, collection, 0, 1))
      .buildAndSend();

    const metadata = await session.query<TokenMetadata>("yours.metadata", { project: TEST_PROJECT, collection, token_id: 0 });
    expect(metadata.name).toBe(tokenMetadata.name);
    expect(metadata.properties["simple_property"]).toEqual(tokenMetadata.properties.simple_property);
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