# Conway’s Law & Team Boundaries

**Goal of this lecture**

- Understand Conway’s Law at an architectural level
- Recognize when and how it shows up in real systems
- Learn how to intentionally shape team boundaries to shape architecture
- Be aware of risks, trade‑offs, and failure modes

---

# What Is Conway’s Law?

> “Organizations which design systems ... are constrained to produce designs which are copies of the communication structures of these organizations.”
>
> — Melvin Conway, 1968

**Plain language interpretation**

- The way people communicate in an organization  
  → strongly influences  
  → the structure of the systems they build.
- System architecture **mirrors** organization structure (teams, reporting lines, communication paths).

**Core idea**

- Architecture is not only a technical design.
- It is also a **social artifact** of how people are grouped and how they talk to each other.

---

# Why Conway’s Law Matters for Architecture

**Architectural implications**

- Module boundaries tend to align with:
    - Team boundaries
    - Department lines
    - Budget ownership
    - Physical locations / time zones
- Where a system changes frequently:
    - Look at which people must coordinate those changes.
- Poor alignment between team structure and system structure:
    - Increases coordination cost
    - Increases lead time for changes
    - Makes ownership unclear

**Key takeaway**

- You may *think* you’re designing the system.
- In practice, you’re often **discovering** the system that your org structure allows you to build.

---

# Historical Context & Evidence (Short)

**Melvin Conway (1968)**

- Observed that large software projects reflect the communication graph of the organization.
- Paper focused on communication constraints and their impact on design.

**Empirical support**

- **“Mirroring hypothesis”** (MacCormack, Baldwin, Rusnak, others):
    - Systems developed by loosely coupled organizations are more modular.
    - Systems developed by tightly coupled organizations are more tangled.
- Industry anecdotes:
    - 3 separate teams → 3 separate services or components, even if one would suffice.
    - A matrix org with shared “platform” team → deep shared dependency layer.

---

# Common Manifestations of Conway’s Law

**1. Services per team**

- Microservice boundaries match team boundaries:
    - Team A → Service A
    - Team B → Service B
    - Very few cross‑team modules.
- Good when:
    - Each team owns a cohesive business capability.
- Risk:
    - “Team-shaped monoliths” of capability (too many tiny services or mismatched responsibilities).

**2. Vertical slices by function**

- Frontend, backend, database owned by different teams:
    - “UI Team”, “API Team”, “DB Team”
- Architecture tends to become:
    - Layered (presentation vs domain vs data)
    - Cross-cutting changes require multiple teams → slow delivery.

**3. Organizational silos**

- Systems reflect department silos:
    - Sales system, marketing system, finance system, operations system
- Integrations between systems often mirror:
    - Negotiation between departments
    - Contractual or political boundaries inside the org

---

# Good vs Bad Alignment

**Good alignment (“congruence”)**

- Team boundaries ≈ **business capabilities**
    - e.g., “Payments”, “Catalog”, “Customer Onboarding”
- System components reflect these same capabilities.
- Each team can:
    - Change “their” part of the system with minimal coordination.
    - Own quality, uptime, roadmap for their domain.

**Bad alignment**

- Team boundaries ≈ **technical layers or shared concerns** only:
    - “API team”, “Database team”, “UI team”, “Infrastructure team”.
- Each feature requires many teams:
    - Coordination overhead
    - Blame diffusion
    - Slower feedback loops
- System ends up with:
    - Hard layer boundaries
    - Weak domain boundaries
    - High coupling across “feature lines”.

---

# Inverse Conway Maneuver

**Definition**

- **Inverse Conway Maneuver**:  
  Intentionally designing or restructuring team boundaries so that the desired system architecture **emerges** more naturally.

**Steps (conceptual)**

1. **Envision target architecture**
    - E.g., domain‑oriented services, modular monolith, event-driven boundaries.
2. **Identify ideal ownership**
    - Which teams should own which bounded contexts or capabilities?
3. **Restructure teams**
    - Adjust team composition, reporting lines, and responsibilities.
4. **Allow architecture to converge**
    - Structure of code, services, and APIs will gradually mirror the new communication paths.

**Important note**

- You can’t “design around” Conway’s Law.
- You can either ignore it (and get accidental architecture)  
  or **use it deliberately** (inverse Conway).

---

# Team Topologies & Conways Law (Conceptual Link)

*(You don’t need to know the whole Team Topologies framework; just these ideas.)*

**Useful team patterns**

