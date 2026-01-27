# OAuth2 and OIDC Overview

Video: https://youtu.be/L6UrFWzA8rc

**Purpose:** Introduce OAuth 2.0 and OpenID Connect (OIDC) at an architectural level: what problems they solve, the main roles and flows, and where they fit into modern identity and session architectures.

**Outcomes**

By the end of this lecture, students should be able to:

- Explain the main roles and concepts in OAuth2 and OIDC
- Describe, at a high level, how a typical OAuth2/OIDC login and API call works
- Recognize when to apply OAuth2 vs OIDC vs simpler mechanisms
- Identify key token types (access token, refresh token, ID token) and what they are for
- Call out common risks and tradeoffs in OAuth2/OIDC-based designs

---

## 1. Why OAuth2 and OIDC?

### 1.1 The Problems They Address

Modern applications often need to:

- Allow **users to log in** using an existing identity provider (IdP)
- Let **apps or services call APIs on behalf of a user**, without sharing passwords
- Support multiple clients (web, mobile, SPA, server-side) talking to multiple APIs
- Delegate access to limited resources (e.g., “this app can read my calendar, but not my email”)

Challenges without OAuth2/OIDC:

- Passwords get shared across apps and services
- Every app and API implements its own login and session logic
- Hard to centralize and manage identity, MFA, risk checks, and policies

**OAuth2 and OIDC** standardize:

- How **clients obtain tokens** to call APIs (OAuth2)
- How **apps get user identity information** and login sessions (OIDC)

### 1.2 High-Level View

- **OAuth 2.0**: A framework for **delegated authorization**
    - “App X can call API Y on behalf of user Z, with these permissions”
- **OpenID Connect (OIDC)**: An identity layer on top of OAuth2
    - “App X can trust that user Z has authenticated with IdP I, and here are their identity claims”

---

## 2. Core Roles and Concepts

### 2.1 OAuth2 Roles

- **Resource Owner**
    - Typically a **user** who owns the data or resource
- **Client**
    - The application requesting access on behalf of the resource owner
    - Examples: web app, SPA, native mobile app, backend service
- **Authorization Server**
    - Issues tokens after authenticating the resource owner and getting consent
    - Often an identity provider (IdP) or dedicated auth service
- **Resource Server**
    - The API or service hosting protected resources
    - Validates tokens and enforces authorization

### 2.2 Tokens

- **Access Token**
    - Used by clients to call APIs (resource servers)
    - Encodes or references permissions (scopes), audience, expiry
    - **What it is for**: Authorization to access specific resources
- **Refresh Token**
    - Long-lived token used to obtain new access tokens without re-prompting the user
    - Typically not sent to APIs, only to the authorization server
- **ID Token (OIDC)**
    - JWT that contains **identity information about the user**
    - Intended for the client application, **not** the API
    - Example claims: `sub` (subject ID), `name`, `email`, `auth_time`

---

## 3. OAuth2: Architectural Overview

### 3.1 What OAuth2 Is (and Isn’t)

- OAuth2 is a **framework** for authorization flows
    - Defines roles, token types, and grant types
- It does **not** fully specify:
    - Exact token formats (though JWT is common)
    - How user authentication is performed
    - How user information is represented
- That’s where **OIDC** comes in for identity, and other specs/choices for token formats.

### 3.2 Common Grant Types (Conceptual)

You don't need to memorize every grant type; focus on the scenarios:

- **Authorization Code (with PKCE)**
    - For browser-based and native apps
    - User is redirected to the authorization server to log in
    - Client gets an authorization code, then exchanges it for tokens
    - Considered the **standard secure flow** for modern apps
- **Client Credentials**
    - Machine-to-machine (no user)
    - Client authenticates itself directly to the authorization server
    - Gets an access token representing **the client’s own identity**
- (Others exist, but many have been superseded or are niche; in modern systems, emphasis is on **Authorization Code + PKCE** and **Client Credentials**.)

---

## 4. OIDC: Adding Identity to OAuth2

### 4.1 Why OIDC?

OAuth2 alone focuses on **authorization** (“can this client call this API on behalf of…”).

In practice, applications also need:

- To **log users in**
- To obtain **standardized user identity claims** (subject ID, email, etc.)
- To establish and maintain **sessions** based on those identities

**OIDC (OpenID Connect)**:

- Uses OAuth2 flows underneath
- Adds:
    - **ID tokens** (JWTs with user identity claims)
    - Standard user info endpoints and scopes
    - Well-defined discovery and metadata (e.g., `.well-known/openid-configuration`)

### 4.2 ID Tokens vs Access Tokens

- **ID Token**
    - Audience is typically the **client application**
    - Contains: who the user is, when they authenticated, which IdP
    - Used for **login and session establishment**
- **Access Token**
    - Audience is typically a **resource server (API)**
    - Used for **authorizing API calls**
    - May be opaque or JWT; structure is for the API, not the client UI

---

## 5. High-Level Flow: User Login + API Call

This is the scenario many systems implement:

### 5.1 Steps (Conceptual)

1. **User tries to access the application**
    - App detects no local session
2. **Redirect to Authorization Server (OIDC Provider)**
    - Authorization Code + PKCE flow, for example
