# Project 5 – Food Delivery & Restaurant Ordering – Datasets

This project simulates food ordering and delivery across three scales:

- `data-small/`
- `data-medium/`
- `data-large/`

Schemas are identical; only row counts change.

Adapt this into **MVC or DOV**:

- **Domain / Model**: `Restaurant`, `MenuItem`, `FoodOrder`, `Delivery`, `Customer`, `Driver`
- **Views**: restaurant list, menu, order status
- **Controllers / Orchestrators**: order placement, dispatch, delivery tracking

---

## Files & Schemas

### 1. `restaurants.csv`

Represents participating restaurants.

| Column        | Type   | Description                      |
|---------------|--------|----------------------------------|
| restaurant_id | int    | Unique ID for the restaurant     |
| name          | string | Restaurant name                  |
| city          | string | City                             |
| rating        | float  | Average rating (3.0–5.0)         |

### 2. `menu_items.csv`

Represents menu items offered by restaurants.

| Column        | Type   | Description                             |
|---------------|--------|-----------------------------------------|
| menu_item_id  | int    | Unique ID for the menu item            |
| restaurant_id | int    | Owning restaurant (FK → restaurants)   |
| name          | string | Item name                              |
| price         | float  | Item price                             |
| category      | string | e.g., `entree`, `side`, `drink`, `dessert` |

### 3. `orders.csv`

Represents placed orders.

| Column        | Type   | Description                                                    |
|---------------|--------|----------------------------------------------------------------|
| order_id      | int    | Unique ID for the order                                       |
| customer_id   | int    | ID of the customer (you may model `Customer`)                 |
| restaurant_id | int    | Restaurant fulfilling the order (FK → restaurants)           |
| status        | string | `PLACED`, `ACCEPTED`, `DELIVERING`, `DELIVERED`, `CANCELLED` |
| created_at    | int    | Unix epoch (seconds since 1970-01-01)                          |

### 4. `deliveries.csv`

Represents delivery details for each order.

| Column          | Type | Description                                   |
|-----------------|------|-----------------------------------------------|
| delivery_id     | int  | Unique ID for the delivery record             |
| order_id        | int  | Associated order (FK → orders)                |
| driver_id       | int  | Driver assigned (you may model `Driver`)      |
| estimated_minutes | int| Estimated time for delivery                   |
| actual_minutes  | int  | Actual time for delivery                      |

---

## Data Model (PlantUML)

```plantuml
@startuml
title Food Delivery Data Model

class Customer {
  +int customer_id
  +string name
  +string email
}

class Restaurant {
  +int restaurant_id
  +string name
  +string city
  +double rating
}

class MenuItem {
  +int menu_item_id
  +int restaurant_id
  +string name
  +double price
  +string category
}

class FoodOrder {
  +int order_id
  +int customer_id
  +int restaurant_id
  +string status
  +long created_at
}

class Delivery {
  +int delivery_id
  +int order_id
  +int driver_id
  +int estimated_minutes
  +int actual_minutes
}

class Driver {
  +int driver_id
  +string name
}

Customer "1" <-- "0..*" FoodOrder : places >
Restaurant "1" <-- "0..*" FoodOrder : fulfills >
Restaurant "1" <-- "0..*" MenuItem : offers >
FoodOrder "1" <-- "0..1" Delivery : delivered by >
Driver "1" <-- "0..*" Delivery : handles >

@enduml
