# Project 3 — Online Store / Shopping Cart

## Overview
Users browse products, add items to a cart, place orders, and simulate payment/fulfillment.

## Core Services
- **Product Catalog**  
- **Cart Service**  
- **Order Service**  
- **Inventory Service**  
- **Payment Simulator**  

## Architecture Concept
Classic microservices domain — highlights **sagas**, consistency boundaries, and retries.

## Dataset Options
- **Small:** 200 products  
- **Medium:** 5–10k products + order history  
- **Large:** 100k+ products + synthetic traffic  

## A0 → A4 Path
- **A0:** product listing in two stacks  
- **A1:** cart or order API w/ validation + tests  
- **A2:** order workflow (reserve → confirm → fallback)  
- **A3:** synchronous vs reactive order analytics  
- **A4:** scale order service, test failures + backoffs  

## Stretch
- promotions/coupons  
- abandoned cart notifications

## What NOT To Build
Real payments, real tax logic, full ERP.
