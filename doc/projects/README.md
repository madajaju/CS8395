# Project Options (Choose One)

You will use **one domain** across A0 → A4.  
Your job is to design a **scalable, resilient microservice architecture** around it — not just “make it work,” but make it work **under load**, across clouds, and with real failure modes.

Each project includes:

- synthetic datasets (small / medium / large),
- documented schemas,
- a PlantUML data model to reason about architecture,
- freedom to choose MVC, DOV, or a similar architectural style.

> 🔎 No starter code is provided — part of the learning is deciding **how** to design controllers, models, boundaries, and services.

---

## [Project 1 — Movie / Media Recommender](./project1)

**Concept:** build a service that stores movies, tracks ratings, and produces recommendations or summaries.

**Core entities:** Movies, Ratings, Users (optional)

**Architectural highlights:**

- read-heavy workloads
- interesting caching strategies
- opportunities for async background computation (recommendations, aggregates)

**Scaling angles to explore:**

- hot vs cold movie data
- rating ingest vs recommendation queries
- denormalization and projections

**Good choice if you enjoy:** analytics, ranking, recommendation logic.

---

## [Project 2 — IoT Smart Home Sensor Platform](./project2)

**Concept:** devices send readings to your platform, which stores and analyzes them.

**Core entities:** Devices, Readings, Homes

**Architectural highlights:**

- high-volume streaming ingestion
- time-series workloads
- event-driven pipelines and alerts

**Scaling angles to explore:**

- burst traffic (thousands of readings/second)
- backpressure and queueing
- hot vs cold storage strategies

**Good choice if you enjoy:** real-time systems, streaming, observability-like workloads.

---

## [Project 3 — Online Store / Shopping Cart](./project3)

**Concept:** customers browse products, create carts, place orders, and track fulfillment.

**Core entities:** Products, Orders, OrderItems, Customers

**Architectural highlights:**

- strong transaction boundaries
- consistency vs availability tradeoffs
- multi-service workflow orchestration (cart → payment → shipping)

**Scaling angles to explore:**

- checkout/load bottlenecks
- inventory concurrency
- idempotent operations

**Good choice if you enjoy:** transactional design and workflow coordination.

---

## [Project 4 — Social News Feed / Content Aggregator](./project4)

**Concept:** users post content and vote; feeds update based on activity.

**Core entities:** Users, Posts, Votes

**Architectural highlights:**

- fan-out write vs fan-out read patterns
- ranking pipelines
- cache invalidation and feed recomputation

**Scaling angles to explore:**

- explosive hot-post behavior
- user-centric partitioning
- eventual consistency vs real-time freshness

**Good choice if you enjoy:** distributed systems behavior at scale.

---

## [Project 5 — Food Delivery & Restaurant Ordering](./project5)

**Concept:** customers place orders, restaurants prepare them, drivers deliver them.

**Core entities:** Restaurants, MenuItems, Orders, Deliveries, Drivers

**Architectural highlights:**

- multi-actor workflow (customer → restaurant → driver)
- complex state management (`PLACED → ACCEPTED → DELIVERING → DELIVERED`)
- failure & retry strategies

**Scaling angles to explore:**

- dealing with late/failed deliveries
- queueing and dispatch strategies
- compensating transactions

**Good choice if you enjoy:** workflow and state machine design.

---

## Dataset Sizes

Every project includes three tiers to stress-test architecture:

| Size  | Purpose |
|------:|---------|
| **small**  | development & correctness |
| **medium** | initial load testing |
| **large**  | scalability, bottleneck hunting |

You should expect different designs to behave differently at each level — **that’s intentional.**

---

## Architectural Expectations

Regardless of project choice, you should:

✔ define clear service boundaries  
✔ justify sync vs async communication  
✔ design for failure (timeouts, retries, circuit breakers)  
✔ separate **domain logic** from **delivery logic**  
✔ explain tradeoffs — not just what you built, but *why*

Acceptable high-level patterns include:

- MVC
- DOV (Domain–Object–View)
- Hexagonal / Ports & Adapters
- CQRS (if appropriate — explain why)

> 🧠 The “right” answer is **not** always the most complicated architecture — it’s the one that scales and fails gracefully.

---

## Choosing a Project

Pick the one that:

1. you find most engaging, and
2. gives you opportunities to showcase **scalability thinking**.

Once chosen, stick with it — the consistency across assignments is what reveals architectural strengths and weaknesses.

---

If you have questions about suitability or scope, bring them to class or office hours — **before you commit**.  
Happy architecting! 🚀
