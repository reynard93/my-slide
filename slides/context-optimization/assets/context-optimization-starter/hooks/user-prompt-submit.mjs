#!/usr/bin/env node
import { readFileSync } from 'node:fs';

const args = process.argv.slice(2);
const demoIndex = args.indexOf('--demo');
const prompt = demoIndex >= 0 ? args.slice(demoIndex + 1).join(' ') : readStdinPrompt();
const promptLc = prompt.toLowerCase();

if (!promptLc.trim()) process.exit(0);

const patterns = [
  /\bfind\b/,
  /\bwhere\b/,
  /\bsearch\b/,
  /\blocate\b/,
  /how does/,
  /how is/,
  /how do/,
  /what does/,
  /what is/,
  /\btrace\b/,
  /\bimpact\b/,
  /\barchitecture\b/,
  /\bexplain\b/,
  /\banalyze\b/,
  /\bcallers\b/,
  /\bcalls\b/,
  /\bdepends\b/,
  /\bcoupling\b/,
  /\borphan\b/,
  /dead\s+code/,
  /\brefactor\b/,
  /\bmodule\b/,
  /\bstructure\b/,
  /\bhub\b/
];

if (!patterns.some((pattern) => pattern.test(promptLc))) process.exit(0);

const additionalContext = [
  'Code-search pipeline reminder: prefer in order:',
  '  0. Optional compression: rtk/caveman/headroom for noisy command output, prose, tool results, logs, RAG, or long sessions.',
  '     Tradeoff: Headroom adds a proxy/wrapper and may need retrieval round trips; skip short/simple tasks.',
  '  1. graphify query/path/explain (broad nav). Read graphify-out/GRAPH_REPORT.md first if exists.',
  '  2. tldr-code structure/impact/calls/dead/health on hit (tree-sitter fn-level, JSON output).',
  '  3. trueline/hashline read+edit for exact, stale-safe changes.',
  '  4. agentmemory remember on durable findings (decisions, root causes, repo conventions).',
  'Skip step if N/A. Raw grep/find/read = last resort.'
].join('\n');

process.stdout.write(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: 'UserPromptSubmit',
    additionalContext
  }
}));
process.stdout.write('\n');

function readStdinPrompt() {
  const input = readFileSync(0, 'utf8');
  try {
    const payload = JSON.parse(input);
    return typeof payload.prompt === 'string' ? payload.prompt : '';
  } catch {
    return input;
  }
}
