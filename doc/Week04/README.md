# Week 4: Program Slicing & Service Boundaries

This week focuses on how to define clean boundaries between microservices, ensuring they are highly cohesive, loosely coupled, and own their own data. We also look at low-level memory management to understand the fundamental constraints of our systems.

## Lecture Notes

### 1. [Program Slicing & Service Boundaries](./program-slicing-concepts/README.md)
Learn how to "slice" a monolith into vertical services based on business capabilities rather than horizontal technical layers.

### 2. [Cohesion and Coupling](./cohesion-and-coupling/README.md)
Explore the two most important metrics for service health: High Cohesion (doing one thing well) and Low Coupling (staying independent).

### 3. [Data Ownership Rules](./data-ownership-rules/README.md)
Understand why "Database per Service" is a hard requirement for microservices and how to handle data access across boundaries.

### 4. [Microservice Anti-Patterns](./microservice-anti-patterns/README.md)
Identify common pitfalls like the "Distributed Monolith" and "Shared Databases" that can derail your architecture.

### 5. [Memory Management](./memory-management/README.md)
A deep dive into how Operating Systems manage memory, providing the foundation for understanding application performance and scaling.

---

## Weekly Objectives
By the end of this week, you should be able to:
- Decompose a problem space into independent vertical slices.
- Justify your service boundaries using cohesion and coupling principles.
- Design data models that respect service ownership.
- Avoid common microservice anti-patterns in your projects.
- Explain how memory management affects system behavior under load.