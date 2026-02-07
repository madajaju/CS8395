# Stateless vs Stateful Microservices: Design Trade‑Offs, Scaling, and Where State Lives

Video: https://youtu.be/x8lQrDvzWQY

This lecture explains the differences between stateless and stateful services, why state matters, and how those choices impact scalability, reliability, and deployment. You’ll learn common patterns for managing state (shared stores, sticky sessions, JWTs), the risks of shared databases, and practical trade‑offs between performance and resilience. Ideal for architects deciding how to structure microservices for scale.

## 1. Motivation: Why State Matters

Every system needs to remember something:

- Who is logged in
- What items are in a cart
- Where a workflow is in its lifecycle

The architectural question is **where that memory lives**. This choice affects:

- Scalability
- Reliability
- Deployment strategy
- Cost

---

## 2. Core Definitions

**Stateless service**
- Does not retain client-specific data between requests.
- Each request contains all information needed to process it.

**Stateful service**
- Retains data or context across requests.
- Requests depend on prior interaction or local stored state.

In practice, most systems include both, but the distribution of state is a major design decision.

---

## 3. Why Stateless Services Scale Easily

When services are stateless:

- Any instance can handle any request.
- Load balancers can distribute traffic evenly.
- Instances can be added or removed without coordination.
- Failures are less disruptive because no session is "stuck" on a node.

This makes stateless design a default goal for horizontally scalable systems.

---

## 4. Why Stateful Services Are Sometimes Necessary

Some workloads require local or persistent state:

- Databases
- Caches with strong locality
- In-memory processing pipelines
- Long-running workflows

State enables efficiency and correctness but introduces operational complexity.

---

## 5. Common Examples

**Stateless**
- REST APIs that read/write from shared databases
- CDN edge servers
- Authentication gateways using tokens

**Stateful**
- Databases and message queues
- Session-based web apps without external session stores
- Real-time game servers with in-memory world state

---

## 6. Managing State in Scalable Systems

While shared databases often introduce coupling, they can be beneficial in scalable systems. 

Here’s why shared databases might be recommended:

- **Centralized Data Control**: Having a shared database can help centralize data management and ensure data consistency across services. This is pivotal for applications requiring real-time data updates.

- **Reduced Latency for Data Access**: By using a shared database, services can access the same data without having to sync states across multiple data stores, reducing the potential latency involved in state synchronization.

- **Simplified Architecture**: Relying on a shared database can often simplify the architecture since developers do not need to implement complex state-consistency algorithms. This can lead to quicker iterations and reduced development overhead.

- **Support for Cross-Service Queries**: When services share a common database, it enables more straightforward execution of cross-service queries, enhancing the overall data utility.

In contrast, it’s crucial to implement effective strategies to manage this coupling. Techniques such as strong versioning, thorough documentation, and clear API boundaries can mitigate risk when using shared databases.

---

## 7. Session State and User Context

Classic web apps stored session data in memory on a single server. This creates problems:

- Sticky sessions are required.
- Failover can lose sessions.
- Horizontal scaling becomes harder.

Modern alternatives:

- Store sessions in Redis or a database.
- Use stateless tokens (JWTs).

---

## 8. Reliability and Failure Modes

**Stateless systems**
- Easier to recover after failures.
- Lost instances do not lose critical data.

**Stateful systems**
- Must protect data through replication, backups, and recovery procedures.
- Require careful failover and consistency planning.

State increases both responsibility and risk.

---

## 9. Tradeoffs and Design Choices

Stateless systems:

- Easier to scale and deploy.
- Easier to automate in CI/CD.
- Require external state management.

Stateful systems:

- Can be faster for local operations.
- Reduce network hops for repeated access.
- Are harder to scale and recover.

The right choice depends on performance requirements, cost, and operational maturity.

---

## 10. Example Scenario

A shopping cart service can be built in two ways:

1. **Stateful**: cart stored in server memory.
   - Fast access.
   - Breaks on server failure or scaling.
2. **Stateless**: cart stored in Redis or database.
   - Slightly more latency.
   - Survives scaling and failures.

Most modern systems choose the stateless approach because it scales better.

---

## 11. Key Takeaways

- Stateless services scale and recover more easily.
- Stateful services are sometimes unavoidable but require stronger operations.
- The core design question is: **where does state live?**
- The most common pattern is stateless application servers with shared state stores.
- While shared databases introduce coupling, they provide centralized data management and can reduce latency for applications that require real-time, consistent data access.
