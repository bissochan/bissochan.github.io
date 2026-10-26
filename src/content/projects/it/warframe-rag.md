---
title: Assistente RAG per il wiki di Warframe
summary: Un bot locale che risponde alle domande su tutto il wiki di Warframe, con ricerca ibrida, risposte citate da un LLM locale, supporto all'italiano e una suite di valutazione.
kind: personal
period: ott 2026
role: Progetto personale, unico sviluppatore
order: 3
stack: [Python, BeautifulSoup, SQLite FTS5, bge-m3, sentence-transformers, PyTorch, Ollama, Qwen3, Docker]
pipeline:
  - Crawler rispettoso (sitemap)
  - Pulizia in JSON strutturato
  - Chunking gerarchico
  - BM25 + embedding densi
  - Fusione RRF + rerank
  - LLM locale, risposta citata
---

## Problema

Il wiki di Warframe ha migliaia di pagine, e la risposta a una domanda semplice ("dove trovo questo schema?") è spesso sepolta in una tabella di una pagina a cui non penseresti. Volevo una chat che risponda partendo dal wiki, citi le fonti e giri interamente sulla mia GPU.

## Approccio

- **Crawling etico.** Il crawler usa solo la sitemap pubblica e le pagine HTML consentite dal `robots.txt`, con uno user agent identificabile, una richiesta al secondo, backoff sugli errori ed esecuzioni riprendibili che scaricano solo le pagine cambiate.
- **Pulizia e chunking.** Circa 11.400 pagine diventano JSON strutturato (infobox, sezioni, tabelle, liste), poi vengono divise in circa 100.000 chunk che conservano la loro posizione nella gerarchia della pagina come contesto.
- **Ricerca ibrida.** La ricerca lessicale (SQLite FTS5 / BM25) trova i nomi esatti degli oggetti; quella densa con embedding `bge-m3` su GPU trova il significato. Le due classifiche sono fuse con Reciprocal Rank Fusion, con un boost sui titoli, una penalità per le sezioni poco utili e un reranker cross-encoder opzionale.
- **Risposte fondate.** Un LLM locale (Qwen3 8B o 14B con Ollama, in Docker) risponde solo dagli estratti numerati e li cita. Ho ottimizzato il modello 14B perché stia interamente in una GPU da 12 GB.
- **Domande in italiano su un wiki in inglese.** Uno strato deterministico gestisce le elisioni italiane, un glossario del gioco e il rilevamento della lingua, così la risposta arriva nella lingua della domanda.
- **Niente scraping dove non è consentito.** Per le domande sulle build il bot rimanda alla pagina giusta di Overframe, costruita dalla sitemap pubblica, senza mai contattare il sito.

## Valutazione

Il recupero è misurato su un insieme di domande che include le mie domande reali: **hit@k**, **MRR** e un controllo di *evidenza*, cioè che ogni fatto atteso arrivi davvero nel prompt, che conta più di trovare la pagina giusta. Le risposte generate sono controllate automaticamente per troncamento, lingua e rifiuti.

## Cosa ho imparato

È la qualità del recupero a decidere tutto: la maggior parte dei miglioramenti è venuta da pulizia, chunking e ranking migliori, non da un modello più grande. Misurare con un insieme di valutazione fisso ha permesso di distinguere i miglioramenti reali dagli esempi fortunati.
