# API Keys, Tokens, and Certificates

**Purpose:** Introduce common mechanisms for authenticating and securing communication between services, and how they fit into cloud/distributed architectures.

**Outcomes**

- Explain what API keys, tokens, and certificates are at an architectural level
- Recognize when each mechanism is appropriate
- Identify key risks, tradeoffs, and basic hardening strategies for each

---

## 1. Where These Fit in the Big Picture

- We need to answer (at least) three questions in distributed systems:
    - **Who are you?** (identity)
    - **Are you allowed to do this?** (authorization)
    - **Can I trust this connection?** (confidentiality & integrity)
- API keys, tokens, and certificates are **building blocks** used in different layers:
    - **API keys** – simple caller identification and coarse-grained access
    - **Tokens** – richer, time-scoped claims about a user or client
    - **Certificates** – prove the identity of machines/services and secure the channel

---

## 2. API Keys

### 2.1 What is an API Key?

- A **secret string** issued by a service to a client
- Typically passed with each request (header, query param, etc.)
- Conceptually: “this request comes from client X”

### 2.2 Typical Uses

- Service-to-service calls in simpler systems
- Access to **public or paid APIs** (e.g., maps, payments, analytics)
- Scripts, CLIs, automation where user identity is not needed

### 2.3 Strengths

- **Very simple** to issue and verify (lookup in DB or config)
- Easy to understand and integrate
- Works even without a full identity system

### 2.4 Limitations & Risks

- Often behave like a **password for the entire API**:
    - Long-lived, broad access → attractive attack target
    - If leaked, attacker can reuse it indefinitely (unless rotated/revoked)
- No built-in concept of:
    - User identity
    - Fine-grained permissions
    - Expiration/rotation (unless implemented on top)

### 2.5 Good Practices (High-Level)

- Treat as **secrets** (never hard-code in source, avoid logging)
- Scope keys:
    - Per-application / per-environment
    - Limited permissions (read-only vs read-write)
- Support **rotation & revocation** (multiple active keys, last-used tracking)
- Prefer **headers over query parameters** (to avoid accidental exposure in URLs)

---

## 3. Tokens

Here we focus on tokens used for *authorization* rather than things like CSRF tokens.

### 3.1 What is a Token?

- A **structured piece of data** issued by an **authorization server**
- Captures claims such as:
    - Who the subject is (user or client)
    - What they are allowed to do (scopes/roles)
    - When the token expires
- The service (resource server) uses the token to decide **access**.

Common examples:

- **Opaque tokens** – random string; backend must call/introspect to learn details
- **JWTs (JSON Web Tokens)** – self-contained, signed tokens carrying claims

### 3.2 Typical Uses

- OAuth2 / OIDC flows:
    - Access tokens for APIs
    - ID tokens for identity information
- Microservices / APIs where:
    - User identity matters
    - Authorization needs to be fine-grained
    - Tokens should be **short-lived** and revocable

### 3.3 Strengths

- **Richer semantics** than API keys:
    - Who the user/client is
    - What scopes/permissions they have
    - Expiration and issuance time
- **Short-lived** by design → reduces impact of compromise
- Can be issued by a central **identity provider** and consumed by many services

### 3.4 Limitations & Risks

- More complex to design and implement (especially JWTs)
- **Bearer token risk**:
    - Anyone who has the token can use it until it expires
- Wrong choices in:
    - Token lifetime (too long → high risk; too short → UX/performance pain)
    - Claim content (putting sensitive data into tokens)
- With JWTs:
    - If signing keys are leaked, all tokens are compromised
    - Need key rotation and correct algorithm use

### 3.5 Good Practices (High-Level)

- Keep tokens **short-lived**; pair with refresh mechanisms if needed
- Use **scopes/claims** for least-privilege access
- Treat tokens as secrets (avoid logs, browser storage that’s easily exfiltrated)
- For JWTs:
    - Validate issuer, audience, expiry, signature
    - Keep signing keys secure and rotate regularly

---

## 4. Certificates

