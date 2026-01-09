# Scalable Systems & Microservice Architecture

Welcome to the course repository. This repo is your home base for the **syllabus**, **assignments**, and **project options** you’ll use throughout the term.

You will choose **one domain project** and evolve it across multiple assignments, focusing on designing a **scalable, resilient microservice architecture**—not just something that works, but something that works **under load** and under **real failure modes**.

---

## 📚 Syllabus

All course logistics, policies, and the weekly outline live in the syllabus:

- [Course Syllabus](doc/Syllabus.md)  
  *(Schedule, grading, expectations, and references.)*

> If your local copy is missing the syllabus file or folder, make sure you’ve pulled the latest changes from the main repository.

---

## 📦 Assignments

Assignments guide you through progressively more advanced design and implementation work on your chosen project domain.

- [Assignments Overview](doc/assignments/README.md)
- Individual assignments (examples):
    - [A0 — Domain & Requirements](doc/assignments/A0/README.md)
    - [A1 — Service Boundaries & Data Model](doc/assignments/A1/README.md)
    - [A2 — Communication Patterns & Resilience](doc/assignments/A2/README.md)
    - [A3 — Scaling, Caching & Observability](doc/assignments/A3/README.md)
    - [A4 — Hardening, Tradeoffs & Final Report](doc/assignments/A4/README.md)

> Start by reading the **Assignments Overview**, then follow the instructions for the current assignment.

---

## 🏗️ Project Options

You will choose **one** project domain and use it across all assignments.

- [Project Options Overview](doc/projects/README.md)

Example project directories (your repo may name or organize these slightly differently):

- [Project 1 — Movie / Media Recommender](doc/projects/project1/)
- [Project 2 — IoT Smart Home Sensor Platform](doc/projects/project2/)
- [Project 3 — Online Store / Shopping Cart](doc/projects/project3/)
- [Project 4 — Social News Feed / Content Aggregator](doc/projects/project4/)
- [Project 5 — Food Delivery & Restaurant Ordering](doc/projects/project5/)

Each project typically includes:

- synthetic datasets (small / medium / large),
- documented schemas,
- a data model diagram (e.g., PlantUML),
- guidance on architectural considerations.

Pick the one that:

1. You find most engaging, and
2. Gives you a good playground for **scalability and resilience**.

Once you’ve picked a project, **stick with it** for A0 → A4.

---

## 🧩 Architectural Expectations

Across assignments and regardless of the project you choose, you’re expected to:

- define clear **service boundaries**,
- justify **synchronous vs asynchronous** communication,
- design for **failure** (timeouts, retries, circuit breakers, backpressure),
- separate **domain logic** from **delivery/transport logic**,
- explain **tradeoffs** in your design.

Common high-level patterns include:

- MVC
- DOV (Domain–Object–View)
- Hexagonal / Ports & Adapters
- CQRS (where appropriate, with justification)

The goal is not to produce the *most complex* system possible, but a system that **scales** and **fails gracefully**.

---

## 🛠 Getting Started

1. **Read the syllabus:**  
   [Syllabus](doc/syllabus/README.md)

2. **Browse project options & pick one:**  
   [Project Options](doc/projects/README.md)

3. **Start with the first assignment:**  
   [Assignments Overview](doc/assignments/README.md) → A0

4. **Set up your environment:**
    - Choose your language and frameworks.
    - Decide on an architectural style (MVC / DOV / Hexagonal / CQRS, etc.).
    - Sketch high-level service and data boundaries *before* coding.

---

## ❓ Questions

If anything about scope, project choice, or expectations is unclear:

- Check the **Syllabus** for policies and high-level guidance.
- Check the **Assignments** for deliverable-specific instructions.
- Bring questions to class, office hours, or your course discussion forum.

Happy architecting! 🚀