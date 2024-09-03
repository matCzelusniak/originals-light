# 📁 📁 Projects Light Module

The `projects_light` module is a part of the `originals_light` core library, focused on managing the association between assets and projects. This module provides essential functions to add assets to projects, retrieve project information, and includes extendable hooks for custom behavior before and after assets are added to projects.

## Files and Components

### 1. **`extendables.rell`**
   This file defines extendable functions that allow for customization of the behavior before and after an asset is added to a project:

   - **`before_add_asset_to_project`**  
     This extendable function is called before an asset is added to a project.
     ```plaintext
     @extendable
     function before_add_asset_to_project(
       asset_id: byte_array,
       project_id: text
     );
     ```
   - **`after_add_asset_to_project`**  
     This extendable function is called after an asset has been added to a project.
     ```plaintext
     @extendable
     function after_add_asset_to_project(
       project_asset
     );
     ```

### 2. **`functions.rell`**
   This file contains the core functions used to interact with projects:

   - **`get_project`**  
     Retrieves the project associated with a given asset ID.
     ```plaintext
     function get_project(asset_id: byte_array): projects.project? {
       return project_asset @? {.asset.id == asset_id}(.project);
     }
     ```

   - **`add_asset_to_project`**  
     Adds an asset to a specified project. This function invokes the extendable functions before and after the asset is added.
     ```plaintext
     function add_asset_to_project(asset_id: byte_array, project_id: text) {
       before_add_asset_to_project(asset_id, project_id);
       
       var project_asset_added = create project_asset(
         .asset = ft_assets.Asset(asset_id),
         .project = projects.Project(project_id)
       );

       after_add_asset_to_project(project_asset_added);
     }
     ```

### 3. **`model.rell`**
   The `model.rell` file defines the data model used in the `projects_light` module:

   - **`project_asset` Entity**  
     This entity represents the relationship between an asset and a project.
     ```plaintext
     entity project_asset {
       index projects.project;
       key ft_assets.asset;
     }
     ```

### 4. **`module.rell`**
   The `module.rell` file is responsible for importing necessary libraries and modules:

   - **Imports**:
     ```plaintext
     import projects: lib.projects;
     import ft_assets: lib.ft4.assets;
     ```

### 5. **`external/projects_light`**
   The external module provides operations and queries that can be executed outside the core module, interacting with the core `projects_light` functionality.

   - **`operations.rell`**  
     Defines operations to add assets to projects:
     ```plaintext
     operation add_asset_to_project(asset_id: byte_array, project_id: text) {
       projects_light.add_asset_to_project(asset_id, project_id);
     }
     ```

   - **`queries.rell`**  
     Provides query functions to retrieve project-related information:
     ```plaintext
     query get_project(asset_id: byte_array): struct<projects.project>? {
       val project = projects_light.get_project(asset_id);
       if(project != null) {
         return project.to_struct();
       }

       return null;
     }
     ```

## Dependencies

The `projects_light` module relies on the following libraries:

- **`lib.projects`**: Provides the core project-related data structures and utilities.
- **`lib.ft4.assets`**: Manages asset-related data structures and operations.

## Summary

The `projects_light` module offers a streamlined interface for managing the relationship between assets and projects. It supports customization through extendable functions and integrates with external operations and queries to provide a comprehensive solution for project management within the `originals_light` ecosystem.
