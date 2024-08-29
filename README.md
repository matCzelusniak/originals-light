# Originals Light -

The Originals Light protocol is a library built on Chromia's relational blockchain that allows the development of decentralized applications without predetermined standards, featuring dynamic attributes and a modular approach.

Dynamic attributes allow the description of real-world assets without the limitations imposed by standards like pure Yours Protocol, ERC-20, ERC-721, or ERC-1155.

## 🌟 Documentation

https://matczelusniak.gitbook.io/originals-light

## 🌟 Key Features

- **Dynamic On-Chain Metadata**: Keep your metadata intact while leveraging generic operations and queries. Minimal code, maximum possibilities
- **Dynamic On-Chain Metadata**: Predefined algorithms for metadata. User predefined algorithms like rarity calculation with dynamic attributes.
- **Versatile Token Support**: Accommodate all meaning token types like ERC20, ERC721, ERC1155 as interface with specified metadata. Generate your own schema/interface for required metadata.
- **Interoperable Schema**: Use standardized ft4 lib for cross-chain transfers.
- **Interface-Approach**: Use interfaces to authorize access to specific resources. Burnable, Holder, Soulbound interfaces that would be implemented without attributes.
- **No extra wrappers**: No wrappers for ft4 assets, transfers etc. Keep performance good as ft4 is.
- **Compability**: FT4 library under the hood. Easier cross chain (standardized) communication.
- **Keep as you want**: Keep your metadata in your own entities with your own queries and operations if you want.
- **Partial usage**: Use only attributes if you don't need interfaces and asset type checking.

## 🌟 Example

Run tests by command 'chr test' in main directory.

Application example_dapp_dynamic_attribute

- Feature dynamic attributes enabled
- Dynamic attributes without obligatory interface
- Possibility of checking required attributes for specific asset in dedicated operation/function or with extension
- Comparison to the example dapp yours-protocol-dynamic/src/example_dapp2/avatars.
- Less entities in compare to the yours-protocol-dynamic/src/example_dapp2/avatars
- Usage generic functions for dynamic attributes.

Application example_dapp_assets_erc_721_standarized

- Example shows importer dapp with standarized metadata schema for asset
- Feature dynamic attributes enabled
- Schema by interface
- Possibility of checking required attributes for specific asset in dedicated operation/function or with extension

Application example_dapp_one_chain_battle_game

- Example of assets for simple battle game
- Linking one asset to another (helmet to hero)
- Support for interfaces/types