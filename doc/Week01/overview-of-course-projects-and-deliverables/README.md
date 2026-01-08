# What Problems Do Microservices Solve?

**Length:** 10–15 minutes  
**Audience:** Developers & architects with basic backend experience  
**Focus:** Understanding *which problems* microservices are actually good at solving, and when they are the wrong tool.

---

## 1. Setting the Stage

Microservices are often sold as the answer to everything:

- “We need to scale — let’s do microservices.”
- “We have legacy code — let’s rewrite in microservices.”
- “Modern systems use microservices — we should too.”

But microservices **introduce** a lot of complexity. They are only worth that cost if they solve **specific, real problems** you actually have.

This lecture focuses on:

- The *actual* problems microservices target.
- Situations where they’re a good fit.
- Risks and tradeoffs you pay for the benefits.

Goal: after this, “We should adopt microservices” should be a **conclusion**, not a starting assumption.

---

## 2. Quick Definition (So We’re on the Same Page)

A **microservices architecture** is a style where:

- The system is composed of **multiple small services**, each:
    - Has a **single, focused responsibility** (ideally a business capability).
    - Is **independently deployable** (its own process/container, its own lifecycle).
    - Often has **its own datastore or schema**.
- Services communicate via the **network**:
    - HTTP/REST, gRPC, messages, events, etc.
- Each service is typically owned by **one team** (“you build it, you run it”).

Key property:

> **Independent change and deployment** of services, within a larger system.

Keep this in mind: if you have “microservices” that *can’t* be changed and released independently, you may just have a **distributed monolith**.

---

## 3. The Core Problems Microservices Aim to Solve

### 3.1 Problem: Slow Delivery in a Growing Codebase

**Symptoms in a monolith or large system:**

- Every change requires touching a huge codebase.
- Builds and test suites take a long time.
- A small change in one area risks breaking unrelated functionality.
- Multiple teams constantly conflict in the same repo:
    - Merge conflicts
    - Surprising side effects
    - “Who owns this code?” confusion

**What microservices try to solve:**

- **Smaller, focused codebases** per service:
    - Faster builds and tests.
    - Less to load and understand for any one change.
- **Clear responsibility boundaries**:
    - Teams own specific services.
    - Local changes don’t require understanding the entire system.
- **Parallel development**:
    - Multiple teams can work independently on their services without stepping on each other.

**Caveat:**  
You can solve part of this with a **modular monolith**. Microservices become useful when the number of teams, features, and changes makes a single deployable unit a bottleneck.

---

### 3.2 Problem: Coupled Release Cycles

**Symptoms:**

- To ship a new feature, **multiple teams** must coordinate.
- A change in one area requires a **full system release**:
    - Long release trains.
    - Strict windows and freeze periods.
- One unstable component delays **everyone’s** release.

**What microservices try to solve:**

- **Independent deployments**:
    - Each service can be released on its own schedule.
    - Small, frequent deployments are safer and faster.
- **Reduced coordination**:
    - As long as service contracts (APIs, events) are honored, teams can release independently.

Concrete benefits:

- Product teams can deliver features **incrementally**, without waiting for a “big bang” release.
- Critical fixes can be pushed for one service without re-releasing everything.

**Precondition:**  
You need **backward-compatible APIs** and good versioning practices; otherwise, independence is theoretical only.

---

### 3.3 Problem: Scaling Different Parts of the System Differently

**Symptoms in a monolith:**

- Some parts are “hot” (e.g., search, checkout, real-time updates).
- Other parts are “cold” (e.g., admin screens, reports).
- But you can only **scale the entire monolith** together:
    - Wastes resources.
    - Hard to tune for different workloads (CPU-bound vs IO-bound).
- Resource hogs in one area starve other parts.

**What microservices try to solve:**

- **Independent scaling**:
    - Scale `search-service` aggressively.
    - Keep `admin-service` small.
