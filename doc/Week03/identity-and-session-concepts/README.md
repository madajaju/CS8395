# Identity and Session Concepts

Video: https://youtu.be/bwan-Txb8FU

**Purpose:** Introduce core concepts of identity, authentication, and sessions in web and distributed systems, and how they underpin the rest of the week’s topics.

**Outcomes**

By the end of this lecture, students should be able to:

- Explain the difference between identity, authentication, and authorization
- Describe what a session is and why it’s needed in web applications
- Distinguish between user identity and client/service identity
- Recognize common ways to represent and propagate identity across requests
- Identify key risks and tradeoffs in session design

---

## 1. Why Identity and Sessions Matter

- Modern systems are rarely single-user or single-process:
    - Many users, many devices, many services
- For almost any non-trivial operation, we need to know:
    - **Who** is making this request? (identity)
    - **Can they do this?** (authorization)
    - **How do we remember them across multiple requests?** (sessions)
- Everything else in this week (cookies, CSRF, API keys, OAuth2, tokens) builds on:
    - How we represent identity
    - How we maintain and trust session state

---

## 2. Identity, Authentication, Authorization

### 2.1 Identity

- **Identity**: a stable representation of a person, device, or service
    - User: “Alice with user ID 123”
    - Service: “payments-service in prod”
- Identities have attributes/claims:
    - Name, email, roles, groups, organization, etc.

### 2.2 Authentication

- **Authentication (AuthN)**: verifying that the entity is **who they claim to be**
    - Proving identity via:
        - Something you know (password, PIN)
        - Something you have (hardware token, device)
        - Something you are (biometrics)
- Output of authentication:
    - A statement like “This request is from Alice (user ID 123)”

### 2.3 Authorization

- **Authorization (AuthZ)**: deciding **what** an authenticated identity is allowed to do
    - Can Alice read this record? Update it? Delete it?
- Depends on:
    - Identity
    - Roles, groups, permissions
    - Context (time, device, risk level)
- Key point: **AuthN answers “who?”; AuthZ answers “can they?”**

---

## 3. What is a Session?

### 3.1 The Problem: Stateless Protocols

- HTTP is **stateless** by design:
    - Each request is independent
    - Server does not remember prior requests automatically
- Real apps need continuity:
    - “This is the same user as before”
    - “They already logged in”
    - “They have items in their cart”

### 3.2 Session Concept

- A **session** is an association between:
    - An identity (user or client)
    - A series of interactions over time
- Conceptually, a session records:
    - Who the user is (authenticated identity)
    - When they authenticated
    - Possibly extra state (preferences, temporary data)

### 3.3 Session vs Identity

- Identity:
    - “Who is this?” (e.g., user ID 123)
- Session:
    - “This ongoing interaction is tied to that identity”
    - May include time-bound context:
        - When they logged in
        - When the session should expire
        - Security level (e.g., MFA completed or not)

---

## 4. User Sessions in Web Applications

### 4.1 Typical Flow

- User provides credentials (e.g., username & password, SSO)
- Server validates credentials (authentication)
- If successful:
    - Server **creates a session** for that user
    - Issues some kind of **session identifier** or token
- On later requests:
    - Client presents this identifier
    - Server uses it to:
        - Look up session state, or
        - Verify identity from a self-contained token

### 4.2 Ways to Represent a Session

Common patterns:

1. **Opaque session ID + server-side store**
    - Cookie holds a random `session_id`
    - Server stores session data in memory/cache/DB
2. **Self-contained token (e.g., JWT)**
    - Contains user identity and claims
    - Signed so servers can verify authenticity
    - Server often stores minimal or no session state
3. **Hybrid**
    - Token plus some server-side state for more control (e.g., revocation lists)

### 4.3 Session Lifetime and Expiry

- Sessions are usually **time-bounded**:
    - Idle timeout (no activity for X minutes)
    - Absolute timeout (max lifetime of Y hours/days)
- Tradeoff:
    - Longer: better usability, higher risk if compromised
    - Shorter: more secure, but more logins and friction

---

## 5. User Identity vs Service Identity

### 5.1 User Identity

- Represents an individual person:
    - Login accounts, SSO identities
- Common in:
    - Web apps
    - Mobile apps with user accounts
- Often includes:
    - Profile information
    - Roles and groups

### 5.2 Service / Client Identity

