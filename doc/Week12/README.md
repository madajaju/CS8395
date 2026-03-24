# Week 12: Observability and Reliability

**Purpose:** This week focuses on the operational excellence of distributed systems: how to see what is happening across services and how to ensure they remain healthy under load.

---

## Lectures

1.  **[Logs, Metrics, and Traces](./logs-metrics-and-traces/README.md)**
    *   Learn the "Three Pillars of Observability" and when to use each to diagnose system behavior.
2.  **[Distributed Tracing Basics](./distributed-tracing-basics/README.md)**
    *   Understand how to follow a single request as it traverses multiple services using correlation IDs and context propagation.
3.  **[Health and Readiness](./health-and-readiness/README.md)**
    *   Explore the crucial difference between a service being "alive" and a service being "ready" to accept traffic.
4.  **[Capacity and Load Testing](./capacity-and-load-testing/README.md)**
    *   Practical techniques for identifying bottlenecks before they cause production outages.

---

## Learning Objectives
By the end of this week, students will be able to:
- Distinguish between structured logging, time-series metrics, and distributed tracing.
- Implement context propagation to enable end-to-end request visibility.
- Design effective health check endpoints for container orchestrators (e.g., Kubernetes).
- Define SLIs (Service Level Indicators) and SLOs (Service Level Objectives) based on load test results.