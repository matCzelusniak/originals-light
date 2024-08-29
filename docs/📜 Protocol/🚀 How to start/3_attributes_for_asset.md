# Adding attributes to asset

operation register_and_mint_avatar(
  name,
  symbol: text,
  decimals: integer,
  blockchain_rid: byte_array,
  icon_url: text,
  type: text = ft_assets.ASSET_TYPE_FT4,
  attributes: list<originals_light_attributes.basic_attribute_dto>,
  accounts: list<byte_array>,
  amount: big_integer
) {
  val account = ft_auth.authenticate();

  originals_light_attributes.check_required_attributes(
    attributes, 
    list([(attribute_name ="fishes_caught", type = originals_light_attributes.attribute_type.big_integer)])
  );

  val asset = originals_light_assets.register_asset(
    name,
    symbol,
    decimals,
    blockchain_rid,
    icon_url,
    type,
    attributes
  );

  originals_light_assets.mint_asset(
    asset.id,
    amount,
    accounts
  );
}