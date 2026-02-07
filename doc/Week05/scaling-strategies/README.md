# Microservices Scaling Strategies: Horizontal vs Vertical, Caching, Load Balancing & Sharding

Video: https://youtu.be/NwYMr7qEttw

This lecture gives a high‑level roadmap for scaling microservices, covering vertical vs horizontal scaling, stateless vs stateful services, load balancing strategies, caching, and data‑layer techniques like read replicas and sharding. It also touches on async workloads, cost/complexity trade‑offs, and practical scaling scenarios for traffic spikes and product launches.

## 1. Motivation: Growth Breaks Assumptions

Systems are often designed for early traffic, then suddenly face:

- A growing user base
- Seasonal spikes
- Unplanned load from a new customer or feature

When load increases, what used to be "fast enough" can become slow or unreliable. Scaling is about **sustaining performance and reliability as demand grows**.

---

## 2. Two Fundamental Directions: Vertical vs Horizontal

**Vertical scaling (scale up)**  
Add more resources to a single machine:

- More CPU
- More memory
- Faster storage

**Horizontal scaling (scale out)**  
Add more machines and distribute load:

- More servers behind a load balancer
- Partition data or services across nodes

Tradeoff summary:

- Vertical scaling is simpler but hits hardware limits.
- Horizontal scaling is more flexible but increases system complexity.

---

## 3. Stateless vs Stateful Implications

Scaling strategies depend on whether the service is **stateless** or **stateful**.

- **Stateless services** scale horizontally easily:
  - Any node can handle any request.
  - Use a load balancer to distribute traffic.
- **Stateful services** are harder:
  - Session data or local state ties requests to a specific node.
  - Requires sticky sessions, replication, or external state stores.

This is why many architectures push state **out** of application servers and into shared systems.

---

## 4. The Scaling Ladder: Common Tactics

Teams usually scale in stages:

1. **Optimize the code**  
   Reduce expensive calls, improve queries, add indexes.
2. **Cache aggressively**  
   Keep repeated results in memory (Redis, CDN, in-process cache).
3. **Scale vertically**  
   Buy bigger machines for immediate relief.
4. **Scale horizontally**  
   Add more nodes and distribute load.
5. **Partition data**  
   Shard databases or split services.

Each step adds cost and complexity; teams should not jump to the most complex step first.

---

## 5. Load Balancing and Traffic Distribution

Horizontal scaling usually depends on a **load balancer**:

- Routes requests across multiple servers
- Health checks remove failing nodes
- Can be layer 4 (TCP) or layer 7 (HTTP)

Key concerns:

- **Even distribution** of load
- **Fast failover**
- **Minimal overhead**

---

## 6. Caching as a Scaling Strategy

Caching reduces load without adding servers:

- **Client-side caching** (browser cache, mobile cache)
- **Edge caching** (CDNs)
- **Server-side caching** (Redis, in-memory caches)

Caching tradeoffs:

- Stale data
- Cache invalidation complexity
- Memory costs

Good caching strategy often delays the need for more expensive scaling steps.

---

## 7. Data Layer Scaling

The data layer is often the bottleneck. Common approaches:

- **Read replicas**: copy data for read-heavy workloads
- **Sharding**: split data across multiple databases
- **Partitioning**: split data by key or time

Tradeoffs:

- Replication lag
- Complex queries across shards
- Operational overhead for backups and migrations

Scaling data is usually the hardest part of scaling systems.

---

## 8. Asynchronous Workloads and Queues

Not all scaling is about handling live requests. Offload work:

- Use **message queues** (SQS, RabbitMQ, Kafka)
- Process tasks asynchronously

Benefits:

- Smooths out spikes
- Keeps user-facing latency low
- Allows background workers to scale separately

This is a core scaling tool for workloads like video processing, email sending, and analytics pipelines.

---

## 9. Cost and Complexity Tradeoffs

Scaling is not free:

- More servers mean more cost
- More moving parts mean more failure modes
- Operational complexity grows with size

Teams must balance **performance goals** with **cost constraints**.

Sometimes the best scaling move is:

- Reducing features that drive expensive load
- Improving efficiency instead of adding machines

---

## 10. Example Scenario

Imagine a product that launches and traffic doubles:

1. The team adds caching to reduce database hits.
2. They scale the web tier horizontally behind a load balancer.
3. The database becomes the new bottleneck.
4. They add read replicas and later shard by customer ID.

Each step is more complex but also more scalable.

---

## 11. Code Snippets (Short Examples)

These snippets show common scaling tactics like load balancing, caching, and async work.

### Node.js (basic in-process cache)

```javascript
const cache = new Map();
async function getUser(id) {
  if (cache.has(id)) return cache.get(id);
  const user = await db.fetchUser(id);
  cache.set(id, user);
  return user;
}
```

### Go (worker pool for async processing)

```go
jobs := make(chan Job, 100)
for i := 0; i < 4; i++ {
	go func() {
		for job := range jobs { process(job) }
	}()
}
```

### Python (simple rate limiting)

```python
last = 0.0
def allow():
    global last
    if time.time() - last < 0.1:
        return False
    last = time.time()
    return True
```

### Java Spring (cache annotation)

```java
@Cacheable("users")
public User getUser(String id) {
    return repo.findById(id);
}
```

---

## 12. Code Snippets: Shard Selection

These examples show choosing a shard based on a user ID.

### Node.js (mod-based shard)

```javascript
const shardCount = 4;
const shardId = userId % shardCount;
const db = shards[shardId];
```

### Go (hash-based shard)

```go
shardCount := 4
shardID := int(crc32.ChecksumIEEE([]byte(userID))) % shardCount
db := shards[shardID]
```

### Python (mod-based shard)

```python
shard_id = user_id % 4
db = shards[shard_id]
```

### Java Spring (simple shard router)

```java
int shardId = Math.floorMod(userId, 4);
DataSource ds = shards.get(shardId);
```

---

## 13. Key Takeaways

- Scaling strategies range from simple optimizations to complex distributed systems.
- Vertical scaling is easy but limited; horizontal scaling is powerful but complex.
- Stateless services scale more easily than stateful ones.
- Caching and asynchronous processing are often the fastest scaling wins.
- The data layer is usually the hardest part to scale.
