# Context optimization starter

This repo is a take-home kit for wiring a coding agent to use cheaper, safer context before it reads half the codebase.

The idea is simple:

1. Compress noisy output or live inputs.
2. Map the system before opening files.
3. Distill the target function or call chain.
4. Read and edit only verified lines.
5. Save durable decisions so the next session starts warm.

Use the tools you already have. The names here match Reynard's stack, but the ladder works in Claude Code, Codex, Cursor, Windsurf, OpenCode, or any harness with hooks and MCP tools.

The defaults are isolated. Demo commands write only inside this starter folder, under `.starter-output/`. Install commands are links for humans to run manually.

## Quick start

```bash
node scripts/doctor.mjs
node hooks/user-prompt-submit.mjs --demo "where is the auth flow and what breaks if I refactor it?"
```

If your agent supports a UserPromptSubmit-style hook, wire `hooks/user-prompt-submit.mjs` into it. The hook does not call tools. It only injects a routing reminder when the prompt asks for search, architecture, impact, or refactoring.

## Default routing policy

```text
0. rtk / caveman / headroom
   Compress noisy command output, agent prose, or live tool/log/RAG inputs.
   Tradeoff: Headroom adds a proxy/wrapper and may need retrieval round trips.

1. graphify query/path/explain
   Broad navigation. Read graphify-out/GRAPH_REPORT.md first if it exists.

2. tldr-code structure/impact/calls/dead/health
   Function-level facts after graphify has narrowed the target.

3. trueline or hashline edit
   Exact, hash-verified reads and edits. No stale line edits.

4. agentmemory remember
   Save decisions, root causes, and repo conventions.
```

RTK, Caveman, and Headroom are the compression layer around the workflow. RTK reduces command output, Caveman reduces agent prose, and Headroom compresses live inputs before the model. They do not replace structural tools or durable memory.

## Files

```text
hooks/user-prompt-submit.mjs        Prompt intent router
hooks/user-prompt-submit.sh         Shell wrapper for hook systems
scripts/doctor.mjs                  Local tool availability check
scripts/sync-md-html-to-txt.sh      Optional NotebookLM / Drive corpus sync
snippets/frontend-console-bridge.ts Dev-only browser console bridge
snippets/server-console-endpoint.express.ts Backend log receiver snippet
examples/stagehand-debug.ts         Browserbase Stagehand debug skeleton
examples/codebase-query-flow.md     Example agent workflow
```

## Case study options

NotebookLM corpus:

```bash
bash scripts/sync-md-html-to-txt.sh --once
```

Web debugging:

- Start with source inspection and server logs.
- Add the console bridge when frontend runtime logs matter.
- Use Stagehand or Browserbase when you need rendered UI state, auth/session replay, or reusable browser automation.

## Install links

- Caveman: https://github.com/JuliusBrussee/caveman
- RTK: https://github.com/rtk-ai/rtk
- Headroom: https://github.com/chopratejas/headroom
- Graphify: https://github.com/safishamsi/graphify
- tldr-code: https://github.com/parcadei/tldr-code
- Trueline MCP: https://github.com/rjkaes/trueline-mcp
- Oh My Pi / Hashline: https://github.com/can1357/oh-my-pi
- AgentMemory: https://github.com/rohitg00/agentmemory
- notebooklm-py: https://github.com/teng-lin/notebooklm-py
- Stagehand: https://github.com/browserbase/stagehand
- Browserbase: https://www.browserbase.com/stagehand
