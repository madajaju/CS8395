# Week 9: Asynchronous Messaging Patterns

**Purpose:** This week explores the fundamental patterns and guarantees required to build reliable, decoupled distributed systems using asynchronous messaging.

---

## Lectures

1.  **[Events, Commands, and Queries](./events-commands-and-queries/README.md)**
    *   Learn the semantic differences between message types and how they impact system coupling.
2.  **[Pub/Sub vs. Message Queues](./pubsub-vs-queues/README.md)**
    *   Understand the difference between point-to-point and broadcast communication models.
3.  **[Delivery Semantics](./delivery-semantics/README.md)**
    *   Examine the guarantees provided by brokers and the impact of network failures.
4.  **[Designing Idempotent Consumers](./designing-idempotent-consumers/README.md)**
    *   Practical strategies for handling duplicate messages in "at-least-once" systems.

---

## Learning Objectives
By the end of this week, students will be able to:
- Choose the correct messaging pattern for a given business requirement.
- Design resilient consumers that can handle the realities of distributed systems.
- Explain the trade-offs between delivery guarantees and system performance.