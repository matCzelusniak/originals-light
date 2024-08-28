# 🏗️ Overview

**Framework Originals-light overview**

The Originals-light library is a lightweight, modular library designed for the Chromia Originals framework. It enables the creation and management of dynamic attributes for assets within decentralized applications (dApps) built on the Chromia blockchain. This library leverages the FT4 standard to ensure interoperability, good performance and flexibility in handling on-chain assets.

**Modular**

The library is composed of multiple modules that can be used independently of each other. It includes assets, attributes, interfaces, collections, projects, and the FT4 library.

**Standarized asset handling**

Originals-light utilizes the FT4 library for standardized asset management, including functions like asset transfer and cross-chain operations.

**Not only for digital game asset**

Dynamic attributes willing to handle not only game and fun related stuff but also real stuff like documents, lands, e-commerce items.

**Performance**

Originals-light uses FT4 assets directly without additional wrappers. This approach simplifies and standardizes processes such as asset transferring, balance management, and cross-chain operations. Each dynamic attribute is strictly related to the asset, so for example transferring assets doesn't require additional action on attribute entity.

**Reason of creation Originals-light**

We foresee a future where digital assets play a critical role across various sectors, from gaming to industrial use, DeFi, logistics, and beyond. Originals-light is crafted to support this vision by leveraging standard FT4 assets directly, enabling seamless asset transfers, efficient balance management, and streamlined cross-chain operations. Unlike traditional approaches where essential asset-related data often resides off-chain, Originals-light ensures that all relevant information is securely and fully integrated within the blockchain, enhancing transparency and trust in digital asset management.

**Architecture overview**

Originals-light is designed as a modular framework, allowing each component to function independently while working cohesively to manage digital assets with metadata on the Chromia blockchain. The architecture leverages the FT4 standard to handle core functionalities like asset transfers, balance management, and cross-chain operations without additional layers of abstraction.

Key modules include:

- Assets Module: Direct interaction with FT4 assets, ensuring streamlined and standardized asset operations.
- Attributes Module: Manages dynamic attributes, allowing assets to evolve and link with other assets.
- Interfaces Module: Defines asset types and ensures compliance with those types. It allows the definition of interfaces without attributes, enabling the implementation of restrictions for specific assets based on whether they implement or do not implement such an interface.
- Collections: Facilitates the organization and grouping of assets for various applications. Collections do not depend on the - Projects module, giving users the flexibility to decide whether to connect both.
- Projects: Provides another method of organizing assets.