- Represents a **piece of software** rather than a human:
    - Microservice calling another microservice
    - Backend batch job
    - External integration client
- AuthN often via:
    - API keys
    - Client certificates (mTLS)
    - Client credentials in OAuth2
- Key question:
    - “Which service is this?” not “Which user?”

### 5.3 Combining Them

- Many real systems propagate **both**:
    - Service identity (which service is calling)
    - User identity (on whose behalf)
- Useful for:
    - Fine-grained authorization
    - Auditing (“user X via service Y did Z”)
    - Zero-trust and least-privilege designs

---

## 6. Propagating Identity Across Requests

### 6.1 Browser-Based Apps

- Identity/session often carried via:
    - **Cookies** (session IDs or tokens)
    - Sometimes headers (for APIs)
- Browser automates:
    - Sending cookies to matching domains
- This enables:
    - Seamless navigation across pages
    - Also introduces risks (e.g., CSRF, session hijacking)

### 6.2 API and Microservice Calls

- Identity often carried via:
    - **Authorization headers** with tokens (e.g., `Bearer <token>`)
    - Client certificates (for mTLS)
    - Sometimes signed requests (HMAC)
- Key design question:
    - Do downstream services see **user identity**,
    - or just **service identity** (and trust the upstream service)?

### 6.3 Identity and Trust Boundaries

- Where do you **trust** the identity?
- Typical patterns:
    - **Edge/gateway** verifies external tokens and passes internal claims
    - Internal services trust certain gateways or identity providers
- Mistakes here can:
    - Allow identity spoofing
    - Bypass authorization checks

---

## 7. Risks and Tradeoffs in Session Design

### 7.1 Session Hijacking and Theft

- If an attacker gets a valid session identifier or token:
    - They can impersonate the user until:
        - Session expires, or
        - Session is revoked/invalidated
- Common causes:
    - XSS stealing cookies or tokens
    - Insecure storage (logs, local storage, etc.)
    - Unencrypted networks

Mitigations (high level):

- Use secure channels (HTTPS)
- Harden cookies (Secure, HttpOnly, SameSite)
- Keep tokens short-lived
- Regenerate session IDs on login and privilege changes

### 7.2 Single vs Multiple Sessions

- Single session per user:
    - Simpler to manage, easier to force logout
    - Less flexible for multi-device usage
- Multiple concurrent sessions:
    - Better user experience across devices
    - More complex session tracking (device, location, revocation)

### 7.3 Stateful vs Stateless Sessions

- **Stateful (server-side)**:
    - Server holds session data
    - Easy to revoke centrally
    - Requires shared store for horizontal scale
- **Stateless (token-based)**:
    - Less server storage
    - Easier to scale out
    - Revocation is harder (need short lifetimes or blacklist mechanisms)
- Choice depends on:
    - Scale
    - Operational capabilities
    - Security requirements

---

## 8. How This Connects to the Rest of the Week

- **Cookies & Sessions & CSRF**:
    - Build directly on session concepts in browser environments
    - Show how automatic cookie handling creates both convenience and risk
- **API Keys, Tokens, and Certificates**:
    - Provide concrete mechanisms to represent identity and secure communication
- **OAuth2 and OIDC**:
    - Standardize how identity and sessions are created and represented across systems
- **Error Strategies and Contracts**:
    - Identity and session context often needed in error responses and logs
    - For troubleshooting and security auditing

Understanding identity and session concepts makes it much easier to:

- Reason about where to enforce authentication and authorization
- Choose the right mechanism (API key vs token vs cookie vs certificate)
- Evaluate security risks around session handling and propagation

---

## 9. Summary

- **Identity** answers “who is this?”
- **Authentication** proves that identity; **authorization** decides what they can do.
- **Sessions** tie an identity to a series of interactions over time in otherwise stateless protocols.
- User identity and service identity are both important; many systems need to track both.
- Sessions can be:
    - Stateful (server-side) or stateless (token-based)
    - Short- or long-lived, single- or multi-session
- Design tradeoffs revolve around:
    - Security (hijacking, revocation, propagation)
    - Usability (how often users must re-authenticate)
    - Scalability and operability

For this course, students should be able to:

- Sketch how a user’s identity is established and carried through a simple web flow
- Explain how a back-end service might see and use that identity
- Identify where session-related risks arise and which countermeasures are appropriate