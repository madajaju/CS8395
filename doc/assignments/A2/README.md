# A2 – Integration, Persistence & Resilience

**Goal:**  
Evolve your architecture into **multiple collaborating services** with real persistence and resilience techniques (timeouts, retries, circuit breakers, async messaging).

---

## What You Must Do

0. **Introduce a Second Service**
   - Example pairings:
     - catalog + search  
     - users + orders  
     - devices + alerts  
     - posts + feed  

1. **Independent Databases**
   - Each service owns its data store.
   - No cross-database joins.

2. **Service-to-Service Calls**
   - Implement at least one synchronous REST call.
   - Apply:
     - timeout
     - retry policy
     - fallback behavior

3. **Add Asynchronous Flow**
   - Use a queue/topic (e.g., RabbitMQ, Kafka, Redis streams).
   - Produce an event from one service.
   - Consume and process it in the other.

4. **Resilience Features**
   - Implement **ONE** of:
     - circuit breaker
     - bulkhead
     - rate limiter

5. **Architecture Decision Records (ADR)**
   - Write 2–3 short ADRs explaining:
     - why you chose sync vs async
     - why you selected specific tools

---

## Documentation & Deliverables

In `A2/README.md`, provide:

- Updated architecture diagram (include async components)
- Sequence diagram for one critical flow
- Screenshot/logs showing resilience events (timeouts, retries, etc.)
- ADRs folder with markdown files
- Steps to run the system locally

---

## How You Will Be Graded

- **Correct Service Decomposition** (20%)  
- **Sync + Async Integration Works** (25%)  
- **Resilience Feature Implemented** (20%)  
- **Clear ADRs & Diagrams** (20%)  
- **Code Quality & Logging** (10%)  
- **Reproducibility** (5%)

---

## Tips & Best Practices

- Assume services will fail — design accordingly.  
- Keep queues small and observable.  
- Avoid coupling through shared schemas — prefer events.
