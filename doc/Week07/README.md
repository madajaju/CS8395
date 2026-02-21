# Week 7

## Theme
Building responsive microservices with asynchronous and reactive design patterns.

## Overview
This week explains why thread-per-request systems break down under load and how asynchronous models improve throughput and resilience. The focus is not on framework syntax, but on architecture decisions: when to stay blocking, when to go async, and how to control pressure between services.

## Learning Outcomes
By the end of Week 7, students should be able to:
- Explain why blocking I/O limits scalability in distributed systems.
- Compare synchronous request/response with asynchronous messaging and event-driven flows.
- Describe core reactive streams concepts: publisher, subscriber, stream pipeline, and demand signaling.
- Apply backpressure strategies to prevent overload and cascading failures.
- Identify key tradeoffs of adopting reactive/asynchronous approaches.

## Lecture Flow

### 1) [Why Blocking Systems Fail](./why-blocking-systems-fail/README.md)
Key ideas:
- Blocking work ties up threads and creates queue buildup.
- Under latency spikes, blocked threads amplify tail latency.
- Thread pool exhaustion causes request timeouts and error storms.

Talking points:
- Little's Law intuition: more wait time means more work in system.
- The hidden cost of "just add more threads" (context switching, memory pressure).
- Failure chain example: slow dependency -> blocked callers -> retry storm.

Quick in-class prompt:
- If service A calls service B synchronously and B slows from 30 ms to 2 s, what fails first and why?

### 2) [Async Patterns Overview](./async-patterns-overview/README.md)
Key ideas:
- Async separates initiation from completion.
- Useful patterns: callbacks/futures, message queues, event-driven handlers, workflow orchestration.
- Async improves resource utilization but increases control-flow complexity.

Talking points:
- Fire-and-forget vs request-acknowledge vs request-reply async.
- Correlation IDs for tracing end-to-end flow.
- Retries and idempotency become mandatory in async systems.

Quick in-class prompt:
- Which user operations in your project require immediate response, and which can be processed asynchronously?

### 3) [Reactive Streams Concepts](./reactive-streams-concepts/README.md)
Key ideas:
- Streams model data as a time-ordered sequence of signals.
- Reactive systems emphasize non-blocking processing and bounded resource use.
- Demand-driven consumption reduces overload risk.

Talking points:
- Core signals: onSubscribe, onNext, onError, onComplete.
- Difference between push-only streams and demand-aware streams.
- Functional composition of pipelines (map/filter/flatMap) and where complexity grows.

Quick in-class prompt:
- Where in a microservice data path would stream composition simplify code, and where would it hurt readability?

### 4) [Backpressure Push vs Pull](./backpressure-push-vs-pull/README.md)
Key ideas:
- Backpressure is load regulation between producer and consumer.
- Push systems can overwhelm consumers unless producers receive demand feedback.
- Pull or demand-signaled push can stabilize throughput and latency.

Talking points:
- Strategies: buffering, dropping, sampling, throttling, and rate limiting.
- Why "infinite queues" hide incidents until memory is exhausted.
- Selecting policy by business semantics (drop telemetry, never drop payments).

Quick in-class prompt:
- For an orders pipeline, which events are safe to drop, and which must be retried until success?

## Suggested Whiteboard Exercise (15-20 min)
Scenario:
- API Gateway -> Order Service -> Payment Service -> Notification Service.
- Payment latency spikes and queue depth increases.

Student tasks:
- Mark blocking boundaries and predict failure propagation.
- Redesign one segment with async messaging.
- Add one backpressure control and justify the policy choice.

## Common Misconceptions to Correct
- "Async is always faster." It often improves concurrency, not single-request latency.
- "Reactive means event-driven only." Reactive is primarily about non-blocking, demand-aware flow control.
- "Backpressure is a framework feature." It is an architectural contract, not just an API.

## Exit Checklist
Before moving to Week 8 implementation topics, students should be able to:
- Explain when blocking is acceptable.
- Name at least two async patterns and their tradeoffs.
- Describe how backpressure prevents cascading failure.
- Sketch a basic reactive flow for one service interaction.
