---
title: Warframe Riven Calculator
summary: Web app statica che valuta i riven mod di Warframe rispetto a tutti i tiri possibili della loro arma, classifica le statistiche migliori per ogni arma e calcola il costo esatto in kuva per ottenere un riven obiettivo.
kind: personal
period: ott 2026
role: Progetto personale, unico sviluppatore
order: 4
stack: [TypeScript, React, Vite, Vitest, Web Workers, GitHub Actions]
live: https://bissochan.github.io/warframe-riven-calculator/
repo: https://github.com/bissochan/warframe-riven-calculator
pipeline:
  - Dati armi (WFCD, 603 armi)
  - Range per disposizione
  - Voti + punteggio DPS
  - Probabilità esatte del target
  - Verifica Monte Carlo (worker)
---

## Problema

In Warframe i riven mod hanno statistiche casuali e i giocatori li scambiano con valuta di gioco reale. Distinguere un godroll da un riven da buttare significa conoscere la disposizione di ogni arma, tutte le configurazioni di buff e curse e l'intervallo del tiro, mentre il costo in kuva per ritirarlo cresce a ogni ciclo. La maggior parte degli strumenti valuta un singolo numero; io volevo uno strumento che rispondesse anche a *"conviene ritirarlo, e quanto mi costerà?"*.

## Cosa fa

- **Voto per statistica.** Ogni valore viene collocato nell'intervallo dell'arma (disposizione × tutte le configurazioni di buff e curse × tiro dal 90 al 110%), insieme al tiro dentro la configurazione del riven.
- **Punteggio del riven (0–100).** Il guadagno di DPS su una build di riferimento più l'utilità, normalizzato sul godroll teorico dell'arma, con etichette in stile mercato e un giudizio sulla curse: fa davvero male o no.
- **Statistiche migliori per arma.** Classifica delle statistiche, curse meno dannose, godroll e scelte della community curate per circa 30 armi meta.
- **Simulatore di cicli e splice.** Costi in kuva, Trait Locking (costo raddoppiato) e ricette dei Riven Splicer degli ultimi aggiornamenti.
- **Pianificatore di kuva.** Probabilità esatte di ottenere un riven obiettivo, cicli e kuva attesi, percentili al 50% e al 90%, con e senza lock.

## Ingegneria

- **Core puro, UI sottile.** Tutta la logica di gioco sta in moduli TypeScript senza framework (statistiche, meccaniche, intervalli, modello di danno, punteggio, cicli, probabilità); React si limita a mostrarla.
- **Esatto, poi verificato.** Le probabilità sono calcolate per enumerazione esatta delle configurazioni, poi confrontate con una simulazione Monte Carlo con seed fisso che gira in un Web Worker, così l'interfaccia non si blocca mai.
- **Trasparente sull'incertezza.** Ogni costante di gioco ha una fonte; quelle non confermate dalla community sono segnalate ed elencate nel footer dell'app.
- **Testato e automatizzato.** Test unitari sulla logica (valori di riferimento dal wiki), uno script per aggiornare i dati delle armi dal dataset WFCD e una pipeline GitHub Actions che testa, compila e pubblica su GitHub Pages.

## Cosa ho imparato

Trasformare meccaniche di gioco documentate solo in parte in un modello probabilistico mi ha costretto a separare ciò che è noto da ciò che è ipotizzato, e a renderlo visibile agli utenti invece di nasconderlo nei numeri.
