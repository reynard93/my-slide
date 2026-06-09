# Speaker Notes — Context Optimization for Coding Agents

15-minute core sharing; all appendix material runs ~16:30. Starter zip is bundled in the deck (slide 15).

---

## 01 · Cover

**~1 min**

Open with the tagline on the right panel: "map → distill → exact edit → remember what mattered."

Key framing: this is not about a magic tool or one configuration trick. It is about sequencing — asking what kind of context a job actually needs, then picking the cheapest surface that can answer it. The same ladder works in Claude Code, Cursor, Codex, or whatever harness the team runs next year.

The three tags — cheaper, safer edits, less wandering — are the measurable outcomes. Return to them in the close.

---

## 02 · Problem

**~1 min**

Read the "Bad default loop" code block aloud. It should be slightly uncomfortable to recognize.

The four cards are the root causes. Call each one by name:
- **Too much text**: context window fills with irrelevant files before the target is known.
- **Wrong altitude**: trying to answer an architecture question from a line snippet, or an edit question from a vague diagram.
- **Stale edits**: the agent edits a mental copy of the file, not the current state. This is a real and common source of bugs.
- **Slow debugging**: opening a browser or a full MCP session when a console log redirect would have done the same job in a fraction of the tokens.

Transition: the agent is not the problem. The context strategy is.

---

## 03 · Principle

**~1.5 min**

This slide is the whole talk distilled. Spend real time here.

The left panel: "Do not start with files." This sounds obvious after you've seen it go wrong a few times. The instinct is to grab the nearest large thing — a log, a whole module, a README. The question comes first; the surface follows.

Walk through the ladder:
1. **Map** — global structure. You do not read files here; you read a report about how the files connect.
2. **Distill** — function-level facts. What does this symbol do, what calls it, what breaks if you touch it.
3. **Localize** — exact lines, exact symbols, current file state. Not a rough approximation.
4. **Edit** — hash-verified patch. The tool rejects a write if the file has changed since the read.
5. **Remember** — durable decisions, root causes, conventions. Saves the next session from re-discovering what this session found.

The point: each rung is cheaper per unit of information than the one below it. You go down only when the rung above cannot answer the question.

---

## 04 · Compress

**~45 sec**

Before any of the structural tools, compression clears the noise.

- **Caveman**: cuts filler out of agent replies. Same information, fewer tokens. The code block shows the contrast — "Certainly! The issue may be caused by..." vs "Bug in auth guard. Token expiry check off by one. Fix test first." The second one fits in the remaining context; the first starts to crowd it.
- **RTK**: filters shell output before it enters context. `git status`, build logs, test output — all of them can be compressed before the agent sees them.

The rule in the right panel: compression is not understanding. It buys room for the tools that do understand structure. Do not confuse trimming tokens with actually knowing the codebase.

---

## 05 · Headroom Fit

**~45 sec** (skippable if running long; the Compress slide already names Headroom)

This slide answers the obvious follow-up: "where does the live compression layer actually sit?"

Headroom is a local proxy / wrapper / SDK / MCP layer that compresses what the agent reads *before* the request reaches the model. The framing to land: it is not a replacement for the map (Graphify) or for memory (AgentMemory) — those are persistent. Headroom is live input compression for the current request.

- **Graphify** = persistent map.
- **AgentMemory** = durable recall.
- **Headroom** = live input compression.

Where it helps (left card): long agent sessions, JSON-heavy tool results, build/test output, logs, RAG chunks, and repeated multi-tool context.

The tradeoff (right card): it adds a proxy or wrapper, and may require a retrieve round trip when the compressed detail is too thin. Skip it for short chats or simple code edits — the overhead is not worth it there.

---

## 06 · Map (Graphify)

**~1 min**

Graphify takes code, docs, papers, images, notes — and turns them into a queryable graph. The key output is `GRAPH_REPORT.md`. Read that first; the browser viz is optional and often skipped.