3. **User logs in & possibly consents**
    - Authorization server authenticates the user
4. **Authorization Server redirects back with an authorization code**
    - Redirect to app’s redirect URI
5. **Client exchanges code for tokens**
    - Gets:
        - **ID token** (user identity)
        - **Access token** (for APIs)
        - Optional **refresh token**
6. **Client establishes a session**
    - Uses ID token to know **who** the user is
    - Stores session information (e.g., in a cookie or server-side)
7. **Client calls APIs with the access token**
    - Attaches `Authorization: Bearer <access_token>`
    - APIs validate the access token and apply authorization

### 5.2 Architectural Separation

- **Authorization server / IdP**
    - Centralized login, MFA, risk checks, policies
- **Client apps**
    - Rely on IdP, do not handle passwords directly
    - Manage user sessions using ID tokens and/or local session state
- **APIs / resource servers**
    - Receive and validate access tokens
    - Enforce scopes and permissions on resources

---

## 6. When to Use OAuth2 and OIDC

### 6.1 Good Fits

- Multiple applications/APIs that should share a **single sign-on** (SSO) experience
- Need to integrate with existing identity providers:
    - Enterprise IdPs, social logins, etc.
- Microservices architectures where:
    - APIs need a consistent way to validate tokens and scopes
- Native or SPA clients that:
    - Should not handle user passwords directly
    - Need tokens to access back-end APIs

### 6.2 When Simpler Mechanisms Might Be Enough

- Single app, no external integrations, limited lifetime:
    - A simple, local username/password system plus sessions might be enough
- Internal-only services with simple needs:
    - API keys or mTLS might be sufficient for **service identity** (but not user-level identity)
- However:
    - Even in small systems, using OAuth2/OIDC from the start can reduce future migration pain.

---

## 7. Risks and Tradeoffs

### 7.1 Complexity and Misconfiguration

- OAuth2/OIDC ecosystems are powerful but can be complex:
    - Many options, parameters, and flows
- Misconfigurations can lead to:
    - Token leaks (e.g., tokens in URLs or logs)
    - Incorrect audience or issuer validation
    - Bypassed security checks

Mitigation (conceptual):

- Prefer **well-vetted libraries and frameworks**
- Follow provider and standards guidance:
    - Use **Authorization Code + PKCE** for browser/native clients
    - Avoid deprecated flows (e.g., Implicit)
- Validate:
    - Token signature and algorithms
    - Issuer (`iss`), audience (`aud`), expiry (`exp`)

### 7.2 Token Lifetime and Revocation

- Short-lived access tokens:
    - Reduce impact if stolen
    - Require refresh mechanisms or re-authentication
- Long-lived tokens:
    - Fewer round-trips to auth server
    - Increase risk if leaked or stolen
- Revocation challenges:
    - Stateless tokens (JWTs) are hard to revoke early
    - Need:
        - Short lifetimes, or
        - Revocation lists / introspection, or
        - Token revocation endpoints

### 7.3 Front-Channel vs Back-Channel Security

- Front-channel:
    - Browser redirects, URLs, query parameters
    - Less private; more risk of tokens or codes leaking in logs or browser history
- Back-channel:
    - Direct server-to-server calls (e.g., code-to-token exchange)
    - More secure for sensitive data (tokens, client secrets)

Good designs:

- Keep **tokens in back-channel exchanges** whenever possible
- Use front-channel mainly for temporary codes, not long-lived secrets

---

## 8. Connecting OAuth2/OIDC to Sessions and Tokens (Week Integration)

- **Identity and Sessions**:
    - OIDC provides a standardized way to authenticate users and obtain identity (ID token)
    - Apps still need to decide how to turn that into a **session** (cookies, tokens, etc.)
- **Cookies, Sessions, CSRF**:
    - Web apps often store tokens or session IDs in cookies
    - Need to combine OIDC with proper cookie and CSRF defenses
- **API Keys, Tokens, Certificates**:
    - OAuth2/OIDC access tokens are one specific type of **token**
    - Certificates may secure the channel; OAuth2/OIDC secure **who** is on that channel
- **Error Strategies and Contracts**:
    - APIs must return clear errors when:
        - Tokens are missing, invalid, or expired
        - Scopes are insufficient
    - Errors should not leak sensitive token information

---

## 9. Summary

- **OAuth2** standardizes how clients obtain tokens to access APIs on behalf of resource owners.
- **OIDC** builds on OAuth2 to provide **user identity** and login (ID tokens, user info).
- Key concepts:
    - Roles: resource owner, client, authorization server, resource server
    - Tokens: access tokens, refresh tokens, ID tokens
    - Flows: especially Authorization Code (+ PKCE) and Client Credentials
- Good use cases:
    - SSO, multi-app ecosystems, external IdP integration, microservices APIs
- Key tradeoffs and risks:
    - Complexity and misconfiguration
    - Token lifetime and revocation
    - Correct handling of tokens across front- and back-channel

For this course, students should be able to:

- Sketch a basic OAuth2/OIDC login + API call sequence
- Explain the difference between an ID token and an access token
- Identify when OAuth2/OIDC are the right tools vs simpler schemes
- Call out where security-sensitive design decisions live (flows, lifetimes, validation)