# Caching Patterns

**Purpose:** Explains how to use distributed caching to improve the performance and scalability of distributed systems, while navigating the complexities of data consistency.

**Outcomes**
- Identify the core caching strategies (Cache-Aside, Write-Through, Read-Through).
- Analyze the impact of cache eviction and invalidation on system reliability.
- Design strategies to handle common caching failures (Thundering Herd, Cache Stampede).

---

## Overview
Caching is the act of storing a copy of data in a high-speed storage layer (usually RAM) to serve future requests faster. In a distributed system, caching is not just about speed; it's about reducing load on downstream databases and services.

## Core Caching Strategies

### 1. Cache-Aside (Lazy Loading)
The application first checks the cache. If the data is missing (a "miss"), it loads it from the database and updates the cache.
- **Pros:** Resilience to cache failure; only requested data is cached.
- **Cons:** Cache misses on initial requests; potential for stale data.

### 2. Read-Through
The application interacts only with the cache. If a miss occurs, the cache itself fetches the data from the database.
- **Pros:** Simplified application logic; consistent read performance.
- **Cons:** Requires a cache provider that supports this (e.g., Redis with modules).

### 3. Write-Through / Write-Behind
- **Write-Through:** Data is written to the cache and the database simultaneously.
- **Write-Behind:** Data is written to the cache first, and the database is updated asynchronously.
- **Pros:** Always-fresh data; high write performance (Write-Behind).
- **Cons:** Write latency (Write-Through); risk of data loss if the cache fails before the DB is updated (Write-Behind).

---

## The Hardest Problem: Invalidation
"There are only two hard things in Computer Science: cache invalidation and naming things." - Phil Karlton.
- **TTL (Time to Live):** The simplest form of invalidation. Data expires after a fixed time.
- **Event-Based Invalidation:** The service that owns the data emits an event on change, and the cache-holding services subscribe and purge their keys.

---

## Code Examples

### Python: Cache-Aside Pattern
```python
def get_user_profile(user_id):
    # 1. Try Cache
    profile = cache.get(f"user:{user_id}")
    if profile: return profile

    # 2. On Miss, Try DB
    profile = db.users.find_one({"id": user_id})
    
    # 3. Update Cache for next time
    if profile:
        cache.set(f"user:{user_id}", profile, ttl=3600)
    
    return profile
```

### Go: Atomic "Thundering Herd" Prevention
```go
func getData(key string) (Data, error) {
    // Singleflight ensures only one concurrent call to the slow source
    v, err, _ := group.Do(key, func() (interface{}, error) {
        return fetchFromDB(key)
    })
    return v.(Data), err
}
```

### Node.js: Event-Driven Invalidation
```javascript
// Subscribe to "user.updated" to clear cache
messaging.on('user.updated', (event) => {
    cache.del(`user:${event.userId}`);
    console.log(`Cache cleared for ${event.userId}`);
});
```

---

## Design Diagram

```plantuml
@startuml
skinparam componentStyle uml2

actor Client
component App
database Cache
database DB

== Cache Hit ==
Client -> App : GET /profile/1
App -> Cache : GET user:1
Cache --> App : { profile }
App --> Client : 200 OK

== Cache Miss (Cache-Aside) ==
Client -> App : GET /profile/2
App -> Cache : GET user:2
Cache --> App : null
App -> DB : SELECT * FROM users...
DB --> App : { profile }
App -> Cache : SET user:2
App --> Client : 200 OK
@enduml
```

## Risks and Tradeoffs
- **Stale Data:** Inconsistency between the cache and the source of truth is the biggest risk.
- **Memory Pressure:** Caches are expensive. You must use eviction policies (LRU, LFU) to manage space.
- **Availability:** If the system depends heavily on the cache for performance, a cache failure can lead to a "Cascade Failure" on the database.
