# Project 2 — IoT Smart Home Sensor Platform

## Overview
Collect, process, and alert on sensor data (temperature, humidity, motion) sent from devices across homes. Users see dashboards and alerts.

## Core Services
- **Device Registry** — onboarding devices  
- **Ingestion Gateway** — accepts sensor events  
- **Rules/Alerts Service** — triggers notifications  
- **Metrics Store** — time-series persistence  
- **Dashboard API** — queries, charts  

## Architecture Concept
Event-heavy, streaming-first, built for **backpressure** and **queues**. Ideal for resilience and reactive programming.

## Dataset Options
- **Small:** 50 devices / 10k readings  
- **Medium:** 1,000 devices / ~1M readings  
- **Large:** continuous simulated stream  

## A0 → A4 Path
- **A0:** register device + send test data  
- **A1:** clean ingestion API, validation  
- **A2:** async event pipeline + alert processor  
- **A3:** blocking vs reactive alert evaluator  
- **A4:** scale ingestion, chaos: drop queue / DB outage  

## Stretch
- anomaly detection  
- per-home thresholds

## What NOT To Build
Complex dashboards, real security cameras, real device firmware.
