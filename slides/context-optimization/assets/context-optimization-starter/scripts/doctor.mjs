#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const required = [
  { bin: 'node', why: 'Runs this starter kit and hook.' },
  { bin: 'graphify', why: 'Builds and queries a repo knowledge graph.' },
  { bin: 'tldr', why: 'Produces structure, impact, calls, dead-code, and health summaries.' },
  { bin: 'rtk', why: 'Compresses noisy shell output before the agent sees it.' }
];

const optional = [
  { bin: 'trueline-mcp', why: 'Hash-verified read/edit tools for MCP clients.' },
  { bin: 'agentmemory', why: 'Persistent cross-session memory server or CLI.' },
  { bin: 'headroom', why: 'Optional live context compression proxy/wrapper for noisy agent sessions.' },
  { bin: 'pandoc', why: 'Converts Markdown/HTML into plain text for NotebookLM.' },
  { bin: 'entr', why: 'Watches files and reruns corpus sync.' },
  { bin: 'notebooklm', why: 'Uploads or manages NotebookLM notebooks from CLI.' }
];

let missingRequired = 0;
printSection('Required');
for (const tool of required) {
  const found = which(tool.bin);
  if (!found) missingRequired += 1;
  printTool(tool, found);
}

printSection('Optional case-study tools');
for (const tool of optional) printTool(tool, which(tool.bin));

printSection('Install links');
console.log('graphify:      https://github.com/safishamsi/graphify');
console.log('tldr-code:     https://github.com/parcadei/tldr-code');
console.log('rtk:           https://github.com/rtk-ai/rtk');
console.log('headroom:      https://github.com/chopratejas/headroom');
console.log('trueline-mcp:  https://github.com/rjkaes/trueline-mcp');
console.log('agentmemory:   https://github.com/rohitg00/agentmemory');
console.log('notebooklm-py: https://github.com/teng-lin/notebooklm-py');
console.log('stagehand:     https://github.com/browserbase/stagehand');

if (missingRequired > 0) {
  console.log(`\n${missingRequired} required tool(s) missing. The hook still works; install tools before using the full ladder.`);
} else {
  console.log('\nCore tools available. Try: node hooks/user-prompt-submit.mjs --demo "impact of changing auth middleware"');
}

function which(bin) {
  const command = process.platform === 'win32' ? 'where' : 'which';
  const result = spawnSync(command, [bin], { encoding: 'utf8' });
  return result.status === 0 ? result.stdout.trim().split('\n')[0] : '';
}

function printSection(title) {
  console.log(`\n## ${title}`);
}

function printTool(tool, path) {
  const mark = path ? 'found ' : 'missing';
  const location = path ? ` (${path})` : '';
  console.log(`${tool.bin.padEnd(14)} ${mark}${location}`);
  console.log(`  ${tool.why}`);
}
