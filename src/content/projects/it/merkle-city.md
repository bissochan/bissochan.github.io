---
title: merkle-city
summary: Generatore deterministico di città 3D low-poly dalla merkle root di un dataset — gli stessi dati costruiscono sempre la stessa città in Blender, in uno di dieci stili, dal cyberpunk alle città romane fino alle valli di montagna asiatiche.
kind: personal
period: ott 2026
role: Progetto personale, unico sviluppatore
order: 2
stack: [Python, "Blender (bpy · bmesh)", FastAPI, Docker, TypeScript, Vite, three.js, GitHub Actions]
live: https://bissochan.github.io/merkle-city/
repo: https://github.com/bissochan/merkle-city
pipeline:
  - Dataset (righe o file)
  - Merkle root (RFC 6962)
  - Piano deterministico (JSON)
  - Costruzione in Blender (bmesh)
  - glb + render
---

## Problema

Una merkle root è l'impronta perfetta di un dataset, ma 64 cifre esadecimali non dicono nulla a una persona. Volevo un'impronta che si potesse *guardare*: gli stessi dati devono dare sempre la stessa città, dati simili città simili, e di un singolo file si deve poter dimostrare che fa parte del suo isolato.

## Cosa fa

- **Dai dati alla root.** Righe di testo o una cartella di file diventano foglie di un merkle tree secondo l'RFC 6962: ogni gruppo allineato di foglie è un sottoalbero, quindi l'appartenenza a un isolato si dimostra con un audit path (`merkle-city prove`).
- **Dalla root al piano.** La root decide tutto: uno di dieci stili (contemporaneo, cyberpunk, metropoli, antica Roma, medievale, campagna, solarpunk, futuristico, rovine, orientale di montagna), stagione, ora del giorno, acqua, rete stradale, lotti, edifici e monumenti. Il piano è un documento JSON con un proprio hash.
- **Dal piano al plastico.** Blender costruisce il piano come geometria low-poly procedurale (senza asset), esporta un glb compresso con Draco e fa un render in stile tilt-shift con bloom, foschia, nuvole e uccelli.
- **Web e Docker.** Un sito statico con una galleria 3D calcola la merkle root nel browser esattamente come la CLI; un builder FastAPI e la CLI sono in un'unica [immagine Docker](https://hub.docker.com/r/bissochan/merkle-city) con Blender incluso.

## Ingegneria

- **Identico al bit per costruzione.** Il planner usa solo millimetri interi e un PRNG SHA-256 in counter mode con fork etichettati, così un piano non dipende mai dalla virgola mobile né da quanti valori sono stati estratti altrove; è identico su Linux e Windows.
- **Prima validato, poi costruito.** Un validatore controlla ogni piano (sovrapposizioni, strade, acqua, rilievo, monumenti) prima che parta Blender; hash di riferimento dei piani e test property-based (Hypothesis) proteggono ogni versione del planner.
- **Il builder si limita a disegnare.** Ogni decisione sta nel core in Python puro; la parte Blender trasforma il piano in geometria, così anche il glb è deterministico.
- **Automatizzato dall'inizio alla fine.** GitHub Actions fa lint e test del core, costruisce una città di riferimento con Blender su Linux e Windows confrontandone gli hash, renderizza la galleria e pubblica il sito su GitHub Pages.

## Cosa ho imparato

Il determinismo è più una disciplina che una funzionalità: ogni float, thread, ordine di iterazione e valore di default va fissato, e il vantaggio è che qualsiasi cambiamento si vede subito come un hash diverso.
