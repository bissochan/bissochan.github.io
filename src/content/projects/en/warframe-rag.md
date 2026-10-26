---
title: Warframe Wiki RAG assistant
summary: A local question-answering bot over the whole Warframe wiki, with hybrid search, cited answers from a local LLM, Italian-language support and an evaluation suite.
kind: personal
period: Oct 2026
role: Personal project, sole developer
order: 3
stack: [Python, BeautifulSoup, SQLite FTS5, bge-m3, sentence-transformers, PyTorch, Ollama, Qwen3, Docker]
pipeline:
  - Polite crawler (sitemap)
  - Cleaning to structured JSON
  - Hierarchical chunking
  - BM25 + dense embeddings
  - RRF fusion + rerank
  - Local LLM, cited answer
---

## Problem

The Warframe wiki has thousands of pages, and the answer to a simple question ("where do I get this blueprint?") is often buried in a table on a page you would not think of. I wanted a chat that answers from the wiki, cites its sources, and runs entirely on my own GPU.

## Approach

- **Ethical crawling.** The crawler only uses the public sitemap and the HTML pages allowed by `robots.txt`, with an identifiable user agent, one request per second, backoff on errors, and resumable runs that only fetch changed pages.
- **Cleaning and chunking.** About 11,400 pages are turned into structured JSON (infoboxes, sections, tables, lists), then split into roughly 100,000 chunks that keep their place in the page hierarchy as context.
- **Hybrid retrieval.** Lexical search (SQLite FTS5 / BM25) catches exact item names; dense search with `bge-m3` embeddings on the GPU catches meaning. The two rankings are fused with Reciprocal Rank Fusion, with a title boost, down-weighting of low-value sections and an optional cross-encoder reranker.
- **Grounded answers.** A local LLM (Qwen3 8B or 14B via Ollama, in Docker) answers only from numbered excerpts and cites them. I tuned the 14B model to fit fully in a 12 GB GPU.
- **Italian questions on an English wiki.** A deterministic layer handles Italian elisions, a game glossary and language detection, so the answer comes back in the language of the question.
- **No scraping where it is not allowed.** For "best build" questions the bot links to the right Overframe page, built from the public sitemap, without ever contacting the site.

## Evaluation

Retrieval is measured on a question set that includes my own real questions: **hit@k**, **MRR**, and an *evidence* check that every expected fact actually reaches the prompt, which matters more than finding the right page. Generated answers are checked automatically for truncation, language and refusals.

## What I learned

Retrieval quality decides everything: most improvements came from better cleaning, chunking and ranking, not from a bigger model. Measuring with a fixed evaluation set made it possible to tell real gains from lucky examples.
