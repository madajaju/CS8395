# A4 – Capstone: Scaling, Hardening, and Operating Your Microservices System

**Goal:**  
Take the system you've built this semester and make it behave like something you could confidently deploy in production.  
This assignment focuses on **scalability, resilience, security, observability, and operational maturity** — not just more features.

By the end, you should be able to explain (and prove):

> “Here’s how my system behaves under stress, failure, and real-world operation — and here’s why.”

---

## What You Must Do

### 0️⃣ Architecture Review (Before You Touch Anything)

Step back and evaluate your system objectively.

Create a short **Architecture Review Document** (1–2 pages):

- What are your core services?
- Where do bottlenecks likely exist?
- Which services are stateful vs stateless?
- What concerns you about scaling / failures?
- What would you refactor if you had more time (and why)?

> You do **not** need to rewrite anything big — but you must demonstrate architectural thinking.

---

### 1️⃣ Horizontal Scaling Experiment

Choose **at least one service** and scale it across **2–5 replicas**.

You must demonstrate:

- Load balancing across instances
- Strategy for handling session/state:
    - stateless design **OR**
    - shared cache **OR**
    - sticky sessions (discuss tradeoffs)

Produce:

- Screenshot or logs showing multiple replicas running
- Diagram showing traffic flow
- A short comparison of:
    - **before scaling** latency/throughput
    - **after scaling** latency/throughput

> Hint: small synthetic load tests are fine — realism > perfection.

---

### 2️⃣ Failure & Chaos Testing

Break your system **on purpose**.

Choose **two** failure scenarios:

- abruptly kill a service
- increase latency artificially
- temporarily stop the database
- disconnect a queue
- introduce high CPU load
- simulate a network partition

For each:

1. Predict the outcome
2. Perform the failure
3. Capture logs/metrics
4. Explain what actually happened
5. Implement **one improvement** (example):

- tuned retry/backoff
- circuit breaker thresholds
- fallback response
- increased queue buffering
- timeout adjustments

Deliverable:

- narrative (what happened, what changed)
- screenshots/log excerpts
- explanation of the mitigation chosen

---

### 3️⃣ Security Enhancements

Add **two meaningful security improvements**, such as:

- service-to-service authentication
- restricted network ingress rules
- API tokens or signed requests
- secrets management (no keys in code)
- role separation for admin vs user
- secure headers (CORS, CSP, HSTS)

Show:

- before/after diagrams
- configuration snippets or policies
- explanation: **why this matters operationally**

> Focus on *boundaries and principle of least privilege.*

---

### 4️⃣ Observability Deep Dive

Your system must now help you **see** what is happening.

Implement or extend:

- structured logs (with correlation IDs)
- metrics (requests/sec, error counts, queue depth, etc.)
- distributed tracing across at least two services

Then document **one debugging story**:

> “Something broke. Here is how I detected it, traced it, and confirmed the cause using telemetry — not guesses.”

Deliver:

- screenshots from dashboards or log tools
- spans/traces crossing services
- short incident write-up

---

### 5️⃣ Load Test & Final Analysis

Run your system using:

- **small dataset**
- **medium dataset**
- **large dataset**

Measure:

- throughput
- latency (p50, p90 if possible)
- CPU & memory
- failure rate
- queue backlogs (if applicable)

Create a professional-style **Final Report** (3–5 pages total):

Include:

1. Architecture summary diagram
2. Scaling results (charts or tables)
3. Failure testing highlights
4. Observability learnings
5. What worked well
6. What you would change next time — and why

This paper is as important as the code.

---

## Documentation & Deliverables

Your `A4/` directory must include:

- `README.md` (this report)
- `architecture-review.md`
- Diagrams (PNG/SVG)
- Logs / screenshots folder
- Load test scripts or instructions
- Any config changes applied

> If we cannot understand or reproduce your results, credit cannot be given.

---

## How You Will Be Graded

| Category | Weight |
|---|---:|
Architecture reasoning & clarity | 20%  
Scaling experiments & analysis | 25%  
Failure handling & chaos testing | 20%  
Security improvements & justification | 10%  
Observability depth & debugging narrative | 15%  
Professionalism & organization | 10%  

---

## Tips & Best Practices

- Don’t chase perfection — chase insight.
- Explain design tradeoffs — there is rarely one “right” answer.
- Automate repeatable tests (even simple shell scripts help).
- Screenshots + logs are your best friends.
- Architecture thinking matters more than raw coding.

---

## Submission Policy

- Due Sunday at **11:59 PM Nashville time**.
- Submit via GitHub — ensure all artifacts are visible.
- No late submissions will be accepted.

---

## Final Thought

This assignment isn’t about showing that things never fail.

It’s about demonstrating that:

> **You understand how real systems fail — and how good architecture responds.**
