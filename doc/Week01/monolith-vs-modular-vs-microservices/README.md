# Monolith vs Modular vs Microservices

Video: https://youtu.be/V_GqZK3H0gw

---

## 1. Why This Topic Matters

Most modern systems outlive their original design choices:

- They grow in **features**, **teams**, and **traffic**.
- Architecture that worked for **1 team and 1 year** may fail for **5 teams and 5 years**.
- “Let’s use microservices” has become a default slogan, often without understanding the tradeoffs.

These notes focus on three broad styles:

1. **Monolith** – one deployable unit, tightly coupled codebase.
2. **Modular monolith** – one deployable unit, but with strong internal module boundaries.
3. **Microservices** – many deployable units, each running separately and communicating over the network.

You should walk away able to:

- Explain each style at a high level.
- Recognize when each style is a good fit.
- Identify common risks, failure modes, and tradeoffs.

---

## 2. Core Definitions

### 2.1 Monolith

A **monolith** is a system where:

- Most or all application code is deployed as a **single runtime unit**:
    - One process (often).
    - One artifact (e.g., single JAR/WAR, single binary, single container).
- Code tends to be **tightly coupled**:
    - Many shared modules/classes/DB tables.
    - Cross‑cutting dependencies are common.
- Often backed by a **single shared database**.

Key property:

> You can’t change or deploy one part of the system **without** rebuilding and redeploying the whole.

Note: “Monolith” doesn’t automatically mean “bad.” It usually means “simple to start, harder to evolve if not structured well.”

---

### 2.2 Modular Monolith

A **modular monolith** is a monolith that is **intentionally structured into internal modules**:

- Still **one deployable unit**, one main runtime, often one database.
- But inside the codebase there are **clear boundaries**, such as:
    - Separate modules/packages for distinct business capabilities (e.g., `billing`, `catalog`, `user-management`).
    - Explicit interfaces between modules.
    - Limited direct access to other modules’ internals.

Think of it as:

> “Many logical services, one physical deployment.”

Key difference from a classic monolith:

- Internal coupling is **actively controlled and minimized**.
- Architecture **enforces** boundaries (e.g., module boundaries, package visibility, linters, reviews).

---

### 2.3 Microservices

A **microservices architecture** consists of:

- Multiple **independently deployable services**, each:
    - Has its own codebase (often its own repo).
    - Runs in its own process or container.
    - Has its own data storage or schema (strongly preferred).
- Services communicate over the network:
    - Synchronous protocols (HTTP/REST, gRPC).
    - Asynchronous messaging (queues, events, streams).

Key property:

> Each microservice can be changed, built, deployed, and scaled **independently** of others.

Common view:

- Each microservice is aligned to a **business capability** or **bounded context** (e.g., `payments-service`, `inventory-service`, `orders-service`).

---

## 3. Dimensions to Compare

To reason clearly about the three styles, it helps to compare them along consistent dimensions.

### 3.1 Deployment and Operations

- **Monolith**
    - Single deployment artifact.
    - Easy to reason about operationally:
        - One runtime.
        - One monitoring/alerting surface.
    - Scaling often means “scale the whole app” (vertical or horizontal scaling).

- **Modular Monolith**
    - Same deployment model as monolith (one unit).
    - Operational simplicity is similar to monolith.
    - Still scale as a whole, but internal boundaries can guide:
        - Where to cache.
        - Where to isolate resource‑intensive paths.

- **Microservices**
    - Many deployment artifacts.
    - Operational complexity increases:
        - Multiple runtimes, configurations, secrets, dashboards, logs.
    - You can scale hotspots independently:
        - Only scale `search-service` rather than the entire system.

### 3.2 Code Organization and Coupling

- **Monolith**
    - Often organically grows into a **“big ball of mud”** if not managed:
        - Cross‑module imports everywhere.
        - Shared utility modules used by everything.
        - Hidden coupling through shared DB tables.
    - Refactoring becomes harder over time.

- **Modular Monolith**
    - Codebase is **intentionally structured**:
        - Modules with clear responsibilities.
        - Limited entry points between modules.
        - Enforced contracts (interfaces, anti‑corruption layers).
    - Easier to refactor inside the deployment boundary.

- **Microservices**
    - Strong **physical** boundaries:
        - Separate projects and processes.
        - Communication only via network interfaces.
    - Coupling still happens:
        - Through shared libraries, shared schema, or brittle API contracts.
        - But at least couplings are **visible at boundaries** (API definitions).

### 3.3 Data and Transactions

- **Monolith**
    - Typically a single **shared database**.
    - Transactions can span many features and tables easily (single ACID transaction).
    - Danger:
        - Any part of the code can touch any table.
        - Business boundaries in data model become blurry.