- **Stream‑aligned team**
    - Long‑lived team aligned to a **flow of work** (e.g., a product area).
    - Owns end‑to‑end delivery for their stream.
- **Platform team**
    - Provides reusable services/tooling for other teams.
- **Enabling team**
    - Temporarily helps stream‑aligned teams adopt new practices/tech.

**Connection to Conway’s Law**

- Stream‑aligned teams → encourage **end‑to‑end slices** in architecture.
- Platform teams → encourage **clear “platform” boundaries** and APIs.
- Poorly set platform teams → create central bottlenecks and monolith‑like shared dependencies.

---

# Aligning Teams with Bounded Contexts

**Domain‑Driven Design (DDD) tie‑in**

- DDD introduces **bounded contexts**:
    - Self‑contained models of a particular domain sub‑area.
- Clear bounded context:
    - Clear language
    - Clear models
    - Clear integration contracts

**Conway’s Law view**

- Ideally: **One team ↔ one (or a small number of) bounded context(s)**.
- Team owns:
    - Code inside the context
    - Model and language
    - APIs or events used to integrate with others

**Benefits**

- High cohesion: what changes together is owned together.
- Reduced cognitive load: each team has a clear mental model.
- Cleaner integration: context boundaries are explicit in both code and communication.

---

# Symptoms of Misaligned Team & System Boundaries

Look for these warning signs:

**1. High coordination overhead**

- A small feature or change needs:
    - 3–5 teams to sign off / implement.
- Frequent cross‑team meetings just to ship minor changes.

**2. Long lead times & handoffs**

- Work bounces:
    - Product → Frontend team → Backend team → Database team → Ops team → QA team
- Each boundary is both:
    - An organizational boundary
    - An architectural boundary in code.

**3. Conflicting roadmaps**

- Two teams “own” overlapping parts of the same module or microservice.
- No one can change it safely or quickly.
- Features are delayed because teams are misaligned on priorities.

**4. Architectural drift**

- Intended architecture diagrams vs actual code structure:
    - Diagrams show logical domains.
    - Code and repos reflect old org charts or ad‑hoc ownership.
- Modules with mixed responsibilities because:
    - “That’s where the team that maintained it sat in the org chart.”

---

# Designing Team Boundaries Intentionally

**Principles**

1. **Follow value streams**
    - Map how value flows from idea → production → customer.
    - Place long‑lived teams around **stable value streams**.

2. **Optimize for change**
    - Organize teams so most changes:
        - Can be done by 1 team
        - Require minimal external coordination.

3. **Limit cognitive load**
    - Each team should understand:
        - Their domain model
        - Their dependencies
        - Their runtime responsibilities
    - Avoid teams owning too many unrelated systems.

4. **Prefer stable interfaces**
    - Boundaries between teams should be **explicitly modeled**:
        - APIs, events, contracts, SLAs
    - This reduces the need for constant informal coordination.

---

# Practical Heuristics for Team–System Alignment

**Heuristic 1: One primary “change owner” per module**

- For any significant module/service:
    - Ask: “Who is primarily responsible for changing this?”
- If the answer is “it depends” or “three teams,”  
  → boundary likely doesn’t align well with team structure.

**Heuristic 2: Minimize cross‑team “hop count”**

- For a typical feature, count:
    - Number of teams involved from idea → deployed.
- Goal: most features involve **1 team**, occasionally 2.

**Heuristic 3: Align with stable domain concepts**

- Team boundaries should:
    - Move slowly
    - Follow relatively stable parts of the domain (e.g., Payments, Catalog).
- Avoid basing them on transient projects only.

**Heuristic 4: Watch the pain**

- Where are:
    - Most production incidents?
    - Most integration bugs?
    - Most ownership disputes?
- These are often **boundary problems**, not just code problems.

---

# Trade‑offs and Risks

**1. Over-fragmentation (too many micro‑teams / microservices)**

- If every small capability has its own team and service:
    - Coordination across capabilities still high.
    - Operational overhead explodes (deployments, observability, on‑call).

**2. “Platform as blocker” anti‑pattern**

- Central platform team controls shared infrastructure:
    - Every change must go through them.
- Architecture reflects a large, shared platform surface:
    - Increases coupling
    - Slows experimentation

**3. Hard boundaries where you need flexibility**

- Team boundaries too rigid:
    - People can’t move to where the work is.
    - Architecture becomes stuck with yesterday’s org decisions.

**4. Unstable structures**

- Constant reorgs:
    - Architectural boundaries churn.
    - Ownership changes faster than systems can adapt.

---

