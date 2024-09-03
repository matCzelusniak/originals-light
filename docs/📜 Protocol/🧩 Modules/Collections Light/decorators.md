# 🔧🔧 Decorators Overview

In the `collections_light` module, decorators are used to extend or modify the behavior of core functions like `add_asset_to_collection` and `get_collection`. These decorators can add additional functionality, such as logging or enforcing requirements, without altering the original implementation of these functions. 

Decorators are NOT imported in default. User of library can decide if they want to use.

## 1. Loggers Decorator

**Location:**  
`originals_light/core/collections_light/decorators/loggers`

### Purpose
The decorators are designed to add capabilities to the core functions without modifying it. This helps in tracking the execution flow and debugging by providing insights into the operations performed by the `get_collection` and `add_asset_to_collection` functions.

### Example Usage for requirements:
```rell
@extend (collections_light.before_add_asset_to_collection)
function (
  asset_id: byte_array,
  collection_id: text
) {
  //check if collection exists
  collections.Collection(collection_id);
  //check if asset exists
  ft_assets.Asset(asset_id);
}
```

### Example Usage for logger:
```rell
@extend (collections_light.before_add_asset_to_collection)
function (
  asset_id: byte_array,
  collection_id: text
) {
  print("Assigning asset %s to collection %s".format(asset_id, collection_id));
}
```
