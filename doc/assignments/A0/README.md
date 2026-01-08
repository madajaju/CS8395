# A0 – Environment & Baseline Service (Polyglot Setup)

**Goal:**  
Get your development environment stable, choose your semester project, and successfully run an initial microservice using **two different languages/frameworks**. You will also load a small dataset and confirm the service behaves correctly.

---

## What You Must Do

0. **Choose Your Project Theme**
   - Pick **one** of the 5 class project domains:
     - Movie Recommender  
     - IoT Smart Home Sensors  
     - Online Store / Shopping Cart  
     - Social News Feed  
     - Food Delivery & Dispatch  
   - You will stick with this theme all semester.

1. **Select Two Implementation Stacks**
   - Pick **two languages/frameworks** you will compare throughout the course:
     - Java (Spring Boot / Reactor)
     - Node.js (Express/NestJS)
     - Python (FastAPI)
     - Go (Gin)
   - Record your selections and versions.

2. **Tooling & Environment Setup**
   - Install:
     - Docker
     - Git
     - IDE(s) of your choice  
     - HTTP client (curl/Postman/Insomnia)
   - Verify Docker runs images locally.

3. **Run a “Hello API” Service in Each Stack**
   - Expose a `/health` endpoint that returns JSON:  
     `{ "status": "ok", "service": "<language>" }`
   - Containerize both services.
   - Run them via Docker Compose or equivalent.

4. **Load Sample Data**
   - Use the provided **small dataset**, or generate starter data.
   - Add a simple `/items` (or equivalent) endpoint that returns sample records.

5. **Smoke Test**
   - Call both APIs
   - Verify JSON output
   - Inspect logs
   - Capture proof.

---

## Documentation & Deliverables

Create a **README.md** in your `A0/` folder containing:

- Stack and tool versions
- Screenshot of both services running
- Sample API responses
- Short reflection (1–2 paragraphs):
  - Why you chose your project domain  
  - Why you chose your two languages  
  - What worked vs what confused you

Include a **Docker Compose file** and working code in the repo.

---

## How You Will Be Graded

- **Environment Completeness** (20%) — Docker, Git, IDE working  
- **Two Working APIs** (30%) — health + items endpoints run in both stacks  
- **Dataset Load** (15%) — endpoints show real data  
- **Documentation Clarity** (25%) — clean, followable README  
- **Reflection Quality** (10%) — thoughtful insight, not filler

---

## Tips & Best Practices

- Keep logs readable — they’ll save you later.  
- Favor **simple containers** over local installs.  
- Avoid overengineering — the goal is foundation, not features.  
- Document everything while you work — don’t retro-write.
