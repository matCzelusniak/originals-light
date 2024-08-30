# Crosschain transfer asset attributes

Solution on top of ft4 for passing dynamic attributes between dApps during a cross-chain transfer.

Proposal is for case when both dApps support originals-light attributes, one of them or any of them.

## Step 1: Define Attribute Support Check

First, define a function that checks if a given dApp supports 'dynamic' attributes.

```rell
function supports_attributes(dapp_rid: byte_array): boolean {
    // Logic to check if the dApp supports attributes.
    // This could be based on querying a configuration entity or invoking a specific function on the dApp.
    return dapp_supports_attributes @? { .id == dapp_rid }??;
}
```

## Step 2: Implement Attribute Encoding/Decoding

```rell
function encode_attributes(attributes: map<text, gtv>): byte_array {
    // Logic to encode the attributes into a byte_array.
    return utils.encode(attributes);
}

function decode_attributes(encoded_attributes: byte_array): map<text, any> {
    // Logic to decode the byte_array back into attributes.
    return utils.decode(encoded_attributes);
}
```

## Step 3: Operations for Handling Transfer of Attributes
```rell
operation transfer_attributes(
    init_transfer_tx: gtx_transaction,
    init_tx_op_index: integer,
    asset_id: byte_array,
    recipient_id: byte_array
) {
    // Retrieve and decode attributes if necessary
    // In this function get_attributes_for_transfer should be extenable. It should provide possibility to add attributes which are not supported by dynamic attributes.
    // With this approach we can consider to collection of attributes which partially support originals_light.attributes and partially not.
    // In such manner we can consider to use 'attribute_type field to pass information how target chain should handle specific attribute in case of mixing type
    val encoded_attributes = get_attributes_for_transfer(
        tx_hash = init_transfer_tx.hash(),
        op_index = init_tx_op_index
    );

    if (exists(encoded_attributes)) {
        val recipient_supports_attributes = supports_attributes(chain_context.blockchain_rid);
        if (recipient_supports_attributes) {
            // Decode attributes if supported by the recipient
            decode_attributes(encoded_attributes)
            //update dynamic attributes according to dynamic attributes rules.
        } else {
            // Apply attributes to the asset in the target app specific way

        };
    }
}
```

## Step 4: Hook after_apply_transfer
@extendable function after_apply_transfer(
    sender_blockchain_rid: byte_array,
    sender_account_id: byte_array,
    recipient_id: byte_array,
    asset: assets.asset,
    amount: big_integer,
    hop_index: integer,
    is_final: boolean,
    applied_transfers
) {
    if (is_final) {
        // Trigger the transfer of attributes after the transfer is finalized
        transfer_attributes(
            init_transfer_tx = op_context.transaction,
            init_tx_op_index = op_context.op_index,
            asset_id = asset.id,
            recipient_id = recipient_id
        );
    }
}


## Step 5: Helper functions

```rell
function store_attributes_for_transfer(
    tx_hash: byte_array,
    op_index: integer,
    attributes: byte_array
) {
    // Store the attributes in a suitable storage entity
    create attribute_storage(tx_hash, op_index, attributes);
}

function get_attributes_for_transfer(
    tx_hash: byte_array,
    op_index: integer
): byte_array {
    // Retrieve the attributes from the storage entity
    return attribute_storage @? { .tx_hash == tx_hash, .op_index == op_index } .attributes;
}

```