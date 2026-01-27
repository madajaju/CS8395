# Error Strategies and Contracts

Video: https://youtu.be/6tftXjPXDic

**Purpose:** Introduce how services should represent and communicate errors, why explicit error contracts matter in distributed systems, and the tradeoffs of different error-handling strategies.

**Outcomes**

By the end of this lecture, students should be able to:

- Explain what an error contract is at an architectural level
- Recognize common error-handling patterns for APIs and services
- Distinguish between client, server, and transient failures
- Identify risks and tradeoffs in different error strategies (retries, fallbacks, etc.)
- Sketch consistent error contracts for a simple service

---

## 1. Why Errors Need a Strategy

In distributed systems, **failure is normal**, not exceptional:

- Networks partition, time out, and drop requests
- Downstream services can be slow, overloaded, or misconfigured
- Clients can send bad data or violate assumptions

Without a clear **error strategy and contract**:

- Different services return inconsistent error formats and semantics
- Clients make wrong assumptions (e.g., “retry this” vs. “fix your request”)
- Debugging and operations become painful

An **error contract** is an agreed way to:

- Classify errors (what went wrong?)
- Represent them (structure and fields)
- Communicate client expectations (what should the caller do?)

---

## 2. Types of Errors in Distributed Systems

Conceptually, we can group errors into three broad categories:

1. **Client errors (caller’s fault)**
    - Bad input, missing data, invalid state transitions
    - Example: trying to withdraw more than the balance

2. **Server errors (our fault)**
    - Unhandled exceptions, bugs, misconfigurations
    - Example: null pointer, DB schema mismatch, miswired dependency

3. **Transient / environmental errors (nobody’s “fault”)**
    - Network timeouts, temporary overload, downstream outage
    - Example: dependency returns 503, DNS glitch

Why this matters:

- **Client errors** → caller should *fix the request* (don’t blindly retry)
- **Server errors** → team should *fix the service* (monitor, alert)
- **Transient errors** → caller may *retry with backoff* or *fallback*

---

## 3. HTTP Status Codes as Part of the Contract

For HTTP/REST-style APIs, error contracts typically combine:

- **HTTP status code** (high-level category)
- **Standardized error body** (details, discussed later)

### 3.1 Common HTTP Status Codes and Meanings

| Status | Name                       | Category        | Typical Meaning / When to Use                                              |
|--------|----------------------------|-----------------|----------------------------------------------------------------------------|
| 200    | OK                         | Success         | Request succeeded; response body has the result.                           |
| 201    | Created                    | Success         | New resource created; often includes `Location` header.                    |
| 204    | No Content                 | Success         | Request succeeded; no response body (e.g., successful DELETE).             |
| 400    | Bad Request                | Client error    | Malformed request (syntax/format); fails basic validation.                 |
| 401    | Unauthorized               | Client error    | Missing/invalid authentication; caller is not logged in / not identified. |
| 403    | Forbidden                  | Client error    | Caller is authenticated but not allowed to perform this action.           |
| 404    | Not Found                  | Client error    | Resource does not exist or is not visible to this caller.                 |
| 409    | Conflict                   | Client error    | Request conflicts with current state (e.g., version conflict).            |
| 422    | Unprocessable Entity       | Client error    | Semantically invalid request; domain/field-level validation failures.      |
| 429    | Too Many Requests          | Client error    | Rate limit exceeded; caller should slow down or back off.                 |
| 500    | Internal Server Error      | Server error    | Unexpected server failure; generic “we broke” response.                   |
| 502    | Bad Gateway                | Server error    | Upstream/downstream service returned an invalid or bad response.          |
| 503    | Service Unavailable        | Server error    | Service temporarily overloaded or down; often retryable with backoff.     |
| 504    | Gateway Timeout            | Server error    | Upstream/downstream service did not respond in time.                      |

Notes:

- **4xx codes** usually mean “do not retry until you **change the request**.”
- **5xx codes** often mean “retry **might** succeed later,” but:
    - Clients should still use **limits and backoff**.
    - Teams should treat persistent 5xx as incidents.

---

## 4. Error Bodies for HTTP/REST APIs (Conceptual)

Beyond status codes, a good error contract defines the **shape** of the error body.

Architecturally useful fields in an error body:

- **Machine-readable code** – stable identifier (e.g., `USER_NOT_FOUND`)
- **Human-readable message** – for logs / debugging (not for parsing)
- **Details / fields** – which input fields were invalid, constraints, etc.
- **Correlation / trace ID** – a request ID for cross-service tracing
- **Category / retry hint** – optional indicator like `retryable: true`

Example structure (language-agnostic shape):

- `status`: numeric or textual status category
- `code`: stable error code
- `message`: brief description
- `details`: structured extra info (fields, constraints, etc.)
- `correlationId`: request-level identifier

