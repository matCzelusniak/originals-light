# <i class="fa fa-quora"></i> Interfaces Module Overview

The **Interfaces Module** in the Originals-light library is responsible for defining and managing interfaces for assets to work as asset type. Is possible to declare interface as bunch of rule for asset as well (Burnable, Soulbound,Tradable etc.). This module provides functions to register interfaces and ensure that assets comply with the required attributes defined by these interfaces.

## Key Functions

### Interface Registration

- **`register_interface`**: Registers a new interface with associated attributes.
- **`before_register_interface`** & **`after_register_interface`**: Extendable hooks for custom logic before and after an interface is registered.

### Asset Interface Management

- **`add_interface_to_asset`**: Associates an interface with a specific asset, ensuring that the asset meets all required attributes defined by the interface.
- **`require_interface_compatibility`**: Verifies that an asset's attributes comply with the required attributes of the interface.

## Entities

### Interface Entities

- **`interface`**: Represents the interface with an ID and name.
- **`interface_attributes`**: Stores the attributes associated with each interface.
- **`asset_interfaces`**: Links assets to their respective interfaces.

## Dependencies

This module relies on the **Attributes Module** to handle the attributes associated with interfaces and assets, and it integrates with the core `ft_assets` library for asset management.

## Examples

### Interface as a Rule for Assets

Consider an interface called Tradable. When an asset implements the Tradable interface, any operation attempting to transfer this asset would first check if asset implement this interface.

### Attributes in an Interface - Hero Interface for a Game

Let's consider a Hero interface in a game. This interface defines a set of attributes that any asset implementing it should have, but it does not enforce specific rules on how these attributes are used. Instead, it ensures that assets categorized as heroes share common characteristics.

Example Interface: Hero
Attributes:
strength: An integer representing the hero's physical power.
agility: An integer representing the hero's speed and reflexes.
intelligence: An integer representing the hero's mental acuity.
armor: A text attribute that might reference a type of armor the hero can wear.
Implementation
When an asset implements the Hero interface, it inherits these attributes. However, the interface doesn't enforce how these attributes are manipulated or interact with each other. The game logic or other modules handle that. For example, a hero could wear different armor types, and the interface simply ensures that the armor attribute is present, but it doesn't dictate which armor is suitable or how it affects the hero's stats.

This setup allows flexibility in game design, where the interface acts as a blueprint, ensuring consistency across all hero assets without rigidly defining their behavior.
