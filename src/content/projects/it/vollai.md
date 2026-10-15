---
title: VollAI
summary: Sistema di machine learning che predice la distribuzione dell'alzatore nella pallavolo professionistica a partire dai dati di scouting, con modelli spiegabili e un prototipo di computer vision.
kind: thesis
period: apr 2026 – set 2026
role: Unico sviluppatore, dall'inizio alla fine (tesi magistrale, tirocinio in mSoft)
order: 1
stack: [Python, MySQL, XGBoost, CatBoost, SHAP, YOLOv8, FastAPI]
pipeline:
  - File DataVolley .dvw
  - Import in MySQL
  - Feature per fondamentale
  - XGBoost / CatBoost
  - Spiegazioni SHAP
  - Servizio FastAPI
---

## Problema

Nella pallavolo è l'alzatore a decidere da dove parte il prossimo attacco. Allenatori e analisti studiano queste scelte su ore di video prima di ogni partita. VollAI si pone una domanda più semplice: **dato il contesto di gioco, dove è probabile che l'alzatore alzi?** Se un modello sa rispondere, e spiegare *perché*, diventa uno strumento per i report di scouting e la preparazione delle partite.

## Dati

La fonte è lo scouting professionistico: file DataVolley `.dvw` di circa **1.000 partite di Superlega**, in cui ogni tocco di palla è codificato da un analista. I file grezzi non sono pubblici e non vengono mostrati qui.

## Approccio

- **Pipeline.** Un importer in Python legge i file `.dvw` e li carica in MySQL, così ogni scambio è interrogabile per squadra, rotazione, fase e fondamentale.
- **Feature.** Le feature sono costruite per fondamentale (battuta, ricezione, alzata, attacco, muro) e descrivono il contesto di gioco attorno a ogni alzata.
- **Modelli.** Alberi con gradient boosting (XGBoost e CatBoost) predicono la distribuzione. Training e test sono **divisi per partita**, così gli scambi della stessa partita non finiscono in entrambi.
- **Spiegabilità.** I valori SHAP mostrano quali fattori hanno spinto ogni previsione: è questo che rende l'output utile a un allenatore, non solo una probabilità.
- **Computer vision (prototipo).** Un detector YOLOv8 con un'omografia del campo localizza i muri nei video delle partite, come primo passo verso feature che lo scouting non registra.
- **Servizio.** I modelli sono esposti tramite un backend FastAPI.

## Cosa ho imparato

La maggior parte del lavoro è stata sui dati: capire un formato specifico del dominio, decidere cosa significa "contesto" per un alzatore ed evitare il leakage che fa sembrare i modelli sportivi migliori di quanto siano. Scegliere modelli spiegabili invece di una black box è stata una decisione di prodotto, oltre che tecnica.
