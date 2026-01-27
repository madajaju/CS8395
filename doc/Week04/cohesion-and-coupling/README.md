# Cohesion and Coupling

**Purpose:** Explore the fundamental software engineering concepts of cohesion and coupling and how they apply to the design and health of a microservice architecture.

**Outcomes**
- Define cohesion and coupling in the context of microservices.
- Recognize the characteristics of high cohesion and low coupling.
- Identify the architectural risks of poor cohesion or tight coupling.

---

## 1. The Golden Rule of Architecture

> **Aim for High Cohesion and Low Coupling.**

These two concepts are the yardsticks by which we measure the quality of our service boundaries.

## 2. Cohesion: "Things that belong together, stay together"

**Cohesion** refers to how closely related the responsibilities within a single microservice are.

-   **High Cohesion:** A service does one thing and does it well (the Single Responsibility Principle). All the code inside the service supports that one purpose.
    -   *Example:* A "Payment Service" that only handles processing transactions and talking to payment gateways.
-   **Low Cohesion:** A service has multiple, unrelated responsibilities.
    -   *Example:* A "Management Service" that handles user profiles, product catalogs, and email notifications.

### Why High Cohesion Matters:
-   **Simplicity:** The service is easier to understand, test, and maintain.
-   **Isolated Change:** You can change how payments work without accidentally breaking the email system.

## 3. Coupling: "How much do we depend on others?"

**Coupling** refers to the degree of dependency between different microservices.

-   **Low (Loose) Coupling:** Services can change independently without requiring changes in others. They communicate through stable, well-defined APIs.
    -   *Example:* The Order Service calls the Payment Service via an API. The Payment Service can change its internal database or logic without the Order Service knowing.
-   **High (Tight) Coupling:** A change in one service forces a change in another.
    -   *Example:* Two services sharing the same database table. If Service A changes the schema, Service B breaks.

### Types of Coupling to Avoid:
1.  **Implementation Coupling:** Depending on the internal details of another service.
2.  **Temporal Coupling:** Requiring multiple services to be online and responding instantly at the same time (can be mitigated with async patterns).
3.  **Deployment Coupling:** Services that must be deployed together in a specific order.
4.  **Domain Coupling:** When the domain models of two services are so intertwined that they cannot be understood separately.

## 4. The Relationship Between the Two

Often, **low cohesion leads to high coupling.** If your service doesn't have a clear purpose, it will inevitably need to reach into other services' business logic to get its job done, creating tight dependencies.

## 5. Real-World Scenario: The "User" Service Trap
Many companies start with a "User Service" that handles authentication, profiles, preferences, and billing. 
- **The Problem:** Whenever the Billing team wants to add a new payment method, they have to touch the same code used by the Profile team. 
- **The Fix:** Move billing logic to a separate service. Now, the User service is highly cohesive (identity only), and the Billing service is loosely coupled (it just needs a `user_id` from the User service).

## 6. Application to Assignment A1
For **Assignment A1**, look at your service's responsibility (Step 0). 
- **Check for High Cohesion:** Does your service do *one* thing? If you chose "Catalog," does it also handle "Customer Reviews"? If so, consider if those should be separate.
- **Check for Low Coupling:** Does your service's API (Step 1) reveal internal database structures? If so, you are creating tight implementation coupling.

## 7. Summary

In a microservice world, we want to build "Small, Autonomous Services." 
-   **Cohesion** ensures they are "Small" (focused).
-   **Low Coupling** ensures they are "Autonomous" (independent).

When you feel that a change to one service is "painful" because it ripples through the system, you are likely suffering from tight coupling or poor cohesion.
