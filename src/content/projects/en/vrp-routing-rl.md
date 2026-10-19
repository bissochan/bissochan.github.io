---
title: Delivery routing with bio-inspired algorithms and RL
summary: Multi-depot delivery routing around Paris, comparing greedy, ant colony, genetic and particle-swarm optimisation with a reinforcement-learning agent on cost, time and CO₂. I built the RL part.
kind: university
period: "2025"
role: Team project (MSc), lead on the reinforcement-learning component
order: 4
stack: [Python, Stable-Baselines3, PPO, Gymnasium, NumPy, OSRM, Folium, Plotly]
pipeline:
  - Clients and multi-resource demands
  - Nearest compatible depot
  - Best-fit truck packing
  - Route per truck (ACO / GA / swarm / RL)
  - Cost, time and CO₂
---

## Problem

A company delivers several types of resources from six depots around Paris. Each client needs a mix of resources, each depot stocks only some of them, and trucks have limited capacity. The goal is to plan the deliveries at the lowest cost and emissions, and to see which optimisation approach does it best.

## Approach

- **Pipeline.** Clients are assigned to the nearest depot that stocks each resource (road times from OSRM), demands are split and packed into trucks with a best-fit heuristic, and each truck route is optimised separately.
- **Algorithms compared.** A greedy baseline, ant colony optimisation, a genetic algorithm and particle-swarm optimisation with ring, wheel and von Neumann topologies, all refined with 2-opt, plus a reinforcement-learning agent trained with PPO.
- **Evaluation.** Each truck is costed in euros (fixed cost, fuel, maintenance, load and driver time) and in CO₂ with a non-linear emission model, over 20 scenarios of 50 clients, with interactive maps and convergence curves.

## My part: the RL agent

I designed the routing environment and trained the PPO agent that builds each truck's tour node by node. After the course I went back to it and redesigned it:

- the agent now **sees the travel times** (from the current stop, back to the depot, and their rank), so a single policy works on any truck instead of memorising one route;
- invalid moves are **masked** (MaskablePPO), so every tour is complete and feasible;
- the reward is the **same objective as the other algorithms** (travel time), normalised by the greedy tour so it is comparable across trucks;
- it is **trained on thousands of random trucks** around the real depots, and at inference it takes the best of 16 sampled tours and refines it with 2-opt;
- a benchmark compares it with the original agent, greedy, 2-opt and the exact optimum (Held–Karp) on unseen trucks.

## What I learned

The first version taught me how easily an RL agent finds shortcuts in a badly specified reward: it looked competitive while skipping clients. Making the environment honest (complete tours, the same objective as the baselines, an exact optimum to compare against) mattered more than tuning PPO.
