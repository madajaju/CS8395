# A3 – Reactive / Async Pipeline & Performance Analysis

**Goal:**  
Build a **data processing pipeline** twice — once blocking and once reactive — then compare performance, scalability, and operational behavior.

---

## What You Must Do

0. **Define the Pipeline**
   - Example patterns:
     - movie ranking refresh  
     - anomaly detection on sensor stream  
     - recommendation batch job  
     - feed aggregation  
     - order analytics

1. **Blocking Implementation**
   - Process items sequentially.
   - Log throughput and latency.

2. **Reactive / Async Implementation**
   - Use Reactor, RxJS, asyncio, Go channels, etc.
   - Implement backpressure.
   - Parallelize safely.

3. **Load Testing**
   - Run the pipeline on:
     - small dataset  
     - medium dataset  
     - large dataset
   - Collect metrics:
     - requests per second
     - CPU
     - memory
     - error rates

4. **Observability**
   - Add:
     - structured logs
     - metrics counters
     - tracing across pipeline stages

5. **Write Analysis**
   - Explain:
     - when async helps  
     - when it complicates things  
     - impact on resilience

---

## Documentation & Deliverables

Include in `A3/README.md`:

- Pipeline diagrams (before/after)
- Charts or tables of performance data
- Explanation of key findings (2–3 pages)
- Scripts or instructions to rerun tests
- Screenshots of logs/metrics/traces

---

## How You Will Be Graded

- **Correct Pipeline Implementations** (25%)  
- **Backpressure and Async Concepts Used Properly** (25%)  
- **Meaningful Performance Testing** (20%)  
- **Clear, Insightful Analysis** (20%)  
- **Observability Evidence** (10%)

---

## Tips & Best Practices

- Avoid premature optimization — get correctness first.  
- Use reproducible load scripts.  
- Compare apples to apples — same dataset, same conditions.
