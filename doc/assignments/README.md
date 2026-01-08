# Scalable Microservices Course — Assignments (A0–A4)

In this course, you will design, build, and evolve a **polyglot, scalable microservices architecture** across four progressively deeper assignments.

Instead of rewriting code every week, you’ll **grow the same system** while comparing Java, Node.js, Python, and/or Go approaches.

> Core themes: **architecture first**, design patterns, resiliency, async messaging, observability — then implementation across languages.

---

## Reference architecture expectations

Your chosen project (Movie Recommender, IoT Sensors, E-Commerce, Social Feed, or Food Delivery) must maintain the same **logical architecture** from A0 through A3.

A valid architecture includes:

1. **Clear microservice boundaries** (no god-service / no shared DB)
2. At least **two independently deployable services**
3. A **REST API boundary**
4. At least one **asynchronous event flow** by A2
5. A realistic **data store per service**

You are encouraged to use **two different language stacks** throughout the course so that we can compare design/implementation patterns across ecosystems.

### Accepted framework options (examples)

- **Java** — Spring Boot / Reactor / WebFlux
- **Node.js** — Express or NestJS
- **Python** — FastAPI
- **Go** — Gin / Fiber

(You may propose alternatives with justification.)

---

## Documentation discipline (very important)

To get full credit, you must:

- Document the **initial stack** (versions, tools, datasets)
- Explain **every architectural change** (what changed, why, and alternatives considered)
- Include **diagrams** (architecture + sequence flows)
- Capture **evidence** (logs, screenshots, metrics, traces)

Think of each assignment as a **small architecture report**, not just code delivery.

---

## Roadmap

- **[A0 – Environment & Baseline Service](./A0/README.md)**  
  Set up tools, choose your project, run two simple services in different languages.

- **[A1 – Components, APIs & Structured Services](./A1/README.md)**  
  Design service boundaries, create contracts, implement one service twice.

- **[A2 – Integration, Persistence & Resilience](./A2/README.md)**  
  Add a second service, async messaging, timeouts, retries, and resilience patterns.

- **[A3 – Reactive / Async Pipeline & Performance Analysis](./A3/README.md)**  
  Build blocking vs reactive pipelines and analyze performance + scalability.

- **[A4 – Capstone Integration & Production Readiness](./A4/README.md)**  
  Bring it all together: observability, deployment automation, final architecture review.
---

## Repository structure

Your GitHub repository must follow this structure:
github.com/<yourusername>/CS8395/
├── A0/
│ └── README.md
├── A1/
│ └── README.md
├── A2/
│ └── README.md
├── A3/
│ └── README.md
└── A4/
  └── README.md


Each assignment directory should contain:

- `README.md` (primary report)
- Diagrams
- Source code folders
- Scripts, manifests, or docker files

Assignments must live on the **main/master branch** unless we specifically say otherwise.

---

## Grading rubric (applies to each assignment)

| Category                     | Weight |
|-----------------------------|------:|
| Correctness & completeness  | 15%   |
| Architecture & resilience   | 25%   |
| Security considerations     | 10%   |
| Automation & reproducibility| 10%   |
| Documentation & diagrams    | 30%   |
| Demo / evidence quality     | 10%   |

> If we can’t reproduce what you claim works — you won’t get credit for it.

---

## Use of Generative AI

You are encouraged to use GenAI to:

- explain patterns,
- brainstorm approaches,
- generate boilerplate,
- analyze errors,
- summarize logs.

However:

1. You must **understand** everything you submit.
2. You must **cite how you used AI** inside your README.
3. Submit AI chat excerpts if asked.
4. If AI produces incorrect output, **you own the mistake.**

I routinely use GenAI when grading — just like you.  
**I will not share my prompts.**

---

## Assignment submission policy

- **Assignments are due Sunday at 11:59 PM (Nashville time) after each class.**
- **No late submissions are accepted.**
- All work must be in GitHub and accessible.

---

## Final guidance

- Start simple — evolve intentionally.
- Log everything.
- Prefer decoupling over clever shortcuts.
- Treat failures as a design signal.
- Architect like an engineer, not a hacker.

Your work in this course is less about code volume — and more about demonstrating **clear thinking and disciplined engineering**.

Good luck — and build something you’ll be proud to discuss in an interview.


