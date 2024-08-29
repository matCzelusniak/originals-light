
# Tutorial: Asset Registration and Minting Scenarios with `originals-light` asset and attributes

This tutorial will walk you through different scenarios of asset registration and minting using `originals-light`. We will cover three distinct cases, each demonstrating a different approach to managing assets.

---

## 1. Register and Mint Asset with Attributes Without Usage of Interface

In this scenario, we will register and mint an asset while directly adding attributes, without using an interface. One attribute "fishes_caught".

**Example: Register and Mint with Attributes**


```rell
    operation register_and_mint_asset(
    name: text,
    symbol: text,
    decimals: integer,
    blockchain_rid: byte_array,
    icon_url: text,
    type: text = ft_assets.ASSET_TYPE_FT4,
    asset_attributes: list<attributes.basic_attribute_dto>?,
    accounts: list<byte_array>?,
    amount: integer
    )
```


```rell
    originals_light_assets_ext.register_and_mint_asset(
        "avatar",
        "AVT",
        0,
        chain_context.blockchain_rid,
        "https://example.com/avatar.png",
        ft_assets.ASSET_TYPE_FT4,
        [
            (
              attribute_name  = "fishes_caught",
              type = originals_light_attributes.attribute_type.integer,
              attribute_value = big_integer(0).to_bytes()
            )
        ],
        [
            account_id
        ],
        1
    ).run();
```

In this example, the attribute fishes_caught is added directly during the registration and minting process. No interface is used, making this a straightforward way to include attributes without additional requirements.

---

## 2. Register and Mint Asset Without Attributes Using `ft4` Operations, and Add Attributes Later

Here, we'll register and mint an asset using `ft4` without any attributes initially. The attributes will be added later.

**Example: Register and Mint with `ft4`(part of code)**

```rell
    val asset = ft_assets.Unsafe.register_asset(
        name = name,
        symbol = symbol,
        decimals = 0,
        blockchain_rid = chain_context.blockchain_rid,
        icon_url = icon_url,
        type = type
    );

    ft_assets.Unsafe.mint(
      account,
      asset,
      amount
    );

```

```rell
    operation add_attribute_to_asset(
        attribute: attributes.attribute_dto
    ) {
            val account = ft_auth.authenticate();

            attributes.add_attribute_to_asset(
                account,
                attribute
            );
    }

    operation update_attribute(
        asset_id: byte_array,
        attribute_name: text,
        attribute_value: byte_array
    ) {
        ft_auth.authenticate();

        attributes.update_attribute(
            asset_id,
            attribute_name,
            attribute_value
        );
    }

    operation remove_attribute(
        asset_id: byte_array,
        name: text
    ) {
        val account = ft_auth.authenticate();
        
        attributes.remove_asset_attribute(
            account,
            asset_id,
            name
        );
    }

    operation add_attributes_to_asset_batch(
        attributes_list: list<attributes.attribute_dto>
    ) {
        val account = ft_auth.authenticate();

        for (attribute in attributes_list) {
            attributes.add_attribute_to_asset(
            account,
            attribute
            );
        }
    }

```

This example demonstrates the registration and minting of an asset without attributes. Later, attributes like "weight" can be added separately using `originals_light` operation add_attribute_to_asset.

---

## 3. Register and Mint Asset Without Attributes Using `originals-light`, and Add Attributes and Interfaces Later

Finally, we will use `originals-light` to register and mint an asset without attributes, and then add attributes and an interface later.

**Example: Register and Mint with `originals-light`**

```rell
    originals_light_assets_ext.register_and_mint_asset(
        "avatar",
        "AVT",
        0,
        chain_context.blockchain_rid,
        "https://example.com/avatar.png",
        ft_assets.ASSET_TYPE_FT4,
        [
            (
              attribute_name  = "fishes_caught",
              type = originals_light_attributes.attribute_type.integer,
              attribute_value = big_integer(0).to_bytes()
            )
        ],
        [
            account_id
        ],
        1
    ).run();
```

```rell
    operation register_interface(
        name: text,
        interface_attributes: list<(
            name: text,
            type: attributes.attribute_type
        )>
    ){
        interfaces.register_interface(
            name,
            interface_attributes
        );
    }

    operation add_interface_to_asset(
        asset_id: byte_array,
        interface_id: big_integer
    ){
        interfaces.add_interface_to_asset(
            asset_id,
            interface_id
        );
    }
```


In this scenario, we first register and mint the asset without interface using `originals-light`. Later we can register interface which specify type and add it to asset. 
If to asset already all attributes required by interface have been added, then interface can be connected to the asset. In another case operation will fail.

---

## Conclusion

These three scenarios show the flexibility you have when working with asset registration and minting in `originals-light` and `ft4`. Depending on your needs, you can choose to include attributes at the time of registration or add them later, and you can also incorporate interfaces to structure and standardize your assets.