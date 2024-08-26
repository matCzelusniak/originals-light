# Originals Light -

The Originals Light protocol is a library built on Chromia's relational blockchain that allows the development of decentralized applications without predetermined standards, featuring dynamic attributes and a modular approach.

Dynamic attributes allow the description of real-world assets without the limitations imposed by standards like pure Yours Protocol, ERC-20, ERC-721, or ERC-1155.

## 🌟 Key Features

- **Dynamic On-Chain Metadata**: Keep your metadata intact while leveraging generic operations and queries. Minimal code, maximum possibilities
- **Dynamic On-Chain Metadata**: Predefined algorithms for metadata. User predefined algorithms like rarity calculation with dynamic attributes.
- **Versatile Token Support**: Accommodate all meaning token types like ERC20, ERC721, ERC1155 as interface with specified metadata. Generate your own schema/interface for required metadata.
- **Interoperable Schema**: Use standardized ft4 lib for cross-chain transfers.
- **Mulit-Approach**: Uset what you want. Modular approach or existing operations.
- **No extra wrappers**: No wrappers for ft4 assets, transfers etc. Keep performance good as ft4 is.
- **Compability**: FT4 library under the hood. Easier cross chain (standardized) communication.
- **Keep as you want**: Keep your metadata in your own entities with your queries and operations if you want.

## Description

Interface is just 'declaration' of type and when you create asset with specific type (type/interface is optionl) you create definition

## 🌟 Example

Application example_dapp_dynamic_attribute
Run by command 'chr test' in main directory.

- Feature dynamic attributes enabled
- Dynamic attributes without obligatory interface
- Possibility of checking required attributes for specific asset in dedicated operation/function or with extension
- Comparison to the example dapp yours-protocol-dynamic/src/example_dapp2/avatars.
- Less entities in compare to the yours-protocol-dynamic/src/example_dapp2/avatars
- Usage generic functions for dynamic attributes.

Application example_dapp_assets_erc_721_standarized
Run by command 'chr test' in main directory.

- Example shows importer dapp with standarized metadata schema for asset
- Feature dynamic attributes enabled
- Dynamic attributes without obligatory interface
- Possibility of checking required attributes for specific asset in dedicated operation/function or with extension
- Comparison to the example dapp yours-protocol-dynamic/src/example_dapp2/avatars.
- Less entities in compare to the yours-protocol-dynamic/src/example_dapp2/avatars
- Usage of generic functions for dynamic attributes.

## 🌟 Features proposal

- **Dynamic Atributes as optional module**: is possible to add entity attrbutes as additional module and not require it in regsiter/mint time.

<!-- ## 📚 Documentation

For comprehensive information about Yours Protocol, please visit our [official documentation](https://docs.megayours.com/yours-protocol). -->

<!-- ### 🚀 Getting Started

New to Yours Protocol? Our [Getting Started guide](https://docs.megayours.com/yours-protocol/getting-started) will help you with everything that you need to get going.

### 🧩 Core Concepts

- [Tokens](https://docs.megayours.com/yours-protocol/tokens)
- [Modules](https://docs.megayours.com/yours-protocol/modules)
- [Metadata](https://docs.megayours.com/yours-protocol/metadata)
- [Interoperability](https://docs.megayours.com/yours-protocol/interoperability)

## 💻 Installation

```yaml
libs:
  ft4:
    registry: https://gitlab.com/chromaway/ft4-lib.git
    path: rell/src/lib/ft4
    tagOrBranch: v1.0.0r
    rid: x"FA487D75E63B6B58381F8D71E0700E69BEDEAD3A57D1E6C1A9ABB149FAC9E65F"
    insecure: false
  iccf:
    registry: https://gitlab.com/chromaway/core/directory-chain
    path: src/iccf
    tagOrBranch: 1.32.2
    rid: x"1D567580C717B91D2F188A4D786DB1D41501086B155A68303661D25364314A4D"
    insecure: false
  yours:
    registry: ---
    path: src/lib/yours
    tagOrBranch: ---
    rid: x"---"
    insecure: false
```

After adding these to your `chromia.yml` file, run `chr install` to pull in the dependencies.

## 🤝 Contributing

We welcome contributions from the community! If you're interested in helping improve Yours Protocol, please check out our [Contributing Guide](https://docs.megayours.com/contributing) for more information on how to get started. -->
