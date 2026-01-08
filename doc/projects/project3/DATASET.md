# Project 3 – Online Store / Shopping Cart – Datasets

This project simulates an e-commerce store with products, orders, and order items at three scales:

- `data-small/`
- `data-medium/`
- `data-large/`

Schemas are consistent; row counts grow.

Design your architecture with **MVC or DOV**:

- **Domain / Model**: `Product`, `Order`, `OrderItem`, `Customer`
- **Views**: product catalog, cart summary, order history
- **Controllers / Orchestrators**: cart API, checkout flows, order processors

---

## Files & Schemas

### 1. `products.csv`

Represents items that can be purchased.

| Column     | Type    | Description                   |
|------------|---------|-------------------------------|
| product_id | int     | Unique ID for the product     |
| name       | string  | Product name                  |
| category   | string  | Category (e.g., `electronics`)|
| price      | float   | Unit price                    |
| stock      | int     | Units available               |

### 2. `orders.csv`

Represents the **order header** (one per checkout).

| Column      | Type  | Description                                        |
|-------------|-------|----------------------------------------------------|
| order_id    | int   | Unique ID for the order                            |
| customer_id | int   | ID of the customer (you may model `Customer`)      |
| order_status| string| Status: `PENDING`, `PAID`, `SHIPPED`, `CANCELLED`  |
| created_at  | int   | Unix epoch (seconds since 1970-01-01)              |

### 3. `order_items.csv`

Represents individual line items associated with an order.

| Column        | Type  | Description                                 |
|---------------|-------|---------------------------------------------|
| order_item_id | int   | Unique ID for this line item                 |
| order_id      | int   | Order header (FK → orders)                   |
| product_id    | int   | Product (FK → products)                      |
| quantity      | int   | Quantity ordered                             |

---

## Data Model (PlantUML)

```plantuml
@startuml
title Online Store Data Model

class Customer {
  +int customer_id
  +string name
  +string email
}

class Product {
  +int product_id
  +string name
  +string category
  +double price
  +int stock
}

class Order {
  +int order_id
  +int customer_id
  +string order_status
  +long created_at
}

class OrderItem {
  +int order_item_id
  +int order_id
  +int product_id
  +int quantity
}

Customer "1" <-- "0..*" Order : places >
Order "1" <-- "1..*" OrderItem : contains >
Product "1" <-- "0..*" OrderItem : ordered >

@enduml
