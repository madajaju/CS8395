# Project 4 – Social News Feed / Content Aggregator – Datasets

This project simulates a simple social platform with users, posts, and votes at three scales:

- `data-small/`
- `data-medium/`
- `data-large/`

Schemas remain the same; volume grows.

Fit this into **MVC or DOV**:

- **Domain / Model**: `User`, `Post`, `Vote`
- **Views**: feed, post details, user profile summary
- **Controllers / Orchestrators**: post APIs, feed builders, ranking services

---

## Files & Schemas

### 1. `users.csv`

Represents users in the system.

| Column     | Type   | Description                         |
|------------|--------|-------------------------------------|
| user_id    | int    | Unique ID for the user             |
| username   | string | Handle / nickname                   |
| created_at | int    | Unix epoch (seconds since 1970-01-01)|

### 2. `posts.csv`

Represents user-submitted posts.

| Column     | Type   | Description                                      |
|------------|--------|--------------------------------------------------|
| post_id    | int    | Unique ID for the post                          |
| user_id    | int    | Author (FK → users)                             |
| title      | string | Short title                                     |
| body       | string | Body/content                                    |
| created_at | int    | Unix epoch (seconds since 1970-01-01)           |

### 3. `votes.csv`

Represents upvotes/downvotes or similar interactions.

| Column    | Type   | Description                                |
|-----------|--------|--------------------------------------------|
| vote_id   | int    | Unique ID for this vote event              |
| user_id   | int    | User who voted (FK → users)                |
| post_id   | int    | Voted post (FK → posts)                    |
| direction | int    | `1` for upvote, `-1` for downvote          |
| timestamp | int    | Unix epoch (seconds since 1970-01-01)      |

---

## Data Model (PlantUML)

```plantuml
@startuml
title Social Feed Data Model

class User {
  +int user_id
  +string username
  +long created_at
}

class Post {
  +int post_id
  +int user_id
  +string title
  +string body
  +long created_at
}

class Vote {
  +int vote_id
  +int user_id
  +int post_id
  +int direction
  +long timestamp
}

User "1" <-- "0..*" Post : writes >
User "1" <-- "0..*" Vote : casts >
Post "1" <-- "0..*" Vote : receives >

@enduml