### 4.1 What is a Certificate?

- A **digitally signed document** binding:
    - A public key ↔ an identity (hostname, organization, service)
- Issued and signed by a **Certificate Authority (CA)**
- Used in TLS/HTTPS and mutual TLS (mTLS)

### 4.2 Where They Are Used

- **Server certificates**:
    - Used in HTTPS to prove that `api.example.com` is really that service
    - Enable encrypted communication between client and server
- **Client certificates (mTLS)**:
    - Used to authenticate clients (services, machines) to servers
    - Common in internal service meshes / zero-trust architectures

### 4.3 Strengths

- Provide **strong, proven cryptographic guarantees**:
    - Server authenticity
    - Channel confidentiality and integrity
- Scales well when combined with CA infrastructure and automation
- Works at the **transport layer**, independent of application protocols

### 4.4 Limitations & Risks

- Operationally more complex:
    - Issuance, renewal, revocation
    - Keeping private keys secure
- Misconfiguration risks:
    - Trusting the wrong CAs
    - Not validating hostnames or certificate chains
- For mTLS:
    - Managing client certs at scale (rotation, provisioning)

### 4.5 Good Practices (High-Level)

- Automate certificate issuance and renewal (e.g., using a cert management system)
- Enforce modern TLS configurations (protocol versions, cipher suites)
- Protect private keys carefully (restricted access, HSMs or secure key stores)
- Validate:
    - Certificate chain
    - Hostname / SAN (Subject Alternative Name)
    - Expiry

---

## 5. Comparing API Keys, Tokens, and Certificates

| Aspect                | API Keys                          | Tokens (e.g., JWT)                       | Certificates (TLS/mTLS)                        |
|-----------------------|-----------------------------------|------------------------------------------|-----------------------------------------------|
| Primary purpose       | Identify caller / basic auth      | Represent user/client identity & rights  | Prove service/client identity; secure channel |
| Typical lifetime      | Long-lived                        | Short-lived                              | Medium (e.g., days–months)                    |
| Richness of claims    | Low                               | High                                     | Low (identity + key material)                 |
| Common use cases      | Public APIs, simple S2S           | OAuth2/OIDC, microservices, APIs         | HTTPS, service meshes, internal S2S           |
| Compromise impact     | High until rotated                | High until expiry                        | High if private key is stolen                 |
| Operational complexity| Low                               | Medium                                   | High                                          |

---

## 6. Architectural Guidance & Tradeoffs

When designing a system, consider:

1. **Who or what is calling?**
    - A human user → likely needs tokens (via OAuth2/OIDC)
    - A machine/service → API keys, tokens, or mTLS

2. **What level of assurance do you need?**
    - Simple “is this my client?” → API key might suffice
    - “Which user is this and what can they do?” → token with claims
    - “Can I trust this host and channel?” → certificates/TLS (maybe mTLS)

3. **How often can you rotate credentials?**
    - If rotation is hard → prefer more automation (certificate management, token issuing)
    - Make sure whatever you choose **supports rotation without major downtime**

4. **Failure modes**
    - What happens if a key, token, or certificate is leaked or expires?
    - Do you have:
        - Revocation paths?
        - Monitoring and alerting?
        - A roll-forward story (re-issue, rotate, redeploy)?

---

## 7. Summary

- **API keys** are simple but coarse; best for basic client identification with strong operational controls (scoping, rotation).
- **Tokens** carry richer, time-bounded claims about identity and permissions; central to modern auth architectures.
- **Certificates** secure communication channels and authenticate machines/services; essential for HTTPS and secure service-to-service traffic.
- Robust systems usually **combine** these mechanisms:
    - Certificates/TLS for **transport security**
    - Tokens for **user/client identity and authorization**
    - Occasionally API keys for **simple or legacy integrations**

For this course, students should be able to:

- Sketch where each mechanism fits in a reference architecture
- Explain why a particular mechanism is chosen for a given interaction
- Call out major risks and basic mitigations for each (lifetime, rotation, storage, and validation).