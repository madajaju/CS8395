# Week 13: Infrastructure and Security

**Purpose:** This week explores the connective tissue of modern distributed systems: how they are secured, deployed, and managed for cost and performance.

---

## Lectures

1.  **[API Gateway vs. Service Mesh](./api-gateway-vs-service-mesh/README.md)**
    *   Understand the roles of "North-South" vs "East-West" traffic management and when to use each.
2.  **[Deployment Strategies](./deployment-strategies/README.md)**
    *   Compare Blue/Green, Canary, and Rolling updates and their impact on system availability and risk.
3.  **[Zero Trust Basics](./zero-trust-basics/README.md)**
    *   Learn the fundamental shift from "Perimeter Security" to "Never Trust, Always Verify" in microservices.
4.  **[Designing for Cost](./designing-for-cost/README.md)**
    *   Practical architectural patterns for managing cloud costs (egress, compute, storage) without sacrificing performance.

---

## Learning Objectives
By the end of this week, students will be able to:
- Distinguish between an API Gateway (edge) and a Service Mesh (internal).
- Evaluate a deployment strategy based on the risk profile of a release.
- Apply Zero Trust principles (mTLS, JWT) to service-to-service communication.
- Identify "cost-aware" architectural choices in a distributed system design.