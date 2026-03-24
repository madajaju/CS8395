# Week 10: Data Management in Distributed Systems

**Purpose:** This week focuses on the fundamental patterns and tradeoffs of managing data across multiple services, ensuring consistency, scalability, and maintainability.

---

## Lectures

1.  **[Database per Service](./database-per-service/README.md)**
    *   Learn the rationale behind service-level data isolation and the challenges it introduces for distributed systems.
2.  **[Relational vs. NoSQL Tradeoffs](./relational-vs-nosql-tradeoffs/README.md)**
    *   A deep dive into CAP theorem, consistency models (ACID vs. BASE), and choosing the right storage for the right workload.
3.  **[Caching Patterns](./caching-patterns/README.md)**
    *   Explore distributed caching strategies (Read-Through, Write-Through, Cache-Aside) and the complexities of invalidation.
4.  **[Schema Evolution and Migrations](./schema-evolution-and-migrations/README.md)**
    *   Practical techniques for evolving database schemas in a live system without downtime or breaking service contracts.

---

## Learning Objectives
By the end of this week, students will be able to:
- Evaluate the impact of database isolation on service coupling and system performance.
- Justify the choice of a specific database technology based on workload characteristics and consistency requirements.
- Design resilient caching strategies that balance performance with data freshness.
- Implement zero-downtime schema migrations using the expand-and-contract pattern.