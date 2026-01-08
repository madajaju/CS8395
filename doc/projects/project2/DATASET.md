# Project 2 – IoT Smart Home Sensor Platform – Datasets

This project provides synthetic sensor data at three sizes:

- `data-small/`
- `data-medium/`
- `data-large/`

Schema is identical across sizes; only the **volume** changes.

Map these entities into **MVC / DOV**:

- **Domain / Model**: `Device`, `Reading`, optionally `Home`
- **Views**: dashboards, alert lists
- **Controllers / Orchestrators**: ingestion endpoints, alert processors

---

## Files & Schemas

### 1. `devices.csv`

Represents **registered devices** in homes.

| Column    | Type   | Description                             |
|-----------|--------|-----------------------------------------|
| device_id | int    | Unique ID for the device                |
| home_id   | int    | Logical grouping (home/customer)        |
| type      | string | Sensor type (`temperature`, `humidity`, `motion`) |
| location  | string | Room/location label (e.g., `kitchen`)   |

### 2. `readings.csv`

Represents **sensor readings** over time.

| Column     | Type   | Description                                      |
|------------|--------|--------------------------------------------------|
| reading_id | int    | Unique ID for the reading                        |
| device_id  | int    | ID of the device (FK → devices)                  |
| sensor_type| string | Sensor type (matches `devices.type` semantics)   |
| value      | float/int | Numeric reading (°C, %, or 0/1)              |
| timestamp  | int    | Unix epoch (seconds since 1970-01-01)            |

> Note: `sensor_type` is repeated so you can evolve or denormalize your design.

---

## Data Model (PlantUML)

```plantuml
@startuml
title IoT Smart Home Data Model

class Home {
  +int home_id
  +string name
  +string city
}

class Device {
  +int device_id
  +int home_id
  +string type
  +string location
}

class Reading {
  +int reading_id
  +int device_id
  +string sensor_type
  +double value
  +long timestamp
}

Home "1" <-- "0..*" Device : contains >
Device "1" <-- "0..*" Reading : produces >

@enduml
