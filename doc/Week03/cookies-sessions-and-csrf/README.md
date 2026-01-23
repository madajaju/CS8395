# Cookies, Sessions, and CSRF

**Length:** 10–15 minutes

**Purpose:** Introduce how web apps maintain user state using cookies and sessions, why that matters for security, and how CSRF exploits this model.

**Outcomes**

By the end of this lecture, students should be able to:

- Explain how HTTP cookies and server-side sessions work at an architectural level
- Recognize how authentication state is typically represented in web apps
- Explain what CSRF is and how it abuses browser behavior
- Identify common risks and tradeoffs in cookie/session configuration
- Describe and compare key CSRF mitigation strategies

---

## 1. Why Cookies and Sessions Exist

- HTTP is **stateless**:
    - Each request is independent; the server doesn’t “remember” the user
- Real applications need state:
    - “This request is from the same user as before”
    - “This user is logged in as X”
    - “This user’s shopping cart has items A, B, C”
- **Cookies** and **sessions** are the primary mechanisms to:
    - Persist state across requests
    - Convey *authentication state* (who the user is)
- CSRF attacks **exploit the fact** that browsers automatically send cookies

---

## 2. Cookies: The Basics

### 2.1 What is a Cookie?

- A small piece of data stored by the browser for a specific domain
- Sent automatically by the browser on matching requests
- Defined via HTTP headers:
    - Server → Browser: `Set-Cookie: ...`
    - Browser → Server: `Cookie: ...`

### 2.2 Typical Uses

- Session identifiers (most important for this lecture)
- Remember-me or preference flags (theme, language)
- Analytics / tracking (less our focus here)

### 2.3 Important Cookie Attributes (Architectural View)

Common attributes (simplified, conceptual):

- `Secure`:
    - Only send over HTTPS
    - Helps prevent leakage over plain HTTP
- `HttpOnly`:
    - Not accessible via JavaScript (`document.cookie`)
    - Reduces impact of XSS (can’t steal cookie via JS)
- `SameSite`:
    - Controls if/when cookies are sent on **cross-site** requests
    - Key to CSRF mitigation
- `Domain` / `Path`:
    - What host(s) and paths the cookie is sent to
- `Expires` / `Max-Age`:
    - How long the browser should keep the cookie

---

## 3. Sessions: Building on Cookies

### 3.1 What is a Session (in this context)?

- A **server-side data structure** representing user state:
    - User identity / auth state
    - Roles/permissions (sometimes)
    - Per-user temporary data (carts, wizards, etc.)
- Identified by a **session ID** (random, unguessable value)

### 3.2 Typical Pattern

- Server creates a new session record:
    - Key: `session_id`
    - Value: data about user and state
- Server sends a cookie like:
    - `Set-Cookie: session_id=<random>; HttpOnly; Secure; ...`
- On each request:
    - Browser sends `Cookie: session_id=<same-random>`
    - Server looks up the session from its store
    - App logic uses the session data to decide:
        - Is the user logged in?
        - Who is the user?
        - What are they allowed to do?

### 3.3 Session Storage Options (Architectural Tradeoffs)

- In-memory (per node):
    - Simple but doesn’t scale well horizontally
- Shared stores (cache/DB/session server):
    - Centralized, supports many app instances
- Stateless (e.g., JWT-based sessions):
    - Less server storage; more responsibility on token design & validation

---

## 4. Security Risks Around Cookies and Sessions

### 4.1 Session Hijacking

- Attacker obtains a valid `session_id`:
    - Through XSS stealing cookies
    - Via traffic interception (if not using HTTPS)
    - Through application bugs or logs
- Once attacker has it:
    - They can impersonate that user until session expires or is revoked

Mitigations (high level):

- Use **HTTPS everywhere** for authenticated traffic
- Mark cookies as `Secure` and `HttpOnly`
- Use strong, random session IDs
- Regenerate session IDs on login and privilege changes

### 4.2 Session Fixation

- Attacker forces a victim to use a **known session ID**:
    - Victim logs in, server attaches identity to that session
    - Attacker reuses the same session ID to act as the victim
- Mitigation:
    - Regenerate the session ID after login
    - Don’t accept externally supplied session IDs