The **key idea**: every service uses a **consistent shape** and maps internal errors into that shape.

---

## 5. Strategies for Handling Errors Between Services

When a service calls another service, it needs an explicit strategy:

### 5.1 Validate Early

- Validate inputs **at the boundary**:
    - Required fields, formats, ranges, invariants
- Return meaningful **client errors** when validation fails
- Benefits:
    - Faster feedback
    - Less load on downstream services
    - Clearer behavior for clients

### 5.2 Map Internal Errors to Contract

- Internal layers and libraries might throw a variety of exceptions
- The boundary layer:
    - Catches internal exceptions
    - Maps them to the error contract and appropriate HTTP code:
        - Client error? → 4xx + contract body
        - Server error? → 5xx + contract body
- Avoid leaking:
    - Stack traces
    - Internal class names
    - Sensitive data (secrets, identifiers)

### 5.3 Retry, Fallback, and Circuit Breaking

For *transient* or *downstream* errors (often 502/503/504):

- **Retries with backoff**:
    - For timeouts, 503s, some network failures
    - Use exponential backoff and jitter
- **Fallbacks**:
    - Cached data
    - Degraded mode (e.g., less accurate results)
- **Circuit breakers**:
    - Stop hammering a failing downstream
    - Fast-fail after repeated errors, then periodically test recovery

Only retry when the operation is **idempotent** or explicitly safe to retry.

---

## 6. Designing Good Error Contracts

### 6.1 Properties of a Good Error Contract

- **Consistent** across endpoints and services
- **Stable codes** that don’t change every refactor
- **Actionable**:
    - Client can tell whether to retry, fix input, or show a specific message
- **Observable**:
    - Includes correlation/request IDs
    - Integrates with logging/tracing/metrics
- **Minimal but sufficient**:
    - Enough detail for clients and operators
    - No accidental leakage of internal details

### 6.2 Example Categories for Error Codes

You might group error codes into high-level categories like:

- `VALIDATION_*` – input validation failures
- `AUTH_*` – authentication/authorization issues
- `BUSINESS_*` – domain/business rule violations
- `DEPENDENCY_*` – downstream service or DB issues
- `INTERNAL_*` – unexpected internal errors

---

## 7. Risks and Tradeoffs

### 7.1 Over-Reliance on Retries

- Pros:
    - Can smooth over temporary blips
- Risks:
    - Thundering herds during partial outages
    - Repeated non-idempotent actions
    - Masking underlying reliability issues

Mitigation:

- Limit retries, use backoff and jitter
- Only retry operations that are safe to repeat
- Instrument and monitor retry behavior

### 7.2 Leaky Abstractions

- Exposing low-level errors directly:
    - DB error codes
    - Stack traces
    - Implementation details
- Problems:
    - Tight coupling between client and server internals
    - Security exposure (info useful to attackers)
    - Harder to evolve the service

Mitigation:

- Translate internal failures into contract-level errors
- Log internal details on the server side, not in client-facing responses

### 7.3 Inconsistent Error Formats

- Different endpoints or microservices:
    - Use different shapes / field names
    - Overload HTTP codes in different ways
- Consequences:
    - Client code becomes littered with special cases
    - Shared tooling (SDKs, error handlers) becomes harder

Mitigation:

- Define and document a **service-wide error contract**
- Use shared libraries or middleware to enforce common patterns

---

## 8. Putting It Together: Simple Reference Pattern

A practical, high-level pattern for an API:

1. **At the boundary:**
    - Validate all requests
    - Map domain rules into explicit business errors
2. **Classify error:**
    - Client vs server vs transient/dependency
3. **Choose strategy and HTTP status:**
    - Client error → appropriate 4xx + structured error body
    - Server error → log internal details, 5xx + generic error body
    - Transient error → possibly retry/fallback; if not resolved, 5xx with retry hint
4. **Emit observability data:**
    - Correlation ID in response
    - Structured logs with error code and cause
    - Metrics for error rates by type and status code

In codebases, this often means:

- A **central error/exception model**
- Reusable components for:
    - Mapping errors to HTTP/gRPC/etc.
    - Logging and metrics on error paths

---

## 9. Summary

- In distributed systems, **errors are a first-class concern** that need explicit design.
- An **error contract** defines how errors are:
    - Classified
    - Represented
    - Communicated across service boundaries
- Good error strategies distinguish:
    - Client errors (fix the request)
    - Server errors (fix the service)
    - Transient/dependency errors (retry/fallback)
- HTTP status codes provide the **coarse category**; error bodies provide the **details**.
- Consistent, actionable error contracts:
    - Improve client behavior
    - Simplify debugging and operations
    - Reduce coupling and security risks

For this course, students should be able to:

- Sketch an error contract for a simple API
- Explain how a client should react to different error categories and status codes
- Identify potential issues in naive error handling (e.g., infinite retries, leaking stack traces)