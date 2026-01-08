# Project 5 — Food Delivery & Restaurant Ordering

## Overview
Users place food orders, restaurants prepare them, and drivers deliver. Focus is on order lifecycle, routing, and reliability.

## Core Services
- **Restaurant/Menu Service**  
- **Order Service**  
- **Dispatch/Driver Service**  
- **Payment Simulator**  
- **ETA/Tracking Service**  

## Architecture Concept
Great for **orchestration vs choreography**, retries, and long-running workflows.

## Dataset Options
- **Small:** 100 restaurants / 1k orders  
- **Medium:** 1k restaurants / 50k orders  
- **Large:** 10k restaurants / 1M+ orders  

## A0 → A4 Path
- **A0:** menu + order APIs in two stacks  
- **A1:** structured order contract & validation  
- **A2:** async order → dispatch pipeline  
- **A3:** blocking vs reactive delivery estimator  
- **A4:** chaos: driver failures, queue delays, retries  

## Stretch
- surge pricing  
- driver ranking

## What NOT To Build
Real maps, real payments, delivery logistics optimization.
