# API Design Basics: REST Best Practices and How They Lead to Good MCP APIs

## 1. Framing: Why API Design Matters



- APIs are your **product’s contract**:
    - Between services
    - Between teams
    - Between your system and external clients
- Good API design:
    - Makes systems **easier to change**
    - Reduces **bugs and coupling**
    - Enables a smoother path to **standard interfaces** like MCP

### Design Considerations

- APIs outlive implementations: frameworks, databases, and internal code change, but the contract tends to persist.
- Connect REST and MCP:
    - REST is about **clear, predictable contracts over HTTP**.
    - MCP applies the same ideas to **model–tool integration**: clear resources, clear operations, predictable behavior.
- Set the scene: you’ll walk through concrete REST practices and show how they map almost 1:1 onto good MCP tool design.

---

## 2. Core REST Concepts to Get Right



- Think in **resources**, not endpoints:
    - `/users`, `/orders`, `/orders/{id}`, `/orders/{id}/items`
- Use **HTTP methods** consistently:
    - `GET` = read
    - `POST` = create or perform an action
    - `PUT` / `PATCH` = update
    - `DELETE` = delete
- Favor **stateless** operations:
    - No hidden server session state that changes semantics between calls

### Design Considerations

- Resource-oriented design:
    - Avoid verb-heavy, RPC-style paths like `/doUserStuff`.
    - Prefer nouns with clear relationships: `users`, `orders`, `payments`.
- Statelessness:
    - Each request should include what the server needs (auth, IDs, parameters).
    - Makes scaling, caching, and retries easier.
- MCP connection:
    - MCP tools operate on conceptual resources as well.
    - Each tool call should be **self-contained**, not depend on an invisible session; that’s exactly the same discipline as stateless REST.

---

## 3. Resource Modeling & URLs



- Use **plural nouns** and stable URLs:
    - Good: `/users/123/orders/456`
    - Avoid: `/getUserOrders`, `/doOrder`, `/v1/doStuff`
- Represent **relationships** via nested paths or filters:
    - `/users/123/orders`
    - `/orders?userId=123`
- Version with **base path** or headers:
    - `/v1/orders`, `/v2/orders`
    - Or `Accept: application/vnd.example.v2+json`

### Design Considerations

- Consistency is more important than any one convention:
    - If clients can *guess* the URL and format, you’ve done something right.
- Nesting vs filters:
    - Use nesting for strong, hierarchical relationships (orders under a user).
    - Use filters when many relationships or cross-cutting concerns exist.
- MCP connection:
    - MCP tools should have **stable names** and **parameter schemas**.
    - Changing a REST endpoint’s shape is like changing a tool’s schema:
        - Prefer additive changes and explicit versioning where breaking changes are needed.

---

## 4. Request & Response Design (JSON & Errors)



- **Consistent JSON shapes**:
    - Objects for entities, arrays for collections.
    - Clear, descriptive field names:
        - `totalAmount`, not `ta`
- Use **standard HTTP status codes**:
    - `200` OK, `201` Created
    - `400` Bad Request, `401` Unauthorized, `403` Forbidden
    - `404` Not Found, `409` Conflict
    - `500` Internal Server Error
- Design a **standard error envelope**, for example:

  ```json
  {
    "error": {
      "code": "INVALID_INPUT",
      "message": "Email is invalid",
      "details": { "field": "email" }
    }
  }
  ```

### Design Considerations

- Once clients learn your “house style” for JSON, integration productivity increases.
- Don’t leak internal exceptions as raw text or stack traces.
- Encourage using structured error codes:
    - Easier to handle programmatically (e.g., “EMAIL_INVALID” vs “Validation failed”).
- MCP tie-in:
    - MCP tools publish **parameter schemas** and **result schemas**.
    - Clear JSON structures and error envelopes make it trivial to map your REST API into MCP:
        - Parameters → tool input schema.
        - Success/Failure shapes → tool output schema, including structured errors.

---

## 5. Idempotency & Safety



- **Safe methods**:
    - `GET` should **not** change server state.
- **Idempotent methods**:
    - `PUT` / `DELETE` should have the same effect if called once or multiple times.
    - Important for retries and failure handling.
- For non-idempotent operations, use **idempotency keys**:
    - `POST /payments` with `Idempotency-Key: <client-generated-id>`

### Design Considerations

- Explain the motivation:
    - In real systems, requests can be retried (network timeouts, client retries).
    - If operations aren’t idempotent, you can accidentally double-charge or duplicate side effects.
