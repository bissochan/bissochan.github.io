---
title: Routing delle consegne con algoritmi bio-ispirati e RL
summary: Routing multi-deposito delle consegne nell'area di Parigi, confrontando greedy, colonia di formiche, algoritmo genetico e particle swarm con un agente di reinforcement learning su costo, tempo e CO₂. Ho realizzato la parte di RL.
kind: university
period: "2025"
role: Progetto di gruppo (magistrale), responsabile della parte di reinforcement learning
order: 4
stack: [Python, Stable-Baselines3, PPO, Gymnasium, NumPy, OSRM, Folium, Plotly]
pipeline:
  - Clienti e richieste multi-risorsa
  - Deposito compatibile più vicino
  - Carico dei camion (best fit)
  - Percorso per camion (ACO / GA / swarm / RL)
  - Costo, tempo e CO₂
---

## Problema

Un'azienda consegna diversi tipi di risorse da sei depositi attorno a Parigi. Ogni cliente richiede un mix di risorse, ogni deposito ne ha solo alcune e i camion hanno capacità limitata. L'obiettivo è pianificare le consegne con il minor costo e le minori emissioni, e capire quale approccio di ottimizzazione funziona meglio.

## Approccio

- **Pipeline.** I clienti vengono assegnati al deposito più vicino che ha ciascuna risorsa (tempi stradali da OSRM), le richieste vengono suddivise e caricate sui camion con un'euristica best fit, e il percorso di ogni camion viene ottimizzato separatamente.
- **Algoritmi a confronto.** Una baseline greedy, ant colony optimisation, un algoritmo genetico e particle swarm optimisation con topologie ad anello, a ruota e di von Neumann, tutti rifiniti con 2-opt, più un agente di reinforcement learning allenato con PPO.
- **Valutazione.** Ogni camion viene valutato in euro (costo fisso, carburante, manutenzione, carico e tempo dell'autista) e in CO₂ con un modello di emissioni non lineare, su 20 scenari da 50 clienti, con mappe interattive e curve di convergenza.

## La mia parte: l'agente RL

Ho progettato l'ambiente di routing e allenato l'agente PPO che costruisce il percorso di ogni camion tappa per tappa. Dopo il corso l'ho ripreso e riprogettato:

- ora l'agente **vede i tempi di percorrenza** (dalla tappa corrente, di ritorno al deposito e il loro ordine), così un'unica policy funziona su qualsiasi camion invece di memorizzare un solo percorso;
- le mosse non valide sono **mascherate** (MaskablePPO), quindi ogni percorso è completo e ammissibile;
- la reward è **lo stesso obiettivo degli altri algoritmi** (tempo di percorrenza), normalizzato sul percorso greedy per essere confrontabile tra camion diversi;
- viene **allenato su migliaia di camion casuali** attorno ai depositi reali e, in inferenza, sceglie il migliore di 16 percorsi campionati e lo rifinisce con 2-opt;
- un benchmark lo confronta con l'agente originale, il greedy, il 2-opt e l'ottimo esatto (Held–Karp) su camion mai visti.

## Cosa ho imparato

La prima versione mi ha insegnato con quanta facilità un agente RL trova scorciatoie in una reward specificata male: sembrava competitivo mentre saltava dei clienti. Rendere l'ambiente onesto (percorsi completi, lo stesso obiettivo delle baseline, un ottimo esatto con cui confrontarsi) è contato più del tuning di PPO.
