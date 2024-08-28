# Asset Module Overview

The **Asset Module** in the Originals-light library is designed to manage digital assets on the Chromia blockchain using the FT4 standard under the hood. This module provides functions for asset registration, minting with passing attributes and extendable hooks for custom behaviors.

## Key Functions

### Asset Registration

- **`register_asset`**: Registers a new asset with attributes.
- **`before_register_asset`** & **`after_register_asset`**: Hooks for extending behavior before and after registration.

### Minting

- **`mint_asset`**: Mints assets to specified accounts.
- **`before_mint`** & **`after_mint`**: Extendable functions for custom logic during minting.
- **`get_accounts_to_mint`**: Retrieves the list of accounts eligible for minting.

### Combined Operations

- **`register_and_mint_asset`**: Combines registration and minting in a single operation.

## Extendability

Each operation is extendable, allowing developers to inject custom logic at various stages, such as before or after asset registration, minting, or account selection. This flexibility ensures that the library can be adapted to various use cases and integrated with additional features as needed.

The design promotes a modular and extendable approach, enabling developers to tailor asset management to the specific needs of their decentralized applications.

## Dependencies

The **Asset Module** in the Originals-light library relies on several key dependencies to function effectively:

- **`ft_assets`**: Imported from `lib.ft4.core.assets` and `lib.ft4.assets`, this is the core library for managing FT4 assets, handling tasks like asset registration and minting.
- **`ft_accounts`**: Imported from `lib.ft4.core.accounts`, this handles account-related operations, especially during asset minting.
- **`attributes`**: Imported from `^.attributes` and `^^.core.attributes`, this module manages the dynamic attributes associated with assets.

These dependencies ensure seamless integration with the FT4 standard and robust asset management capabilities within the Chromia blockchain ecosystem.
