# Retries, Timeouts & Backoff in Microservices: Reliable Client‑Server Resilience Patterns

Video: https://youtu.be/I6clrLp1nsI

This lecture breaks down retries, timeouts, and backoff strategies for resilient microservice communication. Learn how to prevent cascading failures, handle idempotent vs non‑idempotent requests, use exponential backoff with jitter, set retry budgets, and apply circuit breakers for fail‑fast behavior. Includes practical guidance on error handling, observability, and real‑world API call examples.


## 1. Motivation: Why Networks Fail in the Real World

Distributed systems depend on networks. Networks are imperfect:

- Packets get lost
- Services become overloaded
- Temporary outages happen
- Latency spikes at unpredictable times

A request that fails once might succeed a second later. The question is: **how do we retry safely and predictably?**

Retries, timeouts, and backoff are the core tools for managing these transient failures.

---

## 2. Core Definitions

**Timeout**
- A maximum time to wait for a response before giving up.
- Prevents a client from hanging forever on a slow or stalled request.

**Retry**
- A deliberate re-attempt of a failed request.
- Used when failures are likely temporary.

**Backoff**
- A strategy to wait longer between each retry attempt.
- Prevents a thundering herd of retries overwhelming a struggling service.

Together, these create a controlled failure-recovery loop.

---

## 3. The Failure Categories That Matter

Not all failures are equal. The decision to retry should depend on *why* the call failed.

**Often safe to retry**
- Network timeouts
- Connection resets
- 5xx server errors (if the operation is safe or idempotent)

**Often unsafe to retry**
- 4xx client errors (bad request, unauthorized)
- Failures after non-idempotent operations (e.g., "charge credit card")

Good systems distinguish between **transient** and **permanent** failures.

---

## 4. Timeouts: The First Line of Defense

Without timeouts:

- Clients can block indefinitely
- Threads or resources are exhausted
- Cascading failure becomes more likely

Timeouts should be:

- Short enough to fail fast
- Long enough to cover normal latency variance

Common practice: use **different timeouts** for different operations.

Example:

- Cache read: 20 ms
- Database read: 100 ms
- External API call: 500 ms

---

## 5. Retries: Useful, But Dangerous

Retries can dramatically improve reliability for transient failures, but they introduce risk:

- **Duplicate requests** if the first attempt actually succeeded
- **Retry storms** that amplify load
- **Hidden latency** if every call retries multiple times

Retries should always be paired with:

- Idempotent operations
- Backoff strategies
- A maximum number of attempts

---

## 6. Idempotency and Safe Retries

An operation is **idempotent** if repeating it has the same effect as running it once.

Examples:

- `GET /users/123` is idempotent
- `PUT /users/123` (set state to X) is idempotent
- `POST /payments` is **not** idempotent by default

To make non-idempotent operations safe:

- Use **idempotency keys**
- Store and deduplicate requests on the server

This lets retries happen without duplicate side effects.

---

## 7. Backoff Strategies

The purpose of backoff is to spread retries over time so the target system can recover.

Common strategies:

- **Fixed backoff**: wait a constant time (e.g., 200 ms)
- **Linear backoff**: wait increases by a fixed amount each retry
- **Exponential backoff**: wait doubles each retry (e.g., 100 ms, 200 ms, 400 ms)

Most production systems use **exponential backoff with jitter**:

- Jitter adds randomness to prevent synchronized retries.
- Example: wait time randomly chosen between 0 and the exponential backoff value.

---

## 8. Retry Budgeting and Limits

Unlimited retries cause runaway systems.

Best practices:

- Set a **max retry count** (e.g., 3 attempts total)
- Use a **time limit** (e.g., stop retrying after 2 seconds)
- Implement **retry budgets** per client or per service

A retry budget limits how many retries are allowed in a given window, which prevents retry storms during outages.

---

## 9. Interactions with Circuit Breakers

Retries and timeouts are often paired with **circuit breakers**:

- If a dependency is failing repeatedly, the circuit breaker "opens"
- Calls fail fast until the dependency shows signs of recovery

This prevents retries from constantly hammering a broken service and improves overall system stability.

---

## 10. Observability and Tuning

Retries and timeouts are not set-and-forget. They need monitoring:

- Track retry rates
- Measure latency distribution
- Detect when a dependency slows down

Tuning examples:

- If retries spike, reduce retry attempts or add jitter.
- If timeouts trigger too often, increase timeouts or optimize the dependency.

---

## 11. Example Scenario

Consider a service that calls a third-party shipping API:

1. The API call times out at 500 ms.
2. The client retries with exponential backoff and jitter.
3. The call succeeds on the second attempt.
4. If retries exceed the limit, the request fails fast and returns a 503 to the user.

The result is a balance of **reliability** and **system stability**.

---

## 12. Code Snippets (Short Examples)

These examples show timeouts, retries, and backoff patterns in four languages.

### Node.js (fetch with timeout + retry loop)

```javascript
const maxAttempts = 3;
for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 500);
  try {
    await fetch(url, { signal: controller.signal });
    break;
  } catch (err) {
    if (attempt === maxAttempts) throw err;
    await new Promise(r => setTimeout(r, 100 * attempt));
  } finally {
    clearTimeout(timer);
  }
}
```

### Go (timeout + exponential backoff)

```go
timeout := 500 * time.Millisecond
for attempt := 1; attempt <= 3; attempt++ {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	err := call(ctx)
	cancel()
	if err == nil { break }
	time.Sleep(time.Duration(100*attempt) * time.Millisecond)
}
```

### Python (requests-style timeout + retry)

```python
for attempt in range(3):
    try:
        requests.get(url, timeout=0.5)
        break
    except requests.RequestException:
        time.sleep(0.1 * (attempt + 1))
```

### Java Spring (simple retry loop)

```java
for (int attempt = 1; attempt <= 3; attempt++) {
    try {
        restTemplate.getForObject(url, String.class);
        break;
    } catch (Exception ex) {
        Thread.sleep(100L * attempt);
    }
}
```

---

## 13. Code Snippets: Idempotency Keys

These examples show attaching an idempotency key to a non-idempotent request.

### Node.js (header on POST)

```javascript
const key = crypto.randomUUID();
await fetch(url, {
  method: "POST",
  headers: { "Idempotency-Key": key }
});
```

### Go (client header)

```go
req, _ := http.NewRequest("POST", url, body)
req.Header.Set("Idempotency-Key", uuid.NewString())
```

### Python (requests header)

```python
key = str(uuid.uuid4())
requests.post(url, json=payload, headers={"Idempotency-Key": key})
```

### Java Spring (RestTemplate header)

```java
HttpHeaders headers = new HttpHeaders();
headers.set("Idempotency-Key", UUID.randomUUID().toString());
```

---

## 14. Key Takeaways

- Timeouts prevent requests from hanging and protect system resources.
- Retries can improve reliability but must be controlled.
- Backoff and jitter prevent synchronized retry storms.
- Idempotency is critical for safe retries.
- Use retry limits and budgets to prevent runaway behavior.