- **Tailored resources and tech choices**:
    - Memory- or CPU-heavy services can run on bigger instances.
    - IO-heavy services can be optimized differently.

Effect:

- Potential **cost savings** when scaling.
- More predictable performance for critical flows.

**Caveat:**  
You only see this benefit when scaling needs are truly **uneven** and large enough. For small systems, scaling a monolith horizontally is simpler and often sufficient.

---

### 3.4 Problem: Fragile Fault Isolation

**Symptoms:**

- One bug or memory leak in a component:
    - Crashes or hangs the entire monolith.
- A slow external dependency:
    - Blocks threads/requests across large parts of the system.
- It’s hard to degrade gracefully:
    - If “recommendations” are down, the whole app suffers.

**What microservices try to solve:**

- **Process-level isolation**:
    - Each service is a separate process/container.
    - A crash in `recommendations-service` doesn’t directly crash `orders-service`.
- **Targeted failure handling**:
    - Use timeouts, circuit breakers, retries per dependency.
    - Fallback behavior if a non-critical service is down.

Benefits:

- Ability to degrade gracefully:
    - Hide recommendations, but keep purchasing.
    - Show cached or partial data for non-critical services.
- More **bounded blast radius** (in theory).

**Reality check:**  
Without proper resilience patterns (timeouts, backpressure, bulkheads), microservices can **amplify** failures via cascading timeouts and retries.

---

### 3.5 Problem: Technology & Schema Lock-In

**Symptoms:**

- One language, one framework, one database for everything.
- Migrating tech stack is a huge coordinated effort:
    - Hard to introduce new storage technologies or frameworks.
- Different parts of the system have **different needs**, but are constrained by a “one size fits all” stack.

**What microservices try to solve:**

- **Polyglot architectures**:
    - Each service can choose language, framework, or database best suited for its needs (within reasonable governance).
- **Incremental modernization**:
    - New services can be created with modern tech.
    - Old services can be replaced or wrapped over time.

Example:

- Use a relational DB for core transactional services.
- Use a document or search store for catalog and search-focused services.

**Caveat:**  
Too much tech variety increases cognitive load and operational complexity. You still need **sensible guardrails** (a small, supported set of stacks).

---

### 3.6 Problem: Misaligned System Boundaries and Team Boundaries

**Symptoms:**

- Teams constantly fight over changes in the same code area.
- Ownership is fuzzy:
    - “Who owns this module/table/service?” is unclear.
- Org chart and code structure don’t match:
    - Leads to coordination overhead and blame shifting.

**What microservices try to solve:**

- Align services with **business capabilities** and **teams**:
    - One team owns `payments-service`.
    - Another owns `catalog-service`, etc.
- Each team:
    - Has clear responsibility.
    - Can make decisions within their domain with minimal external approvals.

This is leveraging **Conway’s Law** intentionally:

> Structure teams so the system architecture you want  
> naturally emerges from who talks to whom.

**Note:**  
You can also get many of these benefits with a **modular monolith** if you enforce boundaries and ownership within a single deployment.

---

## 4. Problems Microservices Do *Not* Magically Solve

It’s important to be explicit about what microservices **don’t** fix:

- **Bad domain modeling**:
    - If you don’t understand your domain, you’ll just have badly designed microservices instead of badly designed modules.
- **Poor team practices**:
    - Lack of testing, reviews, or communication will hurt you in any architecture.
- **Performance issues from bad algorithms or data access**:
    - Microservices introduce network overhead. They rarely make pure compute faster.
- **Lack of observability**:
    - Microservices *require* better logs/metrics/tracing than monoliths, they don’t give it to you automatically.
- **Organizational dysfunction**:
    - If teams don’t collaborate well, adding network boundaries will not fix that; it can make it worse.

Microservices amplify both **good** and **bad** practices.

---

## 5. Preconditions for Microservices to Actually Help

Before microservices can solve the problems above, you generally need:

