import { TokenMetadata } from "./types";

export function serializeTokenMetadata(metadata: TokenMetadata): any[] {
  const yours: any[] = [
    metadata.yours.modules,
    metadata.yours.project,
    metadata.yours.collection,
  ];

  const result: any[] = [
    metadata.name,
    JSON.stringify(metadata.properties),
    yours,
    metadata.description ?? null,
    metadata.image ?? null,
    metadata.animation_url ?? null,
    // metadata.decimals ?? null,
  ];

  return result;
}