- With idempotency keys:
    - The server de-duplicates repeated calls with the same key and payload.
- MCP connection:
    - Models may re-plan or attempt actions more than once.
    - Designing MCP tools with **idempotent semantics** (or clear constraints and keys) makes automation safer:
        - “Set the configuration to X” is safer than “toggle the configuration”.

---

## 6. Pagination, Filtering, and Performance



- Avoid unbounded `GET /items`:
    - Use **pagination**: `?limit=50&offset=100` or cursor-based.
- Return **pagination metadata**, e.g.:

  ```json
  {
    "items": [ ... ],
    "nextCursor": "abc123"
  }
  ```

- Provide **filtering and sorting**:
    - `GET /orders?status=OPEN&sort=-createdAt`
- Define **sensible defaults and maximums**:
    - Default `limit`, maximum page size, etc.

### Design Considerations

- Huge responses:
    - Slow, memory-heavy, and brittle.
- Cursor-based pagination:
    - Often more robust than offset-based when data changes quickly.
- MCP tie-in:
    - Tool responses are fed back into a model with limited context (token) size.
    - Paginated, filterable results let the model **work iteratively**:
        - “Fetch first 20 orders”, “filter to OPEN”, “then fetch details on this specific one”.

---

## 7. Authentication, Authorization, and Security



- Use **standard auth mechanisms**:
    - `Authorization: Bearer <token>`
    - API keys in headers, not query strings.
- Avoid leaking sensitive info in errors:
    - `401` / `403` without exposing internal details.
- Apply **least privilege**:
    - Scoped tokens / keys with minimal required permissions.

### Design Considerations

- Avoid one-off, custom auth protocols when well-known patterns exist.
- Separate:
    - **Authentication**: who is calling.
    - **Authorization**: what this caller can do.
- MCP connection:
    - MCP tools often sit behind server-side logic that already has credentials.
    - Still important:
        - Tools should accept explicit configuration (which account, which environment).
        - Clear permission boundaries are essential if tools are exposed to different agents/tenants.

---

## 8. How REST Best Practices Lead to a Good MCP API



Map REST best practices → MCP design principles:

- **Clear resources & responsibilities**  
  → Each MCP tool does *one clear thing* for a specific capability.
- **Strong contracts (schemas, errors, status codes)**  
  → MCP tools have precise **input/output schemas** and structured error info.
- **Stateless, idempotent operations where possible**  
  → Tool calls are safe to retry and reason about.
- **Pagination & filtering**  
  → Tools fit within LLM context and latency limits.
- **Versioning & evolution strategy**  
  → Ability to introduce new tools or variants without breaking existing flows.

### Design Considerations

- Concrete mapping example:

    - REST:
        - `POST /orders` with `{ "userId": "...", "items": [...] }`  
          returns `{ "orderId": "...", "status": "PENDING" }` or a structured error.
    - MCP:
        - Tool `createOrder` with:
            - Input schema: `userId`, `items`.
            - Output schema: `orderId`, `status`, maybe `totalAmount`.
            - Error variations: `INVALID_INPUT`, `INSUFFICIENT_STOCK`, etc.

- If you already have:
    - Resource-oriented URLs,
    - Consistent JSON,
    - Clear error contracts,

  then building an MCP “tool layer” is mostly:
    - Exposing that same contract in MCP schemas.
    - Wiring the existing service calls behind it.

---

## 9. Risks & Tradeoffs



- **Over-engineered APIs**:
    - Designed for hypothetical use cases instead of real clients.
- **Inconsistent conventions**:
    - Different teams invent their own naming, status codes, and error formats.
- **No evolution plan**:
    - No versioning or deprecation strategy → unexpected breakage or permanent accumulation of legacy.

### Design Considerations

- Aim for **simple, consistent, and documented**, not “perfect”.
- Encourage teams to:
    - Share standards: naming, error envelope, pagination style.
    - Think about how they’ll evolve endpoints and tools over time.
- Closing summary:
    - Think in **resources and contracts**, not just URLs or methods.
    - Make APIs **predictable and self-explanatory**.
    - The same qualities you want in a good REST API are exactly what you want in a **good MCP API**:
        - clear capabilities,
        - strong contracts,
        - safe, composable operations.# API Design Basics

**Length:** 10–15 minutes**

**Purpose:** Introduces one focused concept that supports the weekly theme.

**Outcomes**
- Explain the concept at an architectural level
- Recognize when to apply it
- Identify risks and tradeoffs
