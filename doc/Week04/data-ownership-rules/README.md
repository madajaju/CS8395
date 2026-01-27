# Data Ownership Rules

**Purpose:** Understand the critical rule of "Database per Service" and how to manage data integrity and access in a distributed system.

**Outcomes**
- Explain the "Database per Service" pattern.
- Identify the problems with shared databases.
- Discuss strategies for data access across service boundaries.

---

## 1. The Core Principle: Database per Service

In a true microservice architecture, **each service must own its own data.**

-   **Private Data:** No other service can access another service's database directly.
-   **API Access Only:** If Service A needs data owned by Service B, it must ask Service B via its API or subscribe to an event published by Service B.

## 2. Why Shared Databases are an Anti-Pattern

In monoliths, a shared database is the norm. In microservices, it is "public enemy number one" because it creates **tight coupling at the data layer.**

-   **Schema Lock-in:** You can't change a table schema in Service A without checking if Service B (and C, and D...) will break.
-   **Performance Interference:** A heavy query from Service B can slow down the database for Service A, leading to "noisy neighbor" problems.
-   **Security Risks:** It's harder to enforce "least privilege" access when multiple services have credentials for the same broad database.

## 3. Dealing with "Foreign" Data

If services can't share a database, how do they get the data they need?

### Option A: API Calls (The Simple Way)
-   Service A calls Service B's GET endpoint.
-   *Pros:* Data is always fresh.
-   *Cons:* Creates temporal coupling (Service B must be up). Adds latency.

### Option B: Data Replication / Projections (The Scalable Way)
-   Service B publishes an event (e.g., "UserUpdated").
-   Service A listens and saves a copy of the specific fields it needs (e.g., just `user_id` and `display_name`) in its own database.
-   *Pros:* Low latency. No temporal coupling.
-   *Cons:* Eventual consistency. Data duplication.

## 4. Referential Integrity

In a single database, you have Foreign Keys. In microservices, **referential integrity is the responsibility of the application.**

-   You cannot have a database-level foreign key constraint between two different microservice databases.
-   Instead, you use **logic** to handle deletions or updates, or you accept that sometimes a "ProductID" in an Order might point to a Product that was just deleted (and handle it gracefully).

## 5. Real-World Scenario: Netflix's Title Metadata
Netflix has a service that owns "Title Metadata" (names, descriptions of movies). However, the "Playback" service needs this data to show you what you're watching.
- **The Wrong Way:** Playback service queries the Metadata DB directly.
- **The Netflix Way:** The Playback service caches its own copy of the metadata it needs. If the Metadata service goes down, you can still watch your movie because the Playback service has its own data.

## 6. Application to Assignment A1
In **Assignment A1**, your architecture diagram (Step 2) **must** show a dedicated data store for your service. 
- **Rule:** Your service should be the *only* thing touching that database. 
- **Challenge:** If your service needs data from another part of your project (e.g., a "Review" needs "User" data), describe in your documentation (Step 5) whether you would use an API call or data replication to get that "foreign" data.

## 7. Summary

Data ownership is the foundation of service autonomy. By enforcing strict boundaries at the data layer, you ensure that services can be developed, deployed, and scaled independently. Remember: **The database is an internal implementation detail, not a public interface.**