# Organizational Constraints & Conway’s Law

Conway’s Law doesn’t say **“you must organize this way”**; it says:

- **Given your communication structure**,  
  your architecture will tend to mirror it.

Implications:

- Budget structures, reporting lines, and incentive systems:
    - Influence how teams communicate.
    - Therefore influence architecture.
- External constraints (vendors, regulators, partners):
    - Also shape boundaries:
    - E.g., “This system must be run by a certified team” → a stable boundary.

**Reality check**

- Sometimes ideal architecture is not possible because:
    - Teams can’t be reorganized for political/HR reasons.
    - Certain boundaries are fixed (e.g., outsourced modules).
- In those cases:
    - Make constraints explicit.
    - Design architecture **within** those constraints, not against them.

---

# How to Use Conway’s Law in Practice

**When planning architecture:**

- Ask:
    - “Which teams will own these components?”
    - “How do they currently communicate?”
    - “What’s the realistic coordination cost?”

**When planning org changes:**

- Ask:
    - “If we split/merge these teams, what will it do to system boundaries?”
    - “What architecture will naturally emerge from this structure?”

**When diagnosing issues:**

- If you see:
    - Slow delivery
    - Lots of cross-team blame
    - Constant integration friction  
      → suspect **misaligned team and system boundaries**.

**Design meta‑rule**

- You’re always designing both:
    - The system
    - The sociotechnical structure that will build and run it

You cannot fully separate the two.

---

# Short Case Sketches (Conceptual Examples)

*(High-level, not implementation-specific, so you can reuse them in slides or discussion.)*

**Case 1: Feature squads with shared backend**

- Multiple cross‑functional “feature squads” work on a single shared backend.
- Conways effect:
    - Backend turns into a shared “ball of mud” everyone touches.
    - Frontends reflect squads, backend reflects “everyone and no one.”
- Outcome:
    - Frequent merge conflicts, unclear domain ownership.

**Case 2: Capability-aligned teams**

- Teams aligned to capabilities: “Search”, “Checkout”, “Account”.
- Architecture:
    - Services and modules clearly reflect these capabilities.
- Outcome:
    - Each team can evolve their part with minimal coordination.
    - Cross‑capability features still require coordination, but less frequently.

**Case 3: “Database team” bottleneck**

- A centralized team manages database schemas for all products.
- Architecture:
    - Many applications share a single large schema.
    - Changes require the DB team’s approval.
- Outcome:
    - Delivery slows.
    - Logical domains bleed into one another in the schema.

---

# Practical Questions to Ask Your Team

Use these to spark discussion or as retrospective prompts:

1. **Ownership**
    - “Which parts of the system do we truly own, end‑to‑end?”
    - “Where is ownership shared or unclear?”

2. **Change paths**
    - “Think of a recent feature. How many teams were involved?”
    - “Where did we experience friction or delays?”

3. **Boundary quality**
    - “Do our system boundaries match how we talk and work?”
    - “Where are we forced to cross multiple team boundaries frequently?”

4. **Target state**
    - “If we could redesign our teams from scratch, based on our ideal architecture, how would we group people?”
    - “What small steps could move us closer to that alignment?”

5. **Constraints**
    - “Which boundaries are fixed (e.g., regulatory, vendor)? Are we designing around them consciously?”

---

# Summary: Key Takeaways

1. **Conway’s Law**:
    - System architecture mirrors communication structures.
2. **Team boundaries shape architecture**:
    - Services, modules, and data boundaries tend to follow team lines.
3. **Inverse Conway Maneuver**:
    - You can intentionally reshape teams to encourage a desired architecture.
4. **Align teams with value and domain**:
    - Prefer boundaries around business capabilities and bounded contexts.
5. **Watch for misalignment symptoms**:
    - High coordination cost, unclear ownership, frequent integration failures.
6. **Design sociotechnical systems**:
    - Architecture and org structure are deeply linked.
    - Treat them as a single design problem, not separate topics.

---

# Optional: Speaker Notes (Condensed)

*(For your own reference while presenting.)*

- Emphasize that Conway’s Law is **descriptive**, not prescriptive.
- Use a simple mental model:
    - “Show me your org chart and communication paths, and I’ll predict your architecture.”
- Encourage people to look at their own context:
    - Where do they feel the most cross‑team pain?
    - That’s often where Conway’s Law is biting hardest.
- Close by reinforcing agency:
    - We can’t break Conway’s Law, but we can **use** it:
        - Align teams with desired architecture.
        - Or adapt architecture to current organizational reality.