---

## 5. CSRF: Cross-Site Request Forgery

### 5.1 Core Idea

- Browser **automatically includes cookies** for a domain on requests to that domain
- Attacker tricks the user’s browser into making a request to the target site:
    - While the user is logged in there
- The server:
    - Sees a valid session cookie
    - Treats the request as if it came from the user
- Result:
    - Unwanted state-changing action performed *on behalf of the user*

### 5.2 Example Scenario

- User is logged into `bank.example` in one tab
- Attacker gets user to visit `evil.example` in another tab
- `evil.example` embeds a hidden form or image that submits a POST to `https://bank.example/transfer` with attacker-chosen parameters
- Browser sends the request **with bank cookies** (including session)
- If bank doesn’t have CSRF defenses:
    - It may execute the transfer as the logged-in user

### 5.3 Key Conditions for CSRF

- The victim is *authenticated* to the target site via cookies/session
- The target endpoint:
    - Performs a **state-changing action**
    - Accepts the request without additional verification
- The browser:
    - Will send cookies automatically on the cross-site request

---

## 6. CSRF Mitigations

### 6.1 CSRF Tokens (Synchronizer Tokens / Double Submit)

- Server generates a **random, secret token** tied to:
    - The user
    - Or the user’s session
- Token is:
    - Embedded in forms or included in headers by JS
    - Sent back with state-changing requests (POST/PUT/DELETE)
- Server verifies:
    - Does the token match what we issued?
- Attacker’s site:
    - Can cause a request to the target site
    - But cannot read or generate the user’s CSRF token

Design choices (high level):

- One token per session vs per-request
- Where to store token (server-side or encoded)
- How to handle APIs (often via custom header with token)

### 6.2 SameSite Cookies

- `SameSite` attribute controls sending cookies on **cross-site** requests:
    - `SameSite=Lax`:
        - Send cookies on:
            - Top-level navigations (e.g., clicking a link)
            - Same-site requests
        - Block cookies on most cross-site POSTs, iframes, images
    - `SameSite=Strict`:
        - Only send cookies on same-site requests
        - More secure, can affect UX (e.g., some login flows)
    - `SameSite=None; Secure`:
        - Required for cross-site scenarios (e.g., some SSO patterns)
        - Must also set `Secure`

- SameSite can **significantly reduce CSRF**, especially with:
    - `Lax` or `Strict` on sensitive cookies

### 6.3 Additional Defenses

- Require **re-authentication** or **step-up auth** for critical actions
- Use **custom headers** (e.g., set via JavaScript) plus CSRF tokens for APIs
- Design sensitive operations to be **idempotent or multi-step** where possible
- Monitor for unusual patterns (e.g., repeated critical actions from same IP with different users)

---

## 7. Design Tradeoffs and Patterns

### 7.1 Cookies vs Other Auth Storage (High-Level)

- Cookies:
    - Automatically attached to requests by the browser
    - Great for classic web apps
    - Also what CSRF exploits
- Local storage / session storage:
    - Often used for tokens in SPAs
    - Not automatically sent by browser → changes CSRF/XSS trade space
- Many real systems:
    - Use cookies to store or transport **tokens**
    - Need to reason carefully about both CSRF and XSS risks

### 7.2 Putting It Together

- Typical secure web app pattern:
    - Authenticated session identified by a **session cookie**
    - Cookie is:
        - `Secure`
        - `HttpOnly`
        - `SameSite=Lax` or `Strict` where possible
    - CSRF protection with **tokens** on state-changing requests
    - Critical operations may require additional confirmation

---

## 8. Summary

- Cookies let the browser **remember** and automatically send data per domain
- Sessions use cookies (often a session ID) to track **who the user is** and their state
- CSRF exploits:
    - Automatic cookie sending
    - The server’s trust in the session
- Defenses involve:
    - Hardening cookies (`Secure`, `HttpOnly`, `SameSite`)
    - Validating **intent** with CSRF tokens and headers
    - Careful design of critical actions and authentication flows

For this course, students should be able to:

- Sketch how a typical web app maintains and uses session state
- Explain how a CSRF attack works, step by step
- Recommend appropriate cookie and CSRF configurations for common scenarios