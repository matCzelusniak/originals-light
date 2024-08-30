# Linking via attributes

Example of test with usage linking.

Notice:

Once a child asset is linked to a parent using the asset_id, attribute data type, the child asset is transfered to the special account of the owner

```rell

function test_link_equipment_to_hero() {
    val admin = common_test_helpers.register_admin();

    originals_light_interfaces_ext.register_interface(
        "helmet",
        [
            (
                name = "power",
                type = originals_light_attributes.attribute_type.integer
            )
        ]
    ).run();

    val helmet_interface_id = originals_light_interfaces.interface @ {.name == "helmet"}.id;

    game_assets_external.set_current_version_of_equipment_interface_id(helmet_interface_id).run();

    common_test_helpers.get_signed_test_nop_tx(
        admin,
        game_assets_external.register_and_mint_hero_equipment(
            name = "helmet 1",
            symbol = "HELMET_1",
            decimals = 0,
            blockchain_rid = chain_context.blockchain_rid,
            icon_url = "https://example.com/helmet.png",
            type = "ft4",
            attributes = [
                originals_light_attributes.basic_attribute_dto(
                    name = "power",
                    type = originals_light_attributes.attribute_type.integer,
                    value = (5).to_gtv().to_bytes()
                )
            ]
        )
    )
        .run();

    val helmet_asset_id = ft_assets.asset @ {} (.id, @omit @sort_desc .rowid) limit 1;

    originals_light_interfaces_ext.register_interface(
        "hero",
        [
            (
                name = "equipment",
                type = originals_light_attributes.attribute_type.asset_id
            )
        ]
    )
        .run();

    val hero_interface_id = originals_light_interfaces.interface @ {.name == "hero"}.id;

    game_assets_external.set_current_version_of_hero_interface_id(hero_interface_id).run();

    common_test_helpers.get_signed_test_nop_tx(
        admin,
        game_assets_external.register_and_mint_asset_hero(
            name = "hero_1",
            symbol = "HERO_1",
            decimals = 0,
            blockchain_rid = chain_context.blockchain_rid,
            icon_url = "https://example.com/hero_1.png",
            type = "ft4",
            attributes = [
                originals_light_attributes.basic_attribute_dto(
                    name = "equipment",
                    type = originals_light_attributes.attribute_type.asset_id,
                    value = helmet_asset_id
                )
            ]
        )
    )
        .run();

    val hero_asset_id = ft_assets.asset @ {} (.id, @omit @sort_desc .rowid) limit 1;
    val hero_children = originals_light_attributes_ext.get_linked_assets(hero_asset_id);

    assert_equals(hero_children, [helmet_asset_id]);
}

function test_link_two_equipments_to_hero() {
    val admin = common_test_helpers.register_admin();

    originals_light_interfaces_ext.register_interface(
        "helmet",
        [
            (
                name = "power",
                type = originals_light_attributes.attribute_type.integer
            )
        ]
    ).run();

    val helmet_interface_id = originals_light_interfaces.interface @ {.name == "helmet"}.id;

    game_assets_external.set_current_version_of_equipment_interface_id(helmet_interface_id).run();

    common_test_helpers.get_signed_test_nop_tx(
        admin,
        game_assets_external.register_and_mint_hero_equipment(
            name = "helmet 1",
            symbol = "HELMET_1",
            decimals = 0,
            blockchain_rid = chain_context.blockchain_rid,
            icon_url = "https://example.com/helmet_1.png",
            type = "ft4",
            attributes = [
                originals_light_attributes.basic_attribute_dto(
                    name = "power",
                    type = originals_light_attributes.attribute_type.integer,
                    value = (5).to_gtv().to_bytes()
                )
            ]
        )
    )
        .run();

    val helmet_asset_id = ft_assets.asset @ {} (.id, @omit @sort_desc .rowid) limit 1;

    originals_light_interfaces_ext.register_interface(
        "sword",
        [
            (
                name = "strength",
                type = originals_light_attributes.attribute_type.integer
            )
        ]
    ).run();

    val sword_interface_id = originals_light_interfaces.interface @ {.name == "sword"}.id;

    game_assets_external.set_current_version_of_equipment_interface_id(sword_interface_id).run();

    common_test_helpers.get_signed_test_nop_tx(
        admin,
        game_assets_external.register_and_mint_hero_equipment(
            name = "sword 1",
            symbol = "SWORD_1",
            decimals = 0,
            blockchain_rid = chain_context.blockchain_rid,
            icon_url = "https://example.com/sword_1.png",
            type = "ft4",
            attributes = [
                originals_light_attributes.basic_attribute_dto(
                    name = "strength",
                    type = originals_light_attributes.attribute_type.integer,
                    value = (5).to_gtv().to_bytes()
                )
            ]
        )
    )
        .run();

    val sword_asset_id = ft_assets.asset @ {} (.id, @omit @sort_desc .rowid) limit 1;

    originals_light_interfaces_ext.register_interface(
        "hero",
        [
            (
                name = "helmet",
                type = originals_light_attributes.attribute_type.asset_id
            ),
            (
                name = "sword",
                type = originals_light_attributes.attribute_type.asset_id
            )
        ]
    )
        .run();

    val interface_id = originals_light_interfaces.interface @ {.name == "hero"}.id;

    game_assets_external.set_current_version_of_hero_interface_id(interface_id).run();

    common_test_helpers.get_signed_test_nop_tx(
        admin,
        game_assets_external.register_and_mint_asset_hero(
            name = "hero_1",
            symbol = "HERO_1",
            decimals = 0,
            blockchain_rid = chain_context.blockchain_rid,
            icon_url = "https://example.com/hero_1.png",
            type = "ft4",
            attributes = [
                originals_light_attributes.basic_attribute_dto(
                    name = "helmet",
                    type = originals_light_attributes.attribute_type.asset_id,
                    value = helmet_asset_id
                ),
                originals_light_attributes.basic_attribute_dto(
                    name = "sword",
                    type = originals_light_attributes.attribute_type.asset_id,
                    value = sword_asset_id
                )
            ]
        )
    )
        .run();

    val hero_asset_id = ft_assets.asset @ {} (.id, @omit @sort_desc .rowid) limit 1;
    val hero_children = originals_light_attributes_ext.get_linked_assets(hero_asset_id);

    assert_equals(hero_children, [helmet_asset_id, sword_asset_id]);
}

function test_link_attachment_to_linked_equipment() {
    val admin = common_test_helpers.register_admin();

    originals_light_interfaces_ext.register_interface(
        "gem",
        [
            (
                name = "gem",
                type = originals_light_attributes.attribute_type.integer
            )
        ]
    ).run();

    val gem_interface_id = originals_light_interfaces.interface @ {.name == "gem"}.id;

    game_assets_external.set_current_version_of_equipment_interface_id(gem_interface_id).run();

    common_test_helpers.get_signed_test_nop_tx(
        admin,
        game_assets_external.register_and_mint_hero_equipment(
            name = "gem 1",
            symbol = "GEM_1",
            decimals = 0,
            blockchain_rid = chain_context.blockchain_rid,
            icon_url = "https://example.com/gem_1.png",
            type = "ft4",
            attributes = [
                originals_light_attributes.basic_attribute_dto(
                    name = "gem",
                    type = originals_light_attributes.attribute_type.integer,
                    value = (1).to_gtv().to_bytes()
                )
            ]
        )
    )
        .run();

    val gem_asset_id = ft_assets.asset @ {} (.id, @omit @sort_desc .rowid) limit 1;

    originals_light_interfaces_ext.register_interface(
        "helmet",
        [
            (
                name = "power",
                type = originals_light_attributes.attribute_type.asset_id
            )
        ]
    ).run();

    val helmet_interface_id = originals_light_interfaces.interface @ {.name == "helmet"}.id;

    game_assets_external.set_current_version_of_equipment_interface_id(helmet_interface_id).run();

    common_test_helpers.get_signed_test_nop_tx(
        admin,
        game_assets_external.register_and_mint_hero_equipment(
            name = "helmet 1",
            symbol = "HELMET_1",
            decimals = 0,
            blockchain_rid = chain_context.blockchain_rid,
            icon_url = "https://example.com/sword_1.png",
            type = "ft4",
            attributes = [
                originals_light_attributes.basic_attribute_dto(
                    name = "power",
                    type = originals_light_attributes.attribute_type.asset_id,
                    value = gem_asset_id
                )
            ]
        )
    )
        .run();

    val helmet_asset_id = ft_assets.asset @ {} (.id, @omit @sort_desc .rowid) limit 1;

    originals_light_interfaces_ext.register_interface(
        "hero",
        [
            (
                name = "equipment",
                type = originals_light_attributes.attribute_type.asset_id
            )
        ]
    )
        .run();

    val interface_id = originals_light_interfaces.interface @ {.name == "hero"}.id;

    game_assets_external.set_current_version_of_hero_interface_id(interface_id).run();

    common_test_helpers.get_signed_test_nop_tx(
        admin,
        game_assets_external.register_and_mint_asset_hero(
            name = "hero_1",
            symbol = "HERO_1",
            decimals = 0,
            blockchain_rid = chain_context.blockchain_rid,
            icon_url = "https://example.com/hero_1.png",
            type = "ft4",
            attributes = [
                originals_light_attributes.basic_attribute_dto(
                    name = "equipment",
                    type = originals_light_attributes.attribute_type.asset_id,
                    value = helmet_asset_id
                )
            ]
        )
    )
        .run();

    val hero_asset_id = ft_assets.asset @ {} (.id, @omit @sort_desc .rowid) limit 1;
    val hero_children = originals_light_attributes_ext.get_linked_assets(hero_asset_id);

    assert_equals(hero_children, [helmet_asset_id, gem_asset_id]);

    val helmet_children = originals_light_attributes_ext.get_linked_assets(helmet_asset_id);

    assert_equals(helmet_children, [gem_asset_id]);
}

function test_unlink_hero_equipment() {
    val admin = common_test_helpers.register_admin();

    originals_light_interfaces_ext.register_interface(
        "helmet",
        [
            (
                name = "power",
                type = originals_light_attributes.attribute_type.integer
            )
        ]
    ).run();

    val helmet_interface_id = originals_light_interfaces.interface @ {.name == "helmet"}.id;

    game_assets_external.set_current_version_of_equipment_interface_id(helmet_interface_id).run();

    common_test_helpers.get_signed_test_nop_tx(
        admin,
        game_assets_external.register_and_mint_hero_equipment(
            name = "helmet 1",
            symbol = "HELMET_1",
            decimals = 0,
            blockchain_rid = chain_context.blockchain_rid,
            icon_url = "https://example.com/helmet.png",
            type = "ft4",
            attributes = [
                originals_light_attributes.basic_attribute_dto(
                    name = "power",
                    type = originals_light_attributes.attribute_type.integer,
                    value = (5).to_gtv().to_bytes()
                )
            ]
        )
    )
        .run();

    val helmet_asset_id = ft_assets.asset @ {} (.id, @omit @sort_desc .rowid) limit 1;

    originals_light_interfaces_ext.register_interface(
        "hero",
        [
            (
                name = "equipment",
                type = originals_light_attributes.attribute_type.asset_id
            )
        ]
    )
        .run();

    val hero_interface_id = originals_light_interfaces.interface @ {.name == "hero"}.id;

    game_assets_external.set_current_version_of_hero_interface_id(hero_interface_id).run();

    common_test_helpers.get_signed_test_nop_tx(
        admin,
        game_assets_external.register_and_mint_asset_hero(
            name = "hero_1",
            symbol = "HERO_1",
            decimals = 0,
            blockchain_rid = chain_context.blockchain_rid,
            icon_url = "https://example.com/hero_1.png",
            type = "ft4",
            attributes = [
                originals_light_attributes.basic_attribute_dto(
                    name = "equipment",
                    type = originals_light_attributes.attribute_type.asset_id,
                    value = helmet_asset_id
                )
            ]
        )
    )
        .run();

    val hero_asset_id = ft_assets.asset @ {} (.id, @omit @sort_desc .rowid) limit 1;
    common_test_helpers.get_signed_test_nop_tx(
        admin,
        originals_light_attributes_ext.remove_attribute(
            asset_id = hero_asset_id,
            name = "equipment"
        )
    )
        .run();

    val hero_children = originals_light_attributes_ext.get_linked_assets(hero_asset_id);

    assert_equals(hero_children, list<byte_array>());
}
```