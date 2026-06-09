// Express-style receiver for the frontend console bridge.
// Mount only in development.

import type { Request, Response } from 'express';

type FrontendLog = {
  level?: string;
  at?: string;
  url?: string;
  args?: unknown[];
};

export function frontendLogEndpoint(req: Request, res: Response) {
  const event = req.body as FrontendLog;
  const level = normalizeLevel(event.level);
  const at = typeof event.at === 'string' ? event.at : new Date().toISOString();
  const url = typeof event.url === 'string' ? event.url : 'unknown-url';
  const args = Array.isArray(event.args) ? event.args : [];

  console[level]('[frontend]', at, url, ...args);
  res.status(204).end();
}

function normalizeLevel(level: unknown): 'log' | 'info' | 'warn' | 'error' | 'debug' {
  switch (level) {
    case 'info':
    case 'warn':
    case 'error':
    case 'debug':
      return level;
    default:
      return 'log';
  }
}
