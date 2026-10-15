---
title: VollAI
summary: Machine learning system that predicts the setter's distribution in professional volleyball from scouting data, with explainable models and a computer-vision prototype.
kind: thesis
period: Apr 2026 – Sep 2026
role: Sole developer, end to end (MSc thesis, internship at mSoft)
order: 1
stack: [Python, MySQL, XGBoost, CatBoost, SHAP, YOLOv8, FastAPI]
pipeline:
  - DataVolley .dvw files
  - Import into MySQL
  - Per-skill features
  - XGBoost / CatBoost
  - SHAP explanations
  - FastAPI service
---

## Problem

In volleyball, the setter decides where the next attack comes from. Coaches and analysts study those choices for hours of video before every match. VollAI asks a simpler question: **given the game context, where is the setter likely to set?** If a model can answer it, and explain *why*, it becomes a tool for scouting reports and match preparation.

## Data

The source is professional scouting: DataVolley `.dvw` files from about **1,000 Italian Superlega matches**, where every touch of the ball is coded by an analyst. The raw files are not public and are not shown here.

## Approach

- **Pipeline.** A Python importer parses the `.dvw` files and loads them into MySQL, so each rally can be queried by team, rotation, phase and skill.
- **Features.** Features are engineered per skill (serve, reception, set, attack, block), describing the game context around each set.
- **Models.** Gradient-boosted trees (XGBoost and CatBoost) predict the distribution. Train and test sets are **split by match**, so rallies from the same match never leak between them.
- **Explainability.** SHAP values show which factors pushed each prediction, which is what makes the output usable by a coach and not just a probability.
- **Computer vision (prototype).** A YOLOv8 detector plus a court homography locates the blockers in match video, as a first step towards features that scouting data does not record.
- **Serving.** The models are exposed through a FastAPI backend.

## What I learned

Most of the work was in the data: understanding a domain-specific format, deciding what "context" means for a setter, and avoiding the leakage that makes sports models look better than they are. Choosing explainable models over a black box was a product decision as much as a technical one.