The tags on the right are the use-case triggers: "architecture", "how does this connect?", "what path links A to B?", "what should I read first?" When a prompt contains those phrases, Graphify is the answer.

The bottom note is important: this tool should reduce the number of files you open. If you run Graphify and then open 30 files anyway, you used it wrong. The map replaces file-opening; it does not precede it.

---

## 07 · Distill (tldr-code)

**~1 min**

tldr-code is tree-sitter based, not LLM based. It produces structure summaries, call graphs, reverse impact, dead code lists, and health metrics. JSON by default — easy to pipe into agent context.

The four cards on the right are sequencing cues:
- Before opening a file: find the symbol and its blast radius first.
- Before a refactor: know what depends on it.
- Before a cleanup: check dead code without guessing.
- After Graphify: Graphify found the node; tldr goes deep on it.

The pattern is: global map first, function facts second, exact lines third. Never start at the bottom.

---

## 08 · Execute (Safe Edits)

**~1 min**

This is the part teams skip until they get burned.

The code block on the left shows the failure mode: "Replace line 45 with this." What line 45? Which version of the file? The one the agent saw two turns ago? The one that got reformatted since?

Trueline MCP and Hashline/Oh My Pi both solve this the same way: the agent reads lines and gets back a hash or a reference. Any subsequent edit requires presenting that same hash. If the file changed, the anchor does not match, and the write is rejected before any damage occurs.

The right panel: models are decent at writing code. They are consistently bad at tracking exact file state across a long context. Moving that responsibility into the tool is the fix. You do not need a better model; you need a better constraint.

---

## 09 · Policy (Hook + Memory)

**~1.5 min**

The hook is a `UserPromptSubmit` handler in `.claude/settings.json`. It fires before every prompt and injects routing context.

Walk through the code block. When the prompt contains words like "find", "where", "impact", "architecture", or "refactor", the hook prepends context that routes the agent toward the right tools in the right order: map first, distill second, exact read before edit, memory at the end. No tool call — just injected text that shapes how the agent starts.

AgentMemory is the persistence layer. The good/bad memory cards are the policy:
- **Good**: "Auth refresh depends on SessionStore and BillingClient. Refactors must update both paths." That is a durable fact. Save it.
- **Bad**: Stack traces, guesses, every passing thought. Those are noise. Do not save them.

The memory does not make the next session smarter. It makes the next session start closer to the truth.

---

## 10 · Architecture

**~45 sec**

This is the whole ladder as a flow. Read it left to right, top to bottom.

Prompt → Graphify (map) → tldr-code (distill) → Trueline/Hashline (exact + safe) → Tests/browser/logs (verify) → AgentMemory (save).

The three tags at the bottom are the summary: cheap discovery, safe execution, reusable learning. Each node in the flow is the cheapest surface that handles its job.

No heroics. No magic. Just correct sequencing.

---

## 11 · Why Use This

**~1 min**

Four cards, four concrete wins. These are not abstract benefits — they are things you can measure:
- Fewer files opened per task.
- Fewer "agent wandered for three turns before finding the right file" sessions.
- Zero edits applied to stale line numbers (if you use the hash tools).
- Hooks and memory reduce setup time on the second session to near zero.

The question panel at the bottom is the take-home: **"Do I need a map, a function summary, exact lines, runtime evidence, or a memory from last time?"**

If the team remembers nothing else from this talk, that question is enough. It replaces the default instinct (grab the nearest large thing) with a deliberate choice of altitude.

---

## 12 · Case Study 1 — NotebookLM

**~1 min**

Three things make this combination genuinely different from "ask an LLM about your docs."

**1. Grounded sourcing.** NotebookLM is specifically designed to stay within the corpus you loaded. It will not fill gaps with training-data guesses. When it cites something, that thing is in your sources. That distinction matters when you're verifying architecture decisions or checking RFC interpretations — you need to trust the answer, not audit it.