1. **Sufficient system and team size**
    - Multiple teams working in parallel.
    - A codebase and domain large enough that one deployable is a true bottleneck.

2. **Operational maturity**
    - Reliable CI/CD pipelines.
    - Centralized logging and metrics.
    - Tracing and good debugging tools.
    - On-call practices and incident response.

3. **Reasonably stable boundaries**
    - Clear-ish business capabilities or bounded contexts.
    - Some understanding of where to draw service lines.

4. **Organizational support**
    - Leadership understanding the tradeoffs.
    - Willingness to invest in platform/tooling (service discovery, config, secrets, etc.).

Without these, you risk creating a more complex system without solving the root issues.

---

## 6. Risks and Tradeoffs Introduced by Microservices

For every problem microservices solve, they bring **new challenges**:

### 6.1 Increased Operational Complexity

- Many services = many:
    - Deployments
    - Configurations
    - Monitoring dashboards
    - Failure modes
- Need to manage:
    - Service discovery
    - Network policies and security between services
    - Version compatibility

### 6.2 Distributed Systems Issues

- Network is unreliable:
    - Timeouts, partial failures, retries.
- New failure modes:
    - Cascading failures if one critical service slows or fails.
- Harder debugging:
    - A single user request can span multiple services.

### 6.3 Data Consistency Challenges

- No simple cross-service ACID transactions.
- Need patterns like:
    - Sagas
    - Event-driven consistency
    - Compensating transactions
- Eventual consistency is harder for teams and stakeholders to reason about.

### 6.4 Testing Complexity

- Unit tests are local, but:
    - Integration and end-to-end tests must cover interactions between services.
- Harder to set up realistic test environments:
    - Dozens of services, databases, and external dependencies.

### 6.5 Risk of a “Distributed Monolith”

- Symptoms:
    - Many services, but every change requires touching multiple of them.
    - Tight coupling via shared schemas, synchronized releases, hidden dependencies.
- Result:
    - All the pain of a monolith **plus** network overhead.

---

## 7. How to Decide: Do We Need Microservices for This?

Questions to ask:

1. **Team / Org Size**
    - How many teams will work on this system?
    - Are shared release trains truly blocking progress?

2. **Scale / Performance**
    - Are there clear hotspots that need independent scaling *now* or soon?
    - Is monolith scaling really failing, or just not yet optimized?

3. **Domain Complexity**
    - Can we already identify sensible, stable boundaries for services?
    - Or is the domain still shifting rapidly?

4. **Ops Readiness**
    - Do we have good CI/CD, monitoring, and on-call?
    - If we had 10–20 services, could we operate them reliably?

5. **Concrete Pain Points**
    - What are today’s biggest problems?
    - How exactly would microservices reduce that pain, and what new pain would they add?

If you can’t name **specific, current problems** that microservices would address, you’re probably not ready—or don’t need them yet.

---

## 8. Summary: What Problems Do Microservices Solve?

Microservices can effectively address:

1. **Slow, tangled development in large codebases**  
   → via smaller, focused services and clearer ownership.

2. **Coupled release cycles and coordination overhead**  
   → via independent deployments and versioned APIs.

3. **Uneven scaling needs across different parts of the system**  
   → via independent scaling of services with tailored resources.

4. **Poor fault isolation in a single runtime**  
   → via process-level isolation and targeted resilience patterns.

5. **Technology and schema lock-in across the whole system**  
   → via polyglot services and incremental modernization.

6. **Misalignment between system structure and team structure**  
   → via service boundaries aligned to business capabilities and teams.

But they **do not**:

- Automatically fix bad design, poor practices, or organizational issues.
- Come for free: they introduce significant complexity in operations, data consistency, testing, and overall system understanding.

**Final thought:**

> Use microservices when their benefits directly address your *actual* pain points,  
> and you’re ready to pay the cost in complexity.  
> Otherwise, invest in a well-structured monolith or modular monolith first.