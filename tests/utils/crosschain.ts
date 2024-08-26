import { Session, transactionBuilder } from "@chromia/ft4";
import { noopAuthenticator, op } from "@chromia/ft4";
import { TokenMetadata } from "./types";
import { IClient } from "postchain-client";
import { serializeTokenMetadata } from "./metadata";

export async function performCrossChainTransfer(
  fromSession: Session,
  toChain: IClient,
  toAccountId: Buffer,
  tokenId: number,
  amount: number,
  metadata: TokenMetadata
): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await fromSession.transactionBuilder()
        .add(op(
          "yours.init_transfer",
          toAccountId,
          metadata.yours.project,
          metadata.yours.collection,
          tokenId,
          amount,
          serializeTokenMetadata(metadata)
        ), {
          onAnchoredHandler: async (initData: any) => {
            if (!initData) throw new Error("No data provided after init_transfer");
            const iccfProofOperation = await initData.createProof(toChain.config.blockchainRid);
            await transactionBuilder(noopAuthenticator, toChain)
              .add(iccfProofOperation, {
                authenticator: noopAuthenticator,
              })
              .add(op(
                "yours.apply_transfer",
                initData.tx,
                initData.opIndex
              ), {
                authenticator: noopAuthenticator,
                onAnchoredHandler: async (applyData: any) => {
                  if (!applyData) throw new Error("No data provided after apply_transfer");
                  const iccfProofOperation = await applyData.createProof(fromSession.blockchainRid);
                  await fromSession.transactionBuilder()
                    .add(iccfProofOperation, {
                      authenticator: noopAuthenticator,
                    })
                    .add(op(
                      "yours.complete_transfer",
                      applyData.tx,
                      applyData.opIndex
                    ), {
                      authenticator: noopAuthenticator,
                    })
                    .buildAndSend();
                }
              })
              .buildAndSendWithAnchoring();

            resolve();
          }
        })
        .buildAndSendWithAnchoring();
    } catch (error) {
      reject(error);
    }
  });
}
