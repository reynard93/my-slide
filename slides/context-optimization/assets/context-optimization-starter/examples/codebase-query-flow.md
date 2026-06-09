# Codebase query flow

Use this when an agent asks, "Where is X?", "What breaks if I change Y?", or "Explain this architecture."

## 0. Optional live compression

Use this only when live context is the bottleneck:

```bash
headroom wrap claude
headroom proxy --port 8787
```

Good fit: logs, JSON-heavy tool results, RAG chunks, build/test output, or long multi-tool sessions.
Tradeoff: adds a proxy/wrapper and may need a retrieval round trip when compressed detail is too thin. Skip it for short chats and direct code edits.

## 1. Check for an existing map

```bash
# Human action: open graphify-out/GRAPH_REPORT.md if it exists.
# Agent action: summarize God Nodes, surprising connections, and suggested questions.
```

If no graph exists:

```bash
graphify . --no-viz
```

For a narrow question:

```bash
graphify query "how does authentication reach the database?"
graphify path "AuthMiddleware" "UserRepository"
graphify explain "AuthMiddleware"
```

## 2. Distill the code target

```bash
tldr structure src --format json
tldr impact AuthMiddleware src --format json
tldr calls src --format json
tldr dead src --format json
tldr health src --format json
```

Stop here if the task is explanation-only.

## 3. Read exact lines before editing

Use your harness equivalent:

```text
trueline_outline target-file
trueline_read target-file:start-end
trueline_edit with copied hash refs
```

or:

```text
read target-file:start-end
hashline edit with copied file tag and original line numbers
```

## 4. Save the durable result

Only save facts that should survive the session:

```text
agentmemory remember "This repo routes auth through AuthMiddleware before UserRepository. Refactors must update the token refresh path too."
```

Do not save temporary stack traces, secrets, or guesses.
