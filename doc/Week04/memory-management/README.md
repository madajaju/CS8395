# Memory Management

**Video:** [https://youtu.be/geFoSPvQ9jQ](https://youtu.be/geFoSPvQ9jQ)

**Purpose:** Understand the fundamentals of how operating systems manage physical and logical memory, and why this is critical for application performance and stability.

**Outcomes**
- Explain the difference between logical and physical memory.
- Understand the role of the Memory Management Unit (MMU).
- Identify common memory management techniques like paging and demand paging.
- Recognize the impact of page faults and swap space on system performance.

---

## 1. Why Memory Management?

For a CPU to execute instructions or process data, that information **must be in memory**.
- **Efficiency:** The OS must decide what stays in memory and what moves to disk to optimize CPU utilization.
- **Isolation:** Memory management ensures that one process cannot accidentally (or maliciously) access the memory of another.
- **Activities:**
    - Tracking used/free memory.
    - Swapping processes in/out.
    - Allocating/deallocating space.

## 2. Logical vs. Physical Memory

-   **Physical Memory:** The actual RAM hardware, divided into fixed-size blocks called **frames**.
-   **Logical Memory:** The "view" of memory that the program sees, divided into **pages**.
    -   **Text Section:** Program instructions (read-only).
    -   **Data/Heap/Stack:** User data and dynamic allocations.
-   **Kernel vs. User Memory:** The OS reserves specific regions for its own operations to prevent user programs from crashing the system.

## 3. The Memory-Management Unit (MMU)

The MMU is a hardware device that performs the heavy lifting of **address translation**. It maps a program's logical address to a specific physical address in RAM. This allows programs to think they have a continuous block of memory, even if their data is scattered across different physical frames.

## 4. Paging and Virtual Memory

### Paging
The OS divides logical memory into pages and physical memory into frames of the same size. A **Page Table** maps pages to frames. This eliminates the need for contiguous physical memory and reduces fragmentation.

### Virtual Memory
Virtual memory allows a program to be larger than the physical RAM available.
-   **Demand Paging:** Only load pages into RAM when they are actually accessed ("lazy loading").
-   **Page Faults:** When a program tries to access a page not currently in RAM, a "page fault" occurs. The OS must then find the page on disk, load it into a free frame, and update the page table.

## 5. Copy-on-Write (COW)

When a process is forked (created), the parent and child initially **share the same pages**. A page is only copied if one of the processes tries to write to it. This makes process creation extremely fast and efficient.

## 6. Page Replacement

When RAM is full and a new page is needed, the OS must choose an existing page to "evict" (swap to disk).
-   **Modify (Dirty) Bit:** Only pages that have been changed need to be written back to disk; others can just be discarded and re-read later.
-   **Thrashing:** If the OS spends more time swapping pages than executing instructions, performance collapses.

## 7. Real-World Scenario: The "Friday Night" Lag
Imagine an online game where a new event starts at 8 PM on Friday. Thousands of players log in at once.
- **System Impact:** The server's RAM fills up with player data. The OS starts **swapping** less active pages to disk. 
- **The Result:** If you move to a new area of the game, the server hits a **Page Fault**, forcing it to read from slow disk storage. Players experience "lag" not because of the network, but because the OS is struggling with memory management (Thrashing).

## 8. Application to Assignment A1
In **Assignment A1**, you are testing your service. 
- **Efficiency:** While your Assignment A1 services are small, think about the **heap memory** of your two languages (e.g., Java vs. Go). 
- **Constraint:** A Java service with a large heap might trigger more page faults on a tiny cloud instance than a more memory-efficient Go implementation. Mention any memory performance differences you notice in your Step 5 documentation.

## 9. Summary

Effective memory management is a balancing act between providing a large, simple address space for programs and managing the limited, complex reality of physical hardware. Understanding these concepts helps developers write code that is "memory-friendly" and systems that remain stable under load.