**2. Large context means the whole corpus is in play.** Most naive RAG tools chunk documents and retrieve a few fragments, and you lose cross-document connections. NotebookLM is built to reason across the full source base — every doc, note, spec, thread — so a question like "where do auth and billing interact?" is answered against everything you loaded, not the top-3 retrieved chunks. (Don't overclaim the internals on stage — the value is "query the whole corpus," not a specific retrieval mechanism.)

**3. Persistent sources survive sessions.** An agent session expires when the conversation ends. NotebookLM sources stay loaded. Come back tomorrow, ask a follow-up, get a consistent answer against the same corpus. This is the persistence pattern from the memory slide, but applied to research rather than code context.

The agent-bouncing parallel is the framing to land: you already route verification tasks to specialists in your harness. NotebookLM is one more specialist — it just handles large-corpus synthesis and persistent inquiry instead of code analysis. Same routing pattern: question in, structured findings out, memory captures the conclusions.

Practical uses worth calling out:
- **Before an integration decision**: load all the relevant API docs, past decision threads, and RFCs. Ask "what are the failure modes I haven't considered?"
- **Before a design review**: load the spec, past review comments, and any related PRs. Generate an audio overview for the reviewer to listen to on commute.
- **Challenging your own reasoning**: describe your proposed approach, ask NotebookLM to find contradictions in the source material.

Starter script: `scripts/sync-md-html-to-txt.sh`. Preprocessing with Pandoc matters — stable filenames and clean .txt mean NotebookLM's citations are navigable.

---

## 13 · Case Study 2 — Browser Debugging

**~45 sec** (skip if short on time)

The escalation ladder on the left:
1. Inspect the code — many frontend bugs are obvious from source.
2. Bridge console logs to backend logs — a tiny script routes `window.console` to a dev-only backend endpoint. The agent reads logs without touching a browser.
3. Write a reusable script for the flow — re-prompting the same browser steps is expensive; a script runs once per invocation.
4. Use Stagehand/Browserbase — when you actually need rendered state, auth, replay, or screenshots.

The reference post (blog.fsck.com) is in the starter. The console bridge script and Stagehand example are both included.

Key point: browser automation is not the first tool, it is the last resort.

---

## 14 · Extras — Clipboard Manager

**~45 sec** (bonus material; skip if at 14:30)

The meta-point: the same discipline that applies to context applies to tools. You already pick the cheapest context surface per task — do the same with MCPs and skills.

Every MCP server that's always-on adds tool descriptions to every call, creates selection overhead, and introduces wrong-tool-for-the-job risk. Most workflows only need 2-3 active tools. For the other cases — deep refactors, specific analysis patterns, specialized personas — save the workflow as a named prompt snippet in a clipboard manager and paste it in when that task comes up.

The code block is a live example: a "refactor-analysis" snippet you'd save in Raycast or Alfred. When you start a refactor, paste it. It injects the right routing context without needing the hook to catch every keyword variation.

**Why this works:**
- Tools like Raycast snippets (`:refactor-analysis`) expand on a trigger keyword — zero friction to pull in a specialized prompt.
- Espanso works system-wide, not just in Claude Code.
- The snippet encodes the workflow, not just the goal — so a junior engineer pasting it gets the same routing discipline as a senior engineer who has internalized it.

Connect this back to the "policy" slide: the hook automates routing for common patterns. Clipboard snippets handle the long tail of less-frequent but high-value workflows. Both serve the same purpose: make the right context choice the default, not the exceptional.

---

## 15 · Take Home

**~1 min**

The starter is bundled in this deck under `slides/context-optimization/assets/`. No install scripts run automatically; nothing writes outside the starter folder by default.

Two entry points:
- `node scripts/doctor.mjs` — checks that dependencies are installed.
- `node hooks/user-prompt-submit.mjs --demo "where is auth and what breaks if I refactor it?"` — runs the hook logic against a sample prompt and prints what it would inject.

The optional `bash scripts/sync-md-html-to-txt.sh --once` produces a Drive-ready corpus in `.starter-output/drive-context/`.

**Download the zip before leaving** — the button on the left works directly from the slide.

---

## 16 · Appendix — Caveman Caveats

**~45 sec** (appendix/reference slide; use when someone asks whether Caveman really saves 75%)

Short answer: yes, but only for the output side of the pipeline.

Use the slide as a guardrail against overclaiming:
- **Output verbosity** — Caveman helps here. It cuts filler, generic intros, and repetitive explanation.
- **Context amnesia** — Caveman does not help. The agent still re-reads the same files unless memory, maps, or summaries prevent it.
- **Within-prompt redundancy** — Caveman does not help. System rules, schemas, tool descriptions, and boilerplate are still in the input.

Pipeline math: if the request is dominated by input tokens, even a large output reduction may only save 5–10% end-to-end. It is still worth doing for chatty agents, but it is not a whole-pipeline compression strategy.

Fidelity risk: Caveman is a behavior constraint, not a semantic compression algorithm. There is no fidelity gate proving that the short answer retained all logic, formatting, and edge-case handling. The failure mode is "truncation syndrome" — the answer gets terse enough to satisfy the style and drops something important.

Reference framing: Agyemang et al. (2026), *Entropy Gate* (arXiv:2606.03739), is an entropy-based token-compression method — 40–60% on prompts, up to ~90% stacked — that prunes low-information *input* tokens. Cite it for the general principle: real pipeline savings come from input-side pruning, dedupe, memory, or LLMLingua/Entropy-Gate-style compression. Caveman is the output-only point solution; the paper does not name it.

---

## 17 · Receipts

**~30 sec** (reference slide, not primary content)

Each card states exactly what the named source's README says about tool capabilities. No extrapolation.

Point this out if someone challenges a claim: "The Graphify README says X" — not "I believe X." That distinction matters for tools people are considering adopting.

Note on the Stagehand/NotebookLM card: notebooklm-py is explicitly unofficial and uses undocumented Google APIs. If stability matters, test it before relying on it in a production hook.

All repo paths and the arXiv reference were fact-checked before this deck shipped (final round): every GitHub repo resolves and matches its claim, and arXiv:2606.03739 (Agyemang et al., "Entropy Gate", submitted 2026-06-02) exists.

---

## 18 · Close

**~30 sec**

Return to the single line: **"Context is not a pile. It is a route."**

The ladder: compress → map → distill → localize → edit safely → remember. Six steps. The hook automates the routing. The memory makes it cheaper over time.

Leave time for questions. The most common ones:
- "What harness does this work with?" — Any. The principles are harness-agnostic; the specific tools (Graphify, tldr-code, Trueline) work anywhere you can run a CLI or MCP server.
- "How much does this actually save?" — Varies by codebase. The biggest wins are on large repos where naive context loading costs 50–100k tokens per session. With the ladder, the same task often costs 5–15k.
- "Is the hook safe to run on all prompts?" — Yes; it injects context but does not block or modify the prompt. It is opt-out, not opt-in, by design.

---

## Timing Guide

| Slide | Label | Target |
|---|---|---|
| 01 | Cover | 1:00 |
| 02 | Problem | 1:00 |
| 03 | Principle | 1:30 |
| 04 | Compress | 0:45 |
| 05 | Headroom Fit | 0:45 |
| 06 | Map | 1:00 |
| 07 | Distill | 1:00 |
| 08 | Execute | 1:00 |
| 09 | Policy | 1:30 |
| 10 | Architecture | 0:45 |
| 11 | Why Use This | 1:00 |
| 12 | Case Study 1 — NotebookLM | 1:00 |
| 13 | Case Study 2 — Browser | 0:45 |
| 14 | Extras | 0:45 |
| 15 | Take Home | 1:00 |
| 16 | Caveman Caveats | 0:45 |
| 17 | Receipts | 0:30 |
| 18 | Close | 0:30 |
| | **Total** | **16:30** |

Slides 05, 12, 14, and 16 are skippable if running long — mark them mentally as "if time allows." Slides 03 and 09 carry the most conceptual weight; protect their time.
