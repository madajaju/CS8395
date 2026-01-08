# A1 – Components, APIs & Structured Services

**Goal:**  
Design clean service boundaries and implement the *same microservice* in **two languages**, using proper API contracts, dependency injection, and basic security.

---

## What You Must Do

0. **Define the Service**
   - Pick one logical microservice (e.g., catalog, users, ratings, menu, posts).
   - Describe its responsibility in 3–4 sentences.

1. **API Contract**
   - Create an **OpenAPI (Swagger)** spec including:
     - GET collection
     - GET by id
     - POST (create)
     - Validation rules
   - Include example payloads.

2. **Architecture Diagram**
   - Show:
     - external client  
     - service  
     - data storage  
     - security boundary

3. **Implement Twice**
   - Build the same service in each chosen stack.
   - Use dependency injection, config files, and structured logging.
   - Persist data (in-memory,MongoDB, SQLite is fine for now).

4. **Add Basic Security**
   - Require API key or bearer token on at least one route.
   - Validate token syntactically (full OAuth later).

5. **Integration Tests**
   - Write tests that:
     - create a resource
     - fetch it
     - confirm integrity

---

## Documentation & Deliverables

In your `A1/README.md`, include:

- API spec (link or embedded)
- Diagram (PNG/SVG)
- Example requests/responses
- Explanation (1–2 pages):
  - how each framework handles DI/config
  - trade-offs you observed
- Instructions to run both services

---

## How You Will Be Graded

- **API Design Quality** (20%)  
- **Architecture & Diagrams** (15%)  
- **Two Implementations Functionally Match** (25%)  
- **Security Applied Correctly** (15%)  
- **Tests & Evidence** (15%)  
- **Documentation** (10%)

---

## Tips & Best Practices

- Keep APIs **consistent across stacks** — avoid special features.  
- Treat OpenAPI as the “truth.”  
- Name logs with correlation IDs — you’ll thank yourself later.
