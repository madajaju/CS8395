# Microservice Anti-Patterns

**Purpose:** Identify common mistakes and "wrong turns" teams take when adopting microservices, and how to avoid them.

**Outcomes**
- Define common anti-patterns (Distributed Monolith, Nano-services, etc.).
- Recognize the symptoms of these patterns in a project.
- Discuss how to course-correct.

---

## 1. The Distributed Monolith

This is the most common anti-pattern. You have multiple services, but they are so tightly coupled that they must all be deployed together, and a failure in one crashes the entire system.

-   **Symptoms:** You have a "deployment train" where 10 services must go out at once. You can't run Service A on your laptop without also running Services B through J.
-   **The Fix:** Work on stable API contracts, implement circuit breakers, and enforce "Database per Service."

## 2. Nano-services

The opposite of the monolith. Slicing the system so thin that every tiny piece of logic is its own service.

-   **Symptoms:** You have hundreds of services for a simple CRUD app. Most services just pass data to another service. The overhead of network calls and infrastructure outweighs the business value.
-   **The Fix:** Merge services that share the same business context or change for the same reasons. Focus on cohesion.

## 3. Shared Database (The "Golden Hammer" of Coupling)

Multiple services reading and writing to the same database tables.

-   **Symptoms:** Changing a column name in the `Users` table requires updating three different codebases simultaneously.
-   **The Fix:** Assign a single "Owner" service to that data. All other services must go through the owner's API.

## 4. The "Gateway" to Everywhere (Mega-Gateway)

Putting all your business logic into an API Gateway or a Load Balancer.

-   **Symptoms:** Your NGINX config or Kong plugin is 2,000 lines long and contains complex routing, authentication, and even data transformation logic.
-   **The Fix:** Keep the gateway "dumb." It should only handle routing, SSL termination, and perhaps rate limiting. Move business logic back into the services.

## 5. Ignoring Observability

Building microservices without centralized logging, metrics, or distributed tracing.

-   **Symptoms:** A request fails, and you have to log into five different servers to tail logs and figure out what happened.
-   **The Fix:** Use a unified logging stack (ELK/Splunk) and distributed tracing (Jaeger/Zipkin) from day one.

## 6. Real-World Scenario: The Knight Capital Glitch
In 2012, Knight Capital lost $440 million in 45 minutes because of a "Distributed Monolith" deployment error. They had 8 servers, but only 7 were updated correctly. The 8th server started executing old, "zombie" code that interacted with the new code in disastrous ways.
- **The Lesson:** Independent deployability and robust observability aren't just "nice to haves"—they are survival requirements.

## 7. Application to Assignment A1
**Assignment A1** requires you to implement the same service twice. 
- **Avoid the "Shared DB" Anti-pattern:** Do not let your Java service and your Python service share the same database file or table. They are separate services!
- **Prepare for Observability:** Use the "Structured Logging" requirement in Step 3 to ensure your services are ready to be debugged in a distributed environment.

## 8. Summary

Microservices add complexity. If you don't get the boundaries and patterns right, you end up with the "worst of both worlds": the complexity of distributed systems with the rigidity of a monolith. Stay vigilant for these anti-patterns as your system grows.
