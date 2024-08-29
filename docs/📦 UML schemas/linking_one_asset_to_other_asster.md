# UML Sequence Diagram: Linking Assets - Parent asset 'hero'

```mermaid
sequenceDiagram
    title: Linking Assets - Parent asset 'hero'
    
    Client_app->>Backend: Register and mint parent Asset with name='hero' to account x'01'. No attributes predefined.
    Client_app->>Backend: Register and mint child Asset with name='helmet' to account x'01'.
    Client_app->>Backend: Add attribute with name = 'helmet', type = asset_id, and value asset_helmet.id to asset 'hero'. 
    Note over Backend: Creates link between hero and helmet which is easy to read from the database.
    Note over Backend: Operation add_attribute_to_asset(\n  asset_id: byte_array, \n  attribute_name: text, \n  type: attributes.attribute_type, \n  attribute_value: byte_array\n)
    Note over Backend: Locking child asset 'helmet' with ft4 function \nlock_asset(type: text, accounts.account, assets.asset, amount: big_integer).
