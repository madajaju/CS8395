# Project 1 – Movie / Media Recommender – Datasets

This project ships with **synthetic datasets** at three sizes:

- `data-small/`
- `data-medium/`
- `data-large/`

All three share the **same schema**; only the number of rows scales up.

You are encouraged to map these entities into an **MVC** or **DOV** (Domain–Object–View) style design:

- **Domain / Model**: `Movie`, `Rating`, and optionally `User`
- **Views**: catalog pages, rating lists, recommendation output
- **Controllers / Orchestrators**: HTTP endpoints, background jobs

---

## Files & Schemas

### 1. `movies.csv`

Represents the **catalog** of movies available to users.

| Column   | Type    | Description                    |
|----------|---------|--------------------------------|
| movie_id | int     | Unique ID for the movie       |
| title    | string  | Movie title                   |
| year     | int     | Release year                  |
| genre    | string  | Primary genre label           |

### 2. `ratings.csv`

Represents **user ratings** for movies.

| Column    | Type    | Description                           |
|-----------|---------|---------------------------------------|
| rating_id | int     | Unique ID for this rating event      |
| user_id   | int     | ID of the user who rated             |
| movie_id  | int     | ID of the rated movie (FK → movies)  |
| rating    | int     | Rating value (1–5)                   |
| timestamp | int     | Unix epoch (seconds since 1970-01-01)|

> Note: there is no `users.csv` in the starter dataset. You may:
> - treat `user_id` as an opaque ID, or
> - introduce your own `User` model/table in your services.

---

## Data Model (PlantUML)

Below is a simple conceptual data model for use with MVC/DOV:

```plantuml
@startuml
title Movie Recommender Data Model

class Movie {
  +int movie_id
  +string title
  +int year
  +string genre
}

class Rating {
  +int rating_id
  +int user_id
  +int movie_id
  +int rating
  +long timestamp
}

class User {
  +int user_id
  +string name
  +string email
}

Movie "1" <-- "0..*" Rating : rated by >
User "1" <-- "0..*" Rating : writes >

@enduml
