// Dev-only frontend-to-backend console bridge.
// Load this once in development. Do not ship it in production.

type ConsoleLevel = 'log' | 'info' | 'warn' | 'error' | 'debug';

const endpoint = '/__dev/frontend-log';
const levels: ConsoleLevel[] = ['log', 'info', 'warn', 'error', 'debug'];
let sending = false;

export function installFrontendConsoleBridge() {
  if (typeof window === 'undefined') return;
  if ((window as unknown as { __frontendConsoleBridge?: boolean }).__frontendConsoleBridge) return;
  (window as unknown as { __frontendConsoleBridge?: boolean }).__frontendConsoleBridge = true;

  for (const level of levels) {
    const original = console[level].bind(console);
    console[level] = (...args: unknown[]) => {
      original(...args);
      if (sending) return;
      sending = true;
      send(level, args).finally(() => {
        sending = false;
      });
    };
  }
}

async function send(level: ConsoleLevel, args: unknown[]) {
  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        level,
        at: new Date().toISOString(),
        url: location.href,
        args: args.map(serialize)
      })
    });
  } catch {
    // Never log bridge transport failures through console.*.
    // That would recurse forever when the backend is down.
  }
}

function serialize(value: unknown) {
  if (value instanceof Error) {
    return { name: value.name, message: value.message, stack: value.stack };
  }
  if (typeof value === 'string') return value;
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    return String(value);
  }
}
