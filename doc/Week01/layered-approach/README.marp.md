---
marp: true
title:  Layered Approach
paginate: true
theme: default
---

# Layered Approach

Video: [https://youtu.be/SUREWoSzack](https://youtu.be/SUREWoSzack)

---

## Why a Layered Approach?

Networks are complex, with many “pieces”:

- Hosts
- Routers
- Links of various media
- Applications
- Protocols
- Hardware, software

Without structure, it would be impossible to reason about:

- How data moves from **host A to host B and back**
- Where responsibilities begin and end
- How different vendors’ equipment and software interoperate

**Layered architecture is the solution**:  
It gives us a standard way to talk about how “all this stuff fits together.”

---

## Postal Service Analogy

Think about sending a letter or package from **your house** to **your parents’ house**:

- You don’t just hand a pile of loose papers to a postal worker and say  
  “Please deliver this.”
- Instead, you follow **common rules**:
    - Put the message in an **envelope or box** of a standard size
    - Write the **destination address** and **return address**
    - Let the postal system decide how it moves through trucks, planes, etc.

Key points of the analogy:

- The **message** is your data.
- The **envelope/box** is the standardized format and protocol.
- The **address** is like an IP address.
- The **trucks and planes** are like transport/network/link layers.

A layered approach to networking works the same way:  
each layer has a **specific, standardized role** in getting data delivered.

---

## Internet Protocol Stack (Practical View)

You may see references to a **7‑layer** model (OSI).  
In practice, the Internet stack is simpler:

- There are effectively **4 main layers**, plus:
    - A **physical** layer we often call “bits on the wire.”

We will focus on the **Internet Protocol Stack**:

- **Application** – supporting network applications
- **Transport** – process‑to‑process data transfer
- **Network** – routing datagrams from source to destination
- **Link** – data transfer between neighboring network elements
- **Physical** – bits “on the wire”

---

## Application Layer

**Role:** Supporting network applications.

Examples of application protocols:

- **HTTP / HTTPS** – web pages, REST APIs
- **FTP** – file transfer
- **SMTP** – email

Using the postal analogy:

- The application layer defines the **type of envelope/package** and  
  the **conventions** for what goes inside it.
- Different applications agree on:
    - How requests and responses are formatted
    - What headers/metadata they include
    - How to interpret the payload

Standardization here lets any HTTP client talk to any HTTP server,  
just as postal standards let any letter move through the mail system.

---

## Transport Layer

**Role:** Process‑to‑process data transfer.

Major transport protocols:

- **TCP (Transmission Control Protocol)**
    - Reliable, ordered, connection‑oriented
- **UDP (User Datagram Protocol)**
    - Unreliable, unordered, connectionless, but lightweight

Analogy:

- Think of **postal service trucks or airplanes**:
    - They move many envelopes and packages from one facility to another.
- The transport layer decides:
    - *How* data is carried (reliable vs best‑effort)
    - How to identify **sending and receiving processes** (ports)

Because TCP and UDP are standardized, applications can rely on  
a common way to ship their “envelopes” across the network.

---

## Network Layer (IP & Routing)

**Role:** Routing of datagrams from source to destination.

Here we deal with:

- **IP (Internet Protocol)** – IPv4 and IPv6
- **Routing protocols** – deciding which path to take

Analogy to postal addresses:

- A postal address has:
    - House or building number
    - Street name
    - City
    - State/province
    - Country
- IP addresses provide a similar **hierarchical structure**:
    - They indicate a **network** and a **host** within that network.
    - Routers use this structure to decide where to forward packets next.

IPv4 vs IPv6:

- **IPv4** uses 32‑bit addresses (e.g., `8.8.8.8`), and we began running out.
- **IPv6** uses 128‑bit addresses:
    - Provides **trillions/quadrillions** of possible addresses.
    - Designed so we don’t run out anytime soon.

Routing is “pretty cool” because:

- Routers only need to know how to reach **blocks of addresses**  
  (like knowing which mail goes to which city or region).
- They progressively narrow down the path until the packet reaches  
  the final destination.

---

## Link & Physical Layers

**Link Layer**

**Role:** Data transfer between **neighboring network elements**.

Examples:

- **Ethernet**
- **802.11 (Wi‑Fi)**
- **PPP** and similar technologies

Questions answered here:

- How are two devices on the **same network segment** connected?
- How do they share the medium (cable, radio spectrum, etc.)?
- How are frames formatted and addressed locally (MAC addresses)?

**Physical Layer**

**Role:** Getting the actual **bits on the wire** (or fiber, or radio).

- Electrical signals, light pulses, or radio waves
- Defines voltages, modulation schemes, frequencies, etc.

Together, link + physical define **how** bits move over each hop,  
while upper layers decide **what** those bits mean and where they go.

---

## Cloud Protocols & Modern APIs

Cloud‑based services are usually supported at the **application layer**.

Common characteristics:

- Typically reachable via **HTTP/HTTPS** (web protocols).
- Many APIs are **RESTful** (Representational State Transfer):
    - Use standard HTTP verbs (GET, POST, PUT, DELETE)
    - Resources identified by URLs
    - Stateless interactions

We will:

- Study **REST** in detail.
- Look at newer protocols like **MCP (Model Context Protocol)**:
    - Emerging in the context of **AI and model‑driven applications**
    - Still typically built **on top of RESTful interfaces**
    - Which themselves are built on **HTTP/HTTPS**,  
      the application layer of the Internet stack.

Because these layers and protocols are standardized,  
we can reliably move data from one host to another **across many networks and technologies**,  
while keeping the application logic relatively simple and portable.