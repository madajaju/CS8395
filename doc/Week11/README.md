# Week 11: Distributed Consistency and Coordination

**Purpose:** This week addresses the challenges of maintaining data consistency across independent services without the luxury of global ACID transactions.

---

## Lectures

1.  **[Distributed Transactions](./distributed-transactions/README.md)**
    *   Understand the fundamental limitations of consistency in distributed systems and the "Fallacy of the Network."
2.  **[Sagas vs. Two-Phase Commit](./sagas-vs-two-phase-commit/README.md)**
    *   Compare the strict coordination of 2PC with the eventual consistency and compensating actions of the Saga pattern.
3.  **[Event Carried State Transfer](./event-carried-state/README.md)**
    *   Explore how to reduce service coupling by including required state within events, eliminating the need for synchronous lookups.
4.  **[Read Models and CQRS Lite](./read-models-and-cqrs-lite/README.md)**
    *   Learn how to optimize read performance and simplify service logic by separating write and read models.

---

## Learning Objectives
By the end of this week, students will be able to:
- Explain why global transactions are often avoided in high-scale microservices.
- Design an orchestration or choreography-based Saga to handle multi-step business processes.
- Implement Event Carried State Transfer to improve service autonomy.
- Identify when to introduce a dedicated read model to solve API composition problems.