- **Modular Monolith**
    - Commonly still **one database** or a small number of databases.
    - Stricter rules:
        - Each module “owns” certain tables.
        - Other modules access those tables only via well‑defined interfaces.
    - Easier to maintain logical data boundaries, even within one DB.

- **Microservices**
    - “Per service database” is considered a best practice:
        - Each service has its own datastore / schema.
        - Direct cross‑service DB access is strongly discouraged.
    - Distributed transactions become difficult:
        - No simple ACID transaction across services.
        - Need patterns like **sagas**, **eventual consistency**, and **compensating actions**.

### 3.4 Team Structure and Ownership

- **Monolith**
    - One codebase, often many teams:
        - Ownership of parts of the code can be fuzzy.
        - Changes can step on each other’s toes.
    - Coordination overhead increases as teams grow.
    - Some teams may effectively “own” the whole monolith.

- **Modular Monolith**
    - One shared codebase, but:
        - Teams can own specific modules or domains.
        - Architectural rules help reduce conflicts.
    - Good transitional model when a single deployment is still fine, but you want clearer boundaries for multiple teams.

- **Microservices**
    - Designed to align with **team boundaries**:
        - “You build it, you run it” per service.
        - Ownership is clearer: each team owns one or a small set of services.
    - Conway’s Law applies strongly:
        - Team structure shapes service boundaries and vice versa.

### 3.5 Performance and Reliability

- **Monolith**
    - Calls are **in‑process**:
        - Faster than network calls.
        - Fewer failure modes (no network latency or partial outages between components).
    - If the monolith process goes down:
        - The whole system is down.

- **Modular Monolith**
    - Same runtime characteristics as monolith (primarily in‑process calls).
    - Benefits from modular code quality:
        - Easier optimization of hot paths within modules.

- **Microservices**
    - Inter‑service calls go over the **network**:
        - Higher latency than in‑process calls.
        - New failure modes: timeouts, partial outages, retries, backpressure.
    - However:
        - Fault isolation is improved (in theory): one failing service doesn’t necessarily take down all others—if failure handling is designed well.
    - Requires solid **observability**:
        - Tracing across services.
        - Service‑to‑service metrics.
        - Good timeouts and retries.

---

## 4. When to Use Which Style

### 4.1 When a Monolith Is a Good Choice

Monoliths are often a great fit when:

- You are building a **new product** with:
    - A single or small team.
    - Rapidly changing requirements.
- Your system is **not yet large** in:
    - Scope of features.
    - Traffic.
    - Number of developers.
- You want:
    - **Fast iteration**.
    - Simple deployment.
    - Minimal operational overhead.

Advantages:

- Simple to understand and operate.
- Easy local development:
    - One repo, one process, one environment.
- No need to handle network boundaries internally.

Risks:

- If allowed to grow without structure, it can turn into a **big ball of mud**:
    - Refactoring becomes painful.
    - Adding new features becomes slow and risky.

Mitigation:

- Use **modular design** principles inside the monolith from day one.
- Keep boundaries in mind even if not enforced by separate deployments.

---

### 4.2 When a Modular Monolith Is a Good Choice

A modular monolith is especially suitable when:

- You want **most of the development benefits of a monolith**:
    - Single deployable.
    - Simpler operations.
- But also want **structured, scalable architecture**:
    - Clear module boundaries and ownership.
    - Ability to grow into more teams.
- Total system size and traffic **do not yet require** separate deployables.
- You suspect you may move towards microservices later:
    - You want a codebase that can be “split” without major surgery.

Benefits:

- Lower operational complexity than microservices.
- Better internal architecture than an unstructured monolith.
- Easier path to incremental extraction of services if needed:
    - Modules can be “lifted out” as independent services later.

Risks:

- It’s still one deployment unit:
    - A bug in one module can still bring down the entire process.
- Requires discipline to keep module boundaries clean:
    - Without enforcement, teams may slip back into tight coupling.

---

### 4.3 When Microservices Are a Good Choice

Microservices may be justified when:

1. **Multiple independent teams** need to develop and deploy **in parallel**:
    - Strong need for team autonomy and independent release cycles.
2. The system has **grown large and complex**:
    - A single deployable is hard to test, reason about, or scale uniformly.
3. Certain parts of the system have **very different scaling or reliability needs**:
    - For example:
        - Payment processing vs image resizing vs reporting.
4. You can support the required **platform and operational maturity**:
    - CI/CD pipelines.
    - Centralized logging, metrics, tracing.
    - Service discovery, configuration, secret management.

Benefits:

- Independent deployment and scaling.
- Clearer ownership and boundaries between teams.
- Potential for more resilient systems if designed with proper isolation.

