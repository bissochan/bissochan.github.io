---
title: merkle-city
summary: Deterministic generator of low-poly 3D cities from the merkle root of a dataset — the same data always builds the same city in Blender, in one of ten styles from cyberpunk to Roman towns and Asian mountain valleys.
kind: personal
period: Oct 2026
role: Personal project, sole developer
order: 2
stack: [Python, "Blender (bpy · bmesh)", FastAPI, Docker, TypeScript, Vite, three.js, GitHub Actions]
live: https://bissochan.github.io/merkle-city/
repo: https://github.com/bissochan/merkle-city
pipeline:
  - Dataset (lines or files)
  - Merkle root (RFC 6962)
  - Deterministic city plan (JSON)
  - Blender build (bmesh)
  - glb + render
---

## Problem

A merkle root is a perfect fingerprint of a dataset, but 64 hex digits mean nothing to a person. I wanted a fingerprint you can *look at*: the same data should always give the same city, similar data similar cities, and a single file should be provably part of its block.

## What it does

- **From data to a root.** Lines of text or a folder of files become merkle leaves; the tree follows RFC 6962, so any aligned group of leaves is a subtree and a city block can be proven with an audit path (`merkle-city prove`).
- **From the root to a plan.** The root seeds every decision: one of ten styles (contemporary, cyberpunk, metropolis, ancient Rome, medieval, countryside, solarpunk, futuristic, ruins, Asian mountain), season, time of day, water, street layout, lots, buildings and landmarks. The plan is a JSON document with its own hash.
- **From the plan to a diorama.** Blender builds the plan as procedural low-poly geometry (no assets), exports a Draco-compressed glb and renders a tilt-shift miniature with bloom, haze, clouds and birds.
- **Web and Docker.** A static site with a 3D gallery computes the merkle root in the browser exactly as the CLI does; a FastAPI builder and the CLI ship in one [Docker image](https://hub.docker.com/r/bissochan/merkle-city) with Blender inside.

## Engineering

- **Bit-identical by design.** The planner uses only integer millimetres and a SHA-256 counter-mode PRNG with labelled forks, so a plan never depends on floating point or on how many values were drawn elsewhere; it is identical on Linux and Windows.
- **Validated, then built.** A validator checks every plan (overlaps, streets, water, relief, landmarks) before Blender runs; golden plan hashes and property-based tests (Hypothesis) guard each planner version.
- **The builder only draws.** Every decision lives in the pure-Python core; the Blender side turns the plan into geometry, so the glb is deterministic too.
- **Automated end to end.** GitHub Actions lints and tests the core, builds a reference city with Blender on Linux and Windows and compares their hashes, renders the gallery and deploys the site to GitHub Pages.

## What I learned

Determinism is a discipline more than a feature: every float, thread, iteration order and default had to be pinned down, and the payoff is that a change anywhere shows up immediately as a different hash.
