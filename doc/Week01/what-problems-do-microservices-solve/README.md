---
marp: true
title: What Problems Do Microservices Solve?
paginate: true
theme: default
---

# What Problems Do Microservices Solve?

Video:https://youtu.be/oJzoxm6bV4Q 

**Goals**

- Understand *which problems* microservices actually address
- Recognize when they are (and aren’t) a good fit
- Be aware of key risks and tradeoffs

---

# 1. Microservices in Context

Microservices are often treated as a default:

- “We need to scale → use microservices”
- “We have legacy code → rewrite as microservices”
- “Modern = microservices”

But they **add a lot of complexity**.

**Key idea**

> Microservices only make sense if they solve **specific problems you really have**  
> better than simpler alternatives.

---

# 2. Quick Definition

A **microservices architecture**:

- System composed of **multiple small services**, each:
    - Focused on a **single responsibility / capability**
    - **Independently deployable** (own process/container)
    - Often has its **own datastore or schema**
- Services communicate over the **network**:
    - HTTP/REST, gRPC, messages, events
- Typically owned by **one team** (“you build it, you run it”)

If services **can’t** be changed and deployed independently,  
you may have a **distributed monolith**, not microservices.

---

# 3. Problem: Slow Delivery in a Huge Codebase

**Symptoms**

- One large codebase; every change touches a lot of stuff
- Builds and tests are slow
- Merge conflicts and surprising side effects
- Unclear ownership: “Who owns this part?”

**Microservices help by**

- Splitting into **smaller, focused codebases**
- Giving teams **clear responsibility** per service
- Enabling **parallel development** without constant conflicts

*Note*: A well‑structured **modular monolith** can also help here.

---

# 4. Problem: Coupled Release Cycles

**Symptoms**

- Shipping a feature needs **multiple teams** and a **full system release**
- Release trains, change freezes, and high coordination cost
- One unstable component delays **everyone**

**Microservices help by**

- Allowing **independent deployments** per service
- Letting teams ship on **their own schedule**
- Enabling **small, frequent, safer releases**

**Precondition**

- Backward‑compatible APIs and sane versioning—otherwise independence is fake.

---

# 5. Problem: Uneven Scaling & Poor Isolation

**Scaling symptoms**

- Some parts are “hot” (e.g., search, checkout), others “cold” (admin, reports)
- Monolith forces you to **scale everything together**

**Isolation symptoms**

- One bug or slowdown can bring down the entire app
- Hard to degrade gracefully (e.g., hide recommendations but keep ordering)

**Microservices help by**

- Letting you **scale services independently**
- Providing **process-level isolation**
- Supporting graceful degradation with timeouts, retries, fallbacks

**Caveat**

- Without good resilience patterns, failures can still **cascade**.

---

# 6. Problem: Tech & Schema Lock‑In

**Symptoms**

- One language/framework/DB for everything
- Changing tech stack is a massive, risky migration
- Different parts of the system have **different needs**, but share one stack

**Microservices help by**

- Allowing **polyglot architectures** (within guardrails)
- Letting you modernize **incrementally**, service by service
- Matching storage/tech to **service needs** (e.g., relational vs document vs search)

Too much tech diversity, though, increases cognitive and ops load.

---

# 7. Problem: Misaligned Boundaries & Teams

**Symptoms**

- Teams constantly collide in the same code areas
- Ownership is fuzzy; blame and coordination overhead are high
- Org structure and system structure don’t line up

**Microservices help by**

- Aligning services to **business capabilities** and **teams**
    - e.g., `payments-service`, `catalog-service`, `orders-service`
- Giving each team **clear ownership** and autonomy

You can get some of this with a **modular monolith** if you enforce boundaries and ownership.

---

# 8. What Microservices Do *Not* Magically Fix

Microservices do **not** automatically solve:

- Bad domain modeling or unclear requirements
- Poor engineering practices (tests, reviews, communication)
- Performance problems from bad algorithms or queries
- Lack of observability (they actually demand *more* of it)
- Organizational dysfunction or misaligned incentives

They **amplify** both good and bad practices.

---

# 9. Costs & Preconditions

**Preconditions for benefits**

- System and team size justify the split
- Reasonably stable domain boundaries
- Operational maturity:
    - CI/CD, monitoring, tracing, on‑call, config/secrets management

**Costs introduced**

- More operational complexity (deployments, configs, failure modes)
- Distributed systems issues (timeouts, retries, partial failures)
- Data consistency challenges (no easy cross‑service ACID)
- Harder testing and debugging across services

---

# 10. Summary

Microservices **do** help with:

- Large, tangled codebases and slow delivery
- Coupled release cycles and coordination overhead
- Uneven scaling and need for better isolation
- Tech/schema lock‑in across an entire system
- Misalignment between system and team boundaries

But:

> Use microservices **because they solve concrete problems you have**,  
> and you’re ready to pay the complexity cost—  
> not just because “everyone else is doing it.”