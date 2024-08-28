# 🏷️ Attributes Module Overview

The **Attributes Module** in the Originals-light library is responsible for managing dynamic attributes associated with assets on the Chromia blockchain. This module provides extendable functions to add, update, and retrieve attributes, allowing for flexible asset management.

## Key Functions

### Adding Attributes

- **`add_attribute_to_asset`**: Adds a new attribute to an asset. The process includes pre- and post-operation hooks (`before_add_attribute_to_asset`, `after_add_attribute_to_asset`) to allow custom logic before and after the attribute is added.

### Updating Attributes

- **`update_attribute`**: Updates an existing attribute's value for a specified asset. It also includes extendable hooks (`before_update_attribute`, `after_update_attribute`) for injecting custom logic during the update process.

### Retrieving Attributes

- **`get_asset_attributes`**: Retrieves all attributes associated with a particular asset.

## Attribute Types

Currently the module supports various attribute types, including:

- `boolean`
- `byte_array`
- `decimal`
- `integer`
- `text`
- `big_integer`
- `asset_id`

And plans for containers lik:

- `list`
- `set`
- `map`

These types ensure that attributes can be tailored to meet the specific needs of different assets.

## Additional Utilities

- **`check_required_attributes`**: A utility function that verifies all required attributes are present for an asset, ensuring compliance with predefined rules.

## Dependencies

This module depends on the core `ft_assets` from the FT4 standard, as well as internal and external attribute libraries, enabling seamless attribute management and integration within the broader asset management framework.
