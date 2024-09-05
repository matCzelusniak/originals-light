# 🧺 🧺 Collections Light Module - Overview

The `collections_light` module is a part of the `originals_light` core library. It is responsible for managing the association between assets and collections within the system. This module provides functions to add assets to collections, retrieve collection information, and offers extendable hooks for custom behavior before and after assets are added to collections.

## Files and Components

### 1. **`extendables.rell`**
   This file defines extendable functions that can be overridden to customize behavior:

   - **`before_add_asset_to_collection`**  
     This extendable function is called before an asset is added to a collection.
     ```plaintext
     @extendable
     function before_add_asset_to_collection(
       asset_id: byte_array,
       collection_id: text
     );
     ```
   - **`after_add_asset_to_collection`**  
     This extendable function is called after an asset has been added to a collection.
     ```plaintext
     @extendable
     function after_add_asset_to_collection(
       collection_asset
     );
     ```

### 2. **`functions.rell`**
   This file contains the core functions used to interact with collections:

   - **`get_collection`**  
     Retrieves the collection associated with a given asset ID.
     ```plaintext
     function get_collection(asset_id: byte_array): collections.collection? {
       return collection_asset @? {.asset.id == asset_id}(.collection);
     }
     ```

   - **`add_asset_to_collection`**  
     Adds an asset to a specified collection. This function calls the extendable functions before and after the asset is added.
     ```plaintext
     function add_asset_to_collection(asset_id: byte_array, collection_id: text) {
       before_add_asset_to_collection(asset_id, collection_id);
       
       var collection_asset_added = create collection_asset(
         .asset = ft_assets.Asset(asset_id),
         .collection = collections.Collection(collection_id)
       );

       after_add_asset_to_collection(collection_asset_added);
     }
     ```

### 3. **`model.rell`**
   The `model.rell` file defines the data models (entities) for collections and asset relation 

### 4. **`module.rell`**
   The `module.rell` file imports necessary libraries and modules:

   - **Imports**:
     ```plaintext
     import collections: lib.collections;
     import ft_assets: lib.ft4.assets;
     ```

### 5. **`external/collections_light`**
   The external module is designed to interact with the core `collections_light` functions from outside the core library.

   - **`module.rell`**  
     Imports the core `collections_light` module and necessary libraries.
     ```plaintext
     module;
     import ^^.core.collections_light;
     import collections: lib.collections;
     ```

   - **`operations.rell`**  
     Defines operations that can be executed, such as adding an asset to a collection:
     ```plaintext
     operation add_asset_to_collection(asset_id: byte_array, collection_id: text) {
       collections_light.add_asset_to_collection(asset_id, collection_id);
     }
     ```

   - **`queries.rell`**  
     Provides query functions to retrieve information about collections for specific asset:
     ```plaintext
     query get_collection(asset_id: byte_array): struct<collections.collection>? {
       val collection = collections_light.get_collection(asset_id);
       if(collection != null) {
         return collection.to_struct();
       }

       return null;
     }
     ```

## Dependencies

The `collections_light` module relies on the following libraries:

- **`lib.collections`**: This library provides the core collection data structures and utilities.
- **`lib.ft4.assets`**: This library handles the asset data structures and related operations.

## Summary

The `collections_light` module is designed to provide a lightweight interface for managing the relationships between assets and collections. It supports extension via customizable hooks and integrates with external modules for broader functionality.
