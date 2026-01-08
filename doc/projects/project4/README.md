# Project 4 — Social News Feed / Content Aggregator

## Overview
Users create posts, vote, comment, and receive a personalized feed ranked by activity and relevance.

## Core Services
- **User Service**  
- **Post Service**  
- **Comment Service**  
- **Vote / Ranking Service**  
- **Feed Aggregator**  
- **Notification Service**  

## Architecture Concept
Highly **read-heavy**, event-driven, perfect for fan-out pipelines and caching layers.

## Dataset Options
- **Small:** 1,000 posts  
- **Medium:** 50k posts + votes  
- **Large:** 1–5M generated interactions  

## A0 → A4 Path
- **A0:** simple post APIs  
- **A1:** spec-driven post/feeds service  
- **A2:** vote events → async feed rebuild  
- **A3:** blocking vs reactive feed generation  
- **A4:** scale feed aggregator, simulate burst traffic  

## Stretch
- trending topics  
- follower graph feeds

## What NOT To Build
Real moderation pipelines or full social profiles.
