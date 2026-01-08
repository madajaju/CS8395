# Project 1 — Movie / Media Recommender

## Overview
Build a platform that recommends movies or shows to users based on history, ratings, and preferences. Users browse a catalog, rate content, and receive personalized recommendations.

## Core Services
- **User Service** — profiles, preferences  
- **Catalog Service** — titles, genres, metadata  
- **Ratings Service** — user reviews & ratings  
- **Recommendation Service** — ranking/ML or heuristic  
- **Search Service** — keyword/genre search  

## Architecture Concept
Read-heavy, async background jobs, caches, and recommendation pipelines. Perfect for **CQRS**, **batch jobs**, and **async event processing**.

## Dataset Options
- **Small:** 1–5k movies (synthetic ratings)  
- **Medium:** MovieLens 100K  
- **Large:** MovieLens 25M + metadata  

## What You’ll Build Across Assignments
- **A0:** baseline catalog + ratings APIs in two languages  
- **A1:** clean API contracts, validation, basic auth  
- **A2:** async rating events → recommendation refresh  
- **A3:** blocking vs reactive recommendation pipeline  
- **A4:** scale catalog, cache results, chaos test failures  

## Stretch (Optional)
- collaborative filtering / cosine similarity  
- trending & popularity dashboards  

## What NOT To Build
Full ML training pipelines, DRM, or streaming players.
