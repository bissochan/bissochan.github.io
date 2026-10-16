---
title: Warframe Riven Calculator
summary: Static web app that grades Warframe riven mods against every roll their weapon can have, ranks the best stats per weapon and computes the exact kuva cost of chasing a target riven.
kind: personal
period: Oct 2026
role: Personal project, sole developer
order: 3
stack: [TypeScript, React, Vite, Vitest, Web Workers, GitHub Actions]
live: https://bissochan.github.io/warframe-riven-calculator/
repo: https://github.com/bissochan/warframe-riven-calculator
pipeline:
  - Weapon data (WFCD, 603 weapons)
  - Ranges per disposition
  - Grades + DPS score
  - Exact odds of a target
  - Monte Carlo check (worker)
---

## Problem

Riven mods in Warframe have random stats, and players trade them for real in-game money. Telling a godroll from trash means knowing every weapon's disposition, every buff/curse configuration and the roll range, and the cost of rerolling with kuva grows with every cycle. Most tools grade a single number; I wanted one that also answers *"is it worth rolling, and how much will it cost me?"*.

## What it does

- **Per-stat grades.** Each value is placed in the weapon-wide range (disposition × every buff/curse configuration × the 90–110% roll), plus the roll inside the riven's own configuration.
- **Riven score (0–100).** The DPS gain on a reference build plus utility, normalized on the weapon's theoretical godroll, with market-style labels and a verdict on whether the curse actually hurts.
- **Best stats per weapon.** Stat ranking, least harmful curses, godroll and curated community picks for about 30 meta weapons.
- **Cycle and splice simulator.** Kuva costs, Trait Locking (cost doubled) and Riven Splicer recipes from the latest updates.
- **Kuva planner.** Exact odds of hitting a target riven, expected cycles and kuva, 50% and 90% percentiles, with and without a lock.

## Engineering

- **Pure core, thin UI.** All game logic lives in framework-free TypeScript modules (stats, mechanics, ranges, damage model, scoring, cycling, probability); React only renders it.
- **Exact, then verified.** The odds are computed by exact enumeration of the configurations, then cross-checked by a seeded Monte Carlo simulation running in a Web Worker, so the UI never blocks.
- **Honest about uncertainty.** Every game constant has a source; the ones not confirmed by the community are flagged and listed in the app footer.
- **Tested and automated.** Unit tests on the core logic (golden values from the wiki), a script to refresh weapon data from the WFCD dataset, and a GitHub Actions pipeline that tests, builds and deploys to GitHub Pages.

## What I learned

Turning a game's loosely documented mechanics into a probability model forced me to separate what is known from what is assumed, and to make that visible to users instead of hiding it in the numbers.