Costs and risks (often underestimated):

- Significantly higher **operational complexity**.
- Need to handle:
    - Network failures.
    - Distributed transactions and eventual consistency.
    - Versioning and backward compatibility of APIs.
- Risk of creating **“distributed monoliths”**:
    - Lots of tiny services that are tightly coupled at runtime:
        - Changes require coordinated deployments across many services.
        - System is as tightly coupled as a monolith, but with extra network pain.

---

## 5. Common Pitfalls and Anti‑Patterns

### 5.1 The “Premature Microservices” Problem

Symptom:

- Very small product, maybe one or two developers, but:
    - Dozens of tiny services.
    - Each service has its own CI/CD, Dockerfile, config, database, etc.

Issues:

- Most time is lost on boilerplate, deployment, and cross‑service debugging.
- Changes require editing multiple services anyway.
- Complexity grows before the product has even found its direction.

Guideline:

> Start with a well‑structured monolith (preferably modular).  
> Move to microservices when your pain points justify the added complexity.

---

### 5.2 Shared Database Between “Microservices”

Symptom:

- System is called “microservices,” but:
    - Multiple services directly read/write the **same database schema**.
    - There is no real data ownership per service.

Issues:

- Tight coupling through shared data model:
    - A schema change affects many services at once.
    - Hard to reason about who “owns” a given table or column.
- Requires lock‑step coordination, similar to a monolith.

Guideline:

- If services share a database indiscriminately, you have a **distributed monolith**, not microservices.
- When splitting data:
    - Each service should own its tables.
    - Shared access should be via APIs or well‑defined messaging/replication patterns.

---

### 5.3 Over‑Modularizing the Monolith

Symptom:

- Monolith has hundreds of tiny modules, overly abstracted:
    - Abstractions for the sake of abstraction.
    - Indirection layers that add little value.

Issues:

- Hard to follow call chains.
- Slows down development without adding clear architectural benefits.

Guideline:

- Create modules around **business capabilities**, not arbitrary technical concerns.
- Avoid fragmentation: each module should be **meaningful and cohesive**.

---

## 6. Migration Paths and Evolution

Many real systems evolve across these styles rather than picking one forever.

### 6.1 Monolith → Modular Monolith

Steps:

1. Identify major **business domains** or **bounded contexts**:
    - E.g., `users`, `billing`, `orders`, `catalog`.
2. Group code around these domains:
    - Move classes/functions into domain‑specific modules or packages.
3. Establish and enforce rules:
    - Only certain modules may call others.
    - Some modules can only be called via interfaces/API layers.

Result:

- You still deploy one unit, but internal structure reflects the domain.
- Helps with understanding, testing, and team boundaries.

### 6.2 Modular Monolith → Microservices

If and when needed:

1. Pick a module that:
    - Has clear boundaries.
    - Is experiencing unique scaling or change‑rate pressures.
2. Wrap its boundaries with a **stable interface**:
    - Internal “module API.”
3. Extract it into its own service:
    - Keep the same interface externally (at least logically).
    - Update callers to communicate over the network instead of via in‑process calls.
4. Repeat for other modules as justified.

Key point:

> A well‑designed modular monolith makes service extraction much easier and less risky.

---

## 7. Questions to Guide Architectural Choice

Use these questions to frame discussions with your team:

1. **Team and Organization**
    - How many teams will actively work on this system?
    - Do they need to deploy independently, or can they coordinate releases?

2. **Scale and Performance**
    - Are we currently facing scaling issues that require independent horizontal scaling?
    - Which parts of the system are actual hotspots?

3. **Complexity and Domain**
    - Is the domain already well-understood, or is it still evolving quickly?
    - Could we identify meaningful bounded contexts today?

4. **Operational Maturity**
    - Do we have the tooling and expertise for microservices:
        - CI/CD, observability, on‑call, config management?
    - If not, is investing in that complexity justified now?

5. **Change Cost vs Risk**
    - What is slower today: development or operations?
    - Would splitting services actually reduce risk and lead time, or just move the pain?

---

## 8. Summary: Comparing at a Glance

- **Monolith**
    - One deployable, simple to start.
    - Risk of uncontrolled coupling as system grows.
    - Great for small teams and early stages.

- **Modular Monolith**
    - One deployable, structured internally into clear modules.
    - Balances simplicity with maintainability.
    - Good long‑term option for many systems; also a good stepping stone to microservices.

- **Microservices**
    - Many deployables, independent teams and scaling.
    - High operational and conceptual complexity.
    - Powerful when you truly need independent evolution, scaling, and strong team autonomy.

Final guideline:

> Choose the **simplest architecture that solves your current problems**,  
> but design with enough **modularity** that you can evolve when those problems change.