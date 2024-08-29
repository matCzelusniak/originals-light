# Interface as type or/and rule

Example of test with usage interfaces. Operations like set_current_version_of_hero_interface_id are temporary soltion for case of centralized managment of types.

```rell
function test_battle_of_2_heroes() {
    val admin = common_test_helpers.register_admin();

    originals_light_interfaces_ext.register_interface(
        "hero",
        [
            (
                name = "strength",
                type = originals_light_attributes.attribute_type.big_integer
            ),
            (
                name = "agility",
                type = originals_light_attributes.attribute_type.big_integer
            ),
            (
                name = "intelligence",
                type = originals_light_attributes.attribute_type.big_integer
            ),
            (
                name = "durability",
                type = originals_light_attributes.attribute_type.big_integer
            )
        ]
    ).run();

    val interface_id = originals_light_interfaces.interface @ {.name == "hero"}.id;

    game_assets_external.set_current_version_of_hero_interface_id(interface_id).run();

    common_test_helpers.get_signed_test_nop_tx(
        admin,
        game_assets_external.register_and_mint_asset_hero(
            "hero_1",
            "HERO_1",
            0,
            chain_context.blockchain_rid,
            "https://example.com/hero_1.png",
            "ft4",
            [
                originals_light_attributes.basic_attribute_dto(
                    name = "strength",
                    type = originals_light_attributes.attribute_type.big_integer,
                    value = big_integer(10).to_bytes()
                ),
                originals_light_attributes.basic_attribute_dto(
                    name = "agility",
                    type = originals_light_attributes.attribute_type.big_integer,
                    value = big_integer(11).to_bytes()
                ),
                originals_light_attributes.basic_attribute_dto(
                    name = "intelligence",
                    type = originals_light_attributes.attribute_type.big_integer,
                    value = big_integer(12).to_bytes()
                ),
                originals_light_attributes.basic_attribute_dto(
                    name = "durability",
                    type = originals_light_attributes.attribute_type.big_integer,
                    value = big_integer(13).to_bytes()
                )
            ]
        )
    )
        .run();

    common_test_helpers.get_signed_test_nop_tx(
        admin,
        game_assets_external.register_and_mint_asset_hero(
            "hero_2",
            "HERO_2",
            0,
            chain_context.blockchain_rid,
            "https://example.com/hero_2.png",
            "ft4",
            [
                originals_light_attributes.basic_attribute_dto(
                    name = "strength",
                    type = originals_light_attributes.attribute_type.big_integer,
                    value = big_integer(11).to_bytes()
                ),
                originals_light_attributes.basic_attribute_dto(
                    name = "agility",
                    type = originals_light_attributes.attribute_type.big_integer,
                    value = big_integer(12).to_bytes()
                ),
                originals_light_attributes.basic_attribute_dto(
                    name = "intelligence",
                    type = originals_light_attributes.attribute_type.big_integer,
                    value = big_integer(13).to_bytes()
                ),
                originals_light_attributes.basic_attribute_dto(
                    name = "durability",
                    type = originals_light_attributes.attribute_type.big_integer,
                    value = big_integer(14).to_bytes()
                )
            ]
        )
    )
        .run();

    originals_light_interfaces_ext.register_interface(
        "arena",
        [
            (
                name = "height",
                type = originals_light_attributes.attribute_type.big_integer
            ),
            (
                name = "width",
                type = originals_light_attributes.attribute_type.big_integer
            ),
            (
                name = "image",
                type = originals_light_attributes.attribute_type.text
            )
        ]
    ).run();

    val interface_arena_id = originals_light_interfaces.interface @ {.name == "arena"}.id;
    game_assets_external.set_current_version_of_battle_arena_interface_id(interface_arena_id).run();
    
    common_test_helpers.get_signed_test_nop_tx(
        admin,
        game_assets_external.register_and_mint_asset_battle_arena(
            "battle_arena_madrid",
            "BATTLE",
            0,
            chain_context.blockchain_rid,
            "https://example.com/battle_arena.png",
            [
                originals_light_attributes.basic_attribute_dto(
                    name = "height",
                    type = originals_light_attributes.attribute_type.big_integer,
                    value = big_integer(100).to_bytes()
                ),
                originals_light_attributes.basic_attribute_dto(
                    name = "width",
                    type = originals_light_attributes.attribute_type.big_integer,
                    value = big_integer(100).to_bytes()
                ),
                originals_light_attributes.basic_attribute_dto(
                    name = "image",
                    type = originals_light_attributes.attribute_type.text,
                    value = "https://example.com/battle_arena.png".to_bytes()
                )
            ]
        )
    )
        .run();

    val battle_arena_madrid_id = ft_assets.asset @{.name == "battle_arena_madrid"}.id;

    originals_light_interfaces_ext.register_interface(
        "battle",
        [
            (
                name = "winner_id",
                type = originals_light_attributes.attribute_type.byte_array
            ),
            (
                name = "battle_arena_id",
                type = originals_light_attributes.attribute_type.byte_array
            ),
            (
                name = "timestamp_start",
                type = originals_light_attributes.attribute_type.big_integer
            ),
            (
                name = "timestamp_end",
                type = originals_light_attributes.attribute_type.big_integer
            )
        ]
    ).run();

    val interface_battle_id = originals_light_interfaces.interface @ {.name == "battle"}.id;
    game_external.set_current_version_of_battle_interface_id(interface_battle_id).run();

    common_test_helpers.get_signed_test_nop_tx(
        admin,
        game_external.register_and_mint_asset_battle(
        "battle_1",
        "BATTLE_1",
        0,
        chain_context.blockchain_rid,
        "https://example.com/battle_1.png",
        [
            originals_light_attributes.basic_attribute_dto(
                name = "winner_id",
                type = originals_light_attributes.attribute_type.byte_array,
                value = x"00"
            ),
            originals_light_attributes.basic_attribute_dto(
                name = "battle_arena_id",
                type = originals_light_attributes.attribute_type.byte_array,
                value = battle_arena_madrid_id
            ),
            originals_light_attributes.basic_attribute_dto(
                name = "timestamp_start",
                type = originals_light_attributes.attribute_type.big_integer,
                value = big_integer(1724660646).to_bytes()
            ),
            originals_light_attributes.basic_attribute_dto(
                name = "timestamp_end",
                type = originals_light_attributes.attribute_type.big_integer,
                value = big_integer(0).to_bytes()
            )
        ]
        )
    )
        .run();

    val battle_1_id = ft_assets.asset @{.name == "battle_1"}.id;
    print("battle_1_id: ", battle_1_id);
    //todo matCzelusniak consider to change to add operation for update multiple attributes.
    common_test_helpers.get_signed_test_nop_tx(
        admin,
        originals_light_attributes_ext.update_attribute(
            battle_1_id,
            "winner_id",
            admin.account_id
        )
    )
        .run();

    common_test_helpers.get_signed_test_nop_tx(
        admin,
        originals_light_attributes_ext.update_attribute(
            battle_1_id,
            "timestamp_end",
            big_integer(1724661646).to_bytes()
        )
    )
        .run();
}
```