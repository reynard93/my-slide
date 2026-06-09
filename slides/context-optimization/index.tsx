import type { CSSProperties, ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';

const starterZipUrl = new URL('./assets/context-optimization-starter.zip', import.meta.url).href;
const implementationNotesUrl = new URL('./assets/implementation-notes.html', import.meta.url).href;

export const design: DesignSystem = {
  palette: { bg: '#101418', text: '#f6efe1', accent: '#7dd3fc' },
  fonts: {
    display: 'Avenir Next, Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    body: 'Avenir Next, Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  },
  typeScale: { hero: 156, body: 34 },
  radius: 28,
};

const ink = '#f6efe1';
const muted = '#98a3ad';
const soft = '#cbd5df';
const panel = '#171d23';
const line = '#34404b';
const cyan = '#7dd3fc';
const lime = '#a7f3d0';
const amber = '#f8d37a';
const rose = '#fda4af';
const purple = '#c4b5fd';

const fill: CSSProperties = {
  width: '100%',
  height: '100%',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  position: 'relative',
  overflow: 'hidden',
};

const mono: CSSProperties = {
  fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontFamily: 'var(--osd-font-display)',
  fontSize: 76,
  lineHeight: 1.05,
  letterSpacing: '-0.04em',
  fontWeight: 850,
};

const smallCaps: CSSProperties = {
  color: cyan,
  fontSize: 22,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  fontWeight: 800,
};

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: muted,
        fontSize: 22,
      }}
    >
      <span>context optimization for coding agents</span>
      <span style={mono}>{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </div>
  );
};

const Shell = ({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) => (
  <section style={{ ...fill, padding: '86px 120px 120px' }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 34 }}>
      <h2 style={{ ...titleStyle, flex: 1 }}>{title}</h2>
      <span
        style={{
          ...mono,
          color: cyan,
          border: `1px solid ${line}`,
          background: '#0b0f13',
          borderRadius: 999,
          padding: '12px 18px',
          fontSize: 22,
          whiteSpace: 'nowrap',
        }}
      >
        {eyebrow}
      </span>
    </div>
    <div style={{ marginTop: 46 }}>{children}</div>
    <Footer />
    <GridMist />
  </section>
);

const GridMist = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background:
        'linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
      backgroundSize: '80px 80px',
      maskImage: 'radial-gradient(circle at 80% 20%, black, transparent 58%)',
    }}
  />
);

const Tag = ({ children, color = cyan }: { children: ReactNode; color?: string }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      border: `1px solid ${color}`,
      borderRadius: 999,
      padding: '9px 16px',
      color,
      fontSize: 22,
      fontWeight: 800,
      letterSpacing: '0.02em',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </span>
);

const Card = ({ title, body, color = cyan, wide = false }: { title: string; body: string; color?: string; wide?: boolean }) => (
  <div
    style={{
      background: panel,
      border: `1px solid ${line}`,
      borderRadius: 'var(--osd-radius)',
      padding: 34,
      minHeight: wide ? 250 : 230,
      boxShadow: '0 24px 80px rgba(0,0,0,0.20)',
    }}
  >
    <div style={{ color, fontSize: 30, fontWeight: 850, letterSpacing: '-0.02em' }}>{title}</div>
    <p style={{ margin: '22px 0 0', color: soft, fontSize: 29, lineHeight: 1.45 }}>{body}</p>
  </div>
);

const ToolCard = ({ name, job, link, color }: { name: string; job: string; link: string; color: string }) => (
  <div
    style={{
      background: panel,
      border: `1px solid ${line}`,
      borderRadius: 24,
      padding: 26,
      minHeight: 160,
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, alignItems: 'baseline' }}>
      <div style={{ color, fontSize: 30, fontWeight: 850 }}>{name}</div>
      <div style={{ ...mono, color: muted, fontSize: 19 }}>{link}</div>
    </div>
    <div style={{ marginTop: 18, color: soft, fontSize: 25, lineHeight: 1.34 }}>{job}</div>
  </div>
);

const LadderStep = ({ number, name, job, color }: { number: string; name: string; job: string; color: string }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '86px 1fr',
      gap: 24,
      alignItems: 'start',
      padding: '24px 0',
      borderBottom: `1px solid ${line}`,
    }}
  >
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: 18,
        display: 'grid',
        placeItems: 'center',
        background: color,
        color: '#0d1117',
        fontSize: 30,
        fontWeight: 900,
      }}
    >
      {number}
    </div>
    <div>
      <div style={{ fontSize: 34, fontWeight: 850, letterSpacing: '-0.02em' }}>{name}</div>
      <div style={{ marginTop: 8, color: soft, fontSize: 27, lineHeight: 1.34 }}>{job}</div>
    </div>
  </div>
);

const CodeBlock = ({ children, size = 25 }: { children: string; size?: number }) => (
  <pre
    style={{
      ...mono,
      margin: 0,
      whiteSpace: 'pre-wrap',
      background: '#0b0f13',
      border: `1px solid ${line}`,
      borderRadius: 22,
      color: '#d8e2ec',
      fontSize: size,
      lineHeight: 1.35,
      padding: 28,
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.02)',
    }}
  >
    {children}
  </pre>
);

const FlowNode = ({ label, detail, color = cyan }: { label: string; detail: string; color?: string }) => (
  <div
    style={{
      background: panel,
      border: `1px solid ${color}`,
      borderRadius: 24,
      padding: 24,
      minHeight: 135,
    }}
  >
    <div style={{ color, fontSize: 28, fontWeight: 850 }}>{label}</div>
    <div style={{ marginTop: 12, color: soft, fontSize: 23, lineHeight: 1.28 }}>{detail}</div>
  </div>
);

const SourceReceipt = ({ tool, fact, source, color }: { tool: string; fact: string; source: string; color: string }) => (
  <div
    style={{
      background: panel,
      border: `1px solid ${line}`,
      borderRadius: 24,
      padding: 26,
      minHeight: 170,
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, alignItems: 'center' }}>
      <div style={{ color, fontSize: 30, fontWeight: 850 }}>{tool}</div>
      <div style={{ ...mono, color: muted, fontSize: 19 }}>{source}</div>
    </div>
    <div style={{ marginTop: 16, color: soft, fontSize: 24, lineHeight: 1.32 }}>{fact}</div>
  </div>
);

const Arrow = () => <div style={{ color: muted, fontSize: 42, fontWeight: 300, textAlign: 'center' }}>→</div>;

const Cover: Page = () => (
  <section
    style={{
      ...fill,
      padding: '0 120px',
      display: 'grid',
      gridTemplateColumns: '1.05fr 0.95fr',
      alignItems: 'center',
      gap: 80,
    }}
  >
    <div>
      <div style={smallCaps}>15 minute sharing · take-home starter included</div>
      <h1
        style={{
          margin: '38px 0 0',
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          lineHeight: 0.92,
          letterSpacing: '-0.04em',
          fontWeight: 900,
          maxWidth: 1040,
        }}
      >
        Context optimization for coding agents
      </h1>
      <p style={{ margin: '44px 0 0', color: soft, fontSize: 40, lineHeight: 1.28, maxWidth: 900 }}>
        Agents do better with a route, not a warehouse. Give them the map, then the street, then the exact house.
      </p>
      <div style={{ display: 'flex', gap: 16, marginTop: 46, flexWrap: 'wrap' }}>
        <Tag color={lime}>cheaper</Tag>
        <Tag color={cyan}>safer edits</Tag>
        <Tag color={amber}>less wandering</Tag>
      </div>
    </div>
    <div
      style={{
        background: panel,
        border: `1px solid ${line}`,
        borderRadius: 38,
        padding: 42,
        boxShadow: '0 40px 120px rgba(0,0,0,0.28)',
      }}
    >
      <CodeBlock size={26}>{`User prompt
  ↓
route intent
  ↓
map → distill → exact edit
  ↓
remember what mattered`}</CodeBlock>
      <p style={{ margin: '32px 0 0', color: muted, fontSize: 26, lineHeight: 1.35 }}>
        This talk is about the workflow, not one magic tool. Use the same ladder in any agent harness.
      </p>
    </div>
    <GridMist />
  </section>
);

const Problem: Page = () => (
  <Shell eyebrow="problem" title="Most agent failures are context failures.">
    <div style={{ display: 'grid', gridTemplateColumns: '0.92fr 1.08fr', gap: 34, alignItems: 'stretch' }}>
      <div style={{ background: '#0b0f13', border: `1px solid ${line}`, borderRadius: 30, padding: 36 }}>
        <div style={{ color: rose, fontSize: 34, fontWeight: 850 }}>Bad default loop</div>
        <div style={{ marginTop: 24 }}>
          <CodeBlock size={24}>{`read whole repo
paste huge logs
guess target file
edit stale lines
open browser because panic`}</CodeBlock>
        </div>
        <p style={{ color: muted, fontSize: 26, lineHeight: 1.38, margin: '28px 0 0' }}>
          The agent is not lazy. It is looking through the wrong window.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Card title="Too much text" body="Logs, files, docs, and chat arrive before the target is known." color={rose} />
        <Card title="Wrong altitude" body="Architecture gets answered from line snippets. Edits start from vague diagrams." color={amber} />
        <Card title="Stale edits" body="The file changed. The agent still edits the old mental copy." color={cyan} />
        <Card title="Slow debugging" body="Browser poking is expensive when a console bridge or script would do." color={purple} />
      </div>
    </div>
  </Shell>
);

const Principle: Page = () => (
  <Shell eyebrow="principle" title="Ask: what kind of context does this job need?">
    <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 44, alignItems: 'stretch' }}>
      <div style={{ background: panel, border: `1px solid ${line}`, borderRadius: 30, padding: 38 }}>
        <div style={{ fontSize: 42, fontWeight: 850, lineHeight: 1.12 }}>Do not start with files.</div>
        <p style={{ color: soft, fontSize: 31, lineHeight: 1.45, margin: '30px 0 0' }}>
          Start with the question. Then choose the cheapest surface that can answer it without guessing.
        </p>
        <p style={{ color: muted, fontSize: 27, lineHeight: 1.42, margin: '32px 0 0' }}>
          If that surface is not enough, move one rung down. Do not jump straight into the whole repo.
        </p>
      </div>
      <div>
        <LadderStep number="1" name="Map" job="Architecture, modules, surprising links, cross-document context." color={cyan} />
        <LadderStep number="2" name="Distill" job="Functions, classes, call graphs, reverse impact, dead code." color={lime} />
        <LadderStep number="3" name="Localize" job="Exact lines, exact symbols, current file state." color={amber} />
        <LadderStep number="4" name="Edit" job="Hash-verified patches. Reject stale context before damage." color={rose} />
        <LadderStep number="5" name="Remember" job="Keep durable decisions and root causes for the next session." color={purple} />
      </div>
    </div>
  </Shell>
);

const CompressionLayer: Page = () => (
  <Shell eyebrow="compress" title="Compression clears the noise before reasoning starts.">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      <ToolCard
        name="Caveman"
        job="Cuts agent prose. Same technical content, fewer filler words. Best when explanations are bloated."
        link="github.com/JuliusBrussee/caveman"
        color={lime}
      />
      <ToolCard
        name="RTK"
        job="Compresses shell output before the agent sees it. Good for git, tests, builds, package managers, and logs."
        link="github.com/rtk-ai/rtk"
        color={cyan}
      />
      <ToolCard
        name="Headroom"
        job="Compresses live inputs before the model: tool results, logs, RAG chunks, files, and long conversations."
        link="github.com/chopratejas/headroom"
        color={amber}
      />
    </div>
    <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 34 }}>
      <CodeBlock>{`Normal path:
tool output → model context

Headroom path:
tool output → local proxy → compressed context

If detail is needed:
retrieve original by hash`}</CodeBlock>
      <div style={{ background: panel, border: `1px solid ${line}`, borderRadius: 28, padding: 34 }}>
        <div style={{ color: amber, fontSize: 32, fontWeight: 850 }}>Rule</div>
        <p style={{ color: soft, fontSize: 31, lineHeight: 1.38, margin: '20px 0 0' }}>
          Compression is not understanding. It buys room for the tools that map, localize, verify, and remember.
        </p>
      </div>
    </div>
  </Shell>
);
const HeadroomFit: Page = () => (
  <Shell eyebrow="fit" title="Headroom wraps live context. It does not replace the map or memory.">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 34 }}>
      <div style={{ display: 'grid', gap: 22 }}>
        <ToolCard
          name="Headroom"
          job="A local proxy, wrapper, SDK, or MCP layer that compresses what the agent reads before the request reaches the model."
          link="github.com/chopratejas/headroom"
          color={amber}
        />
        <CodeBlock size={22}>{`# optional live compression layer
headroom wrap claude
headroom proxy --port 8787

Graphify  = persistent map
AgentMemory = durable recall
Headroom  = live input compression`}</CodeBlock>
      </div>
      <div style={{ display: 'grid', gap: 22 }}>
        <Card
          wide
          title="Where it helps"
          body="Long agent sessions, JSON-heavy tool results, build/test output, logs, RAG chunks, and repeated multi-tool context."
          color={lime}
        />
        <Card
          wide
          title="Tradeoff"
          body="It adds a proxy or wrapper and may require a retrieve round trip when compressed detail is too thin. Skip it for short chats or simple code edits."
          color={rose}
        />
      </div>
    </div>
  </Shell>
);


const GraphifyPage: Page = () => (
  <Shell eyebrow="map" title="Graphify is for broad navigation.">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36 }}>
      <div>
        <ToolCard
          name="Graphify"
          job="Turns code, docs, papers, images, and notes into a knowledge graph with communities, god nodes, paths, and an audit report."
          link="github.com/safishamsi/graphify"
          color={cyan}
        />
        <div style={{ marginTop: 30 }}>
          <CodeBlock>{`graphify . --no-viz

Read first:
graphify-out/GRAPH_REPORT.md

Then ask:
graphify query "how does auth reach billing?"
graphify path "Auth" "Database"
graphify explain "SessionManager"`}</CodeBlock>
        </div>
      </div>
      <div style={{ background: panel, border: `1px solid ${line}`, borderRadius: 30, padding: 36 }}>
        <div style={{ color: lime, fontSize: 34, fontWeight: 850 }}>Use it when the question says:</div>
        <div style={{ display: 'grid', gap: 18, marginTop: 28 }}>
          <Tag color={cyan}>architecture</Tag>
          <Tag color={lime}>how does this connect?</Tag>
          <Tag color={amber}>what path links A to B?</Tag>
          <Tag color={purple}>what should I read first?</Tag>
        </div>
        <p style={{ color: muted, fontSize: 27, lineHeight: 1.38, margin: '34px 0 0' }}>
          This is the map. It should reduce the number of files you open, not add another report nobody reads.
        </p>
      </div>
    </div>
  </Shell>
);

const TldrPage: Page = () => (
  <Shell eyebrow="distill" title="tldr-code is for function-level facts.">
    <div style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 34 }}>
      <div style={{ display: 'grid', gap: 22 }}>
        <ToolCard
          name="tldr-code"
          job="Tree-sitter based summaries: structure, calls, reverse impact, dead code, health, hotspots. JSON by default."
          link="github.com/parcadei/tldr-code"
          color={lime}
        />
        <CodeBlock>{`tldr structure src --format json
tldr impact refreshSession src --format json
tldr calls src --format json
tldr dead src --format json
tldr health src --format json`}</CodeBlock>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Card title="Before opening file" body="Find the symbol, its callers, and the likely blast radius." color={cyan} />
        <Card title="Before refactor" body="Ask what breaks and which hubs depend on it." color={amber} />
        <Card title="Before cleanup" body="Check dead code and complexity instead of guessing." color={purple} />
        <Card title="After Graphify" body="Use it on the hit. Global map first, function facts second." color={lime} />
      </div>
    </div>
  </Shell>
);

const SafeEdits: Page = () => (
  <Shell eyebrow="execute" title="Exact edits need proof, not vibes.">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 34 }}>
      <ToolCard
        name="Trueline MCP"
        job="Reads lines with hash refs. Edits only apply if the same hashed lines still exist."
        link="github.com/rjkaes/trueline-mcp"
        color={rose}
      />
      <ToolCard
        name="Hashline / Oh My Pi"
        job="Hash-anchored patch language. The agent names the lines it read; stale anchors are rejected."
        link="github.com/can1357/oh-my-pi"
        color={amber}
      />
    </div>
    <div style={{ marginTop: 42, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 34 }}>
      <CodeBlock>{`Bad edit habit:
"Replace line 45 with this."

Safe edit habit:
read exact range → copy hash/ref → edit

If file changed:
edit rejected before write`}</CodeBlock>
      <div style={{ background: panel, border: `1px solid ${line}`, borderRadius: 28, padding: 34 }}>
        <div style={{ color: cyan, fontSize: 34, fontWeight: 850 }}>Why this matters</div>
        <p style={{ color: soft, fontSize: 31, lineHeight: 1.4, margin: '20px 0 0' }}>
          Models are decent at writing code. They are bad at remembering exact file state across turns. Hashes move that risk into the tool.
        </p>
      </div>
    </div>
  </Shell>
);

const MemoryAndHook: Page = () => (
  <Shell eyebrow="policy" title="The hook turns tool choice into a habit.">
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 34 }}>
      <CodeBlock size={22}>{`# .claude/settings.json · UserPromptSubmit hook
# fires before every prompt; injects routing context

if prompt contains:
  find / where / impact / architecture / refactor

prepend context:
  ← map:     graphify query/path/explain
  ← distill: tldr structure/impact/calls/health
  ← exact:   trueline read → hash → edit
  ← memory:  agentmemory recall + remember

no tool call — context injected into prompt`}</CodeBlock>
      <div style={{ display: 'grid', gap: 22 }}>
        <ToolCard
          name="AgentMemory"
          job="Stores decisions, root causes, and repo conventions so the next session does not rediscover them."
          link="github.com/rohitg00/agentmemory"
          color={purple}
        />
        <Card
          wide
          title="Good memory"
          body="Auth refresh depends on SessionStore and BillingClient. Refactors must update both paths."
          color={lime}
        />
        <Card wide title="Bad memory" body="Temporary stack traces, guesses, secrets, or every passing thought." color={rose} />
      </div>
    </div>
  </Shell>
);

const ComplementaryArchitecture: Page = () => (
  <Shell eyebrow="architecture" title="The tools are complementary, not competing.">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
      <FlowNode label="Headroom" detail="Optional live compression. Use when logs, JSON, RAG, or long sessions dominate tokens." color={amber} />
      <FlowNode label="Graphify" detail="Persistent map. Communities, paths, concepts, cross-file or cross-doc links." color={cyan} />
      <FlowNode label="tldr-code" detail="Function-level distill. Structure, calls, reverse impact, health." color={lime} />
      <FlowNode label="Trueline / Hashline" detail="Exact context and stale-safe edits. Hashes reject wrong file state." color={rose} />
      <FlowNode label="Tests / browser / logs" detail="Verify the behavior that changed. Do not stop at a plausible patch." color={soft} />
      <FlowNode label="AgentMemory" detail="Durable recall. Save decisions and root causes for future sessions." color={purple} />
    </div>
    <div style={{ marginTop: 40, display: 'flex', gap: 18 }}>
      <Tag color={amber}>live compression</Tag>
      <Tag color={cyan}>broad map</Tag>
      <Tag color={lime}>cheap discovery</Tag>
      <Tag color={rose}>safe execution</Tag>
      <Tag color={purple}>reusable learning</Tag>
    </div>
  </Shell>
);

const CavemanCaveats: Page = () => (
  <Shell eyebrow="appendix" title="Caveman saves output tokens, not context.">
    <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 34, alignItems: 'stretch' }}>
      <div style={{ display: 'grid', gap: 22 }}>
        <Card
          title="What it fixes"
          body="Output verbosity: filler, generic intros, repetitive explanations. Useful when replies are the noisy part."
          color={lime}
        />
        <Card
          title="What it does not fix"
          body="Input prompts, system rules, repeated file reads, and tool descriptions stay exactly as large."
          color={rose}
        />
      </div>
      <div style={{ background: panel, border: `1px solid ${line}`, borderRadius: 30, padding: 34 }}>
        <div style={{ color: amber, fontSize: 32, fontWeight: 850 }}>Caveats from the compression literature</div>
        <div style={{ display: 'grid', gap: 20, marginTop: 24 }}>
          <div style={{ color: soft, fontSize: 28, lineHeight: 1.36 }}>
            <strong style={{ color: ink }}>Pipeline math:</strong> if input dominates, a big output cut can be a small total-bill cut.
          </div>
          <div style={{ color: soft, fontSize: 28, lineHeight: 1.36 }}>
            <strong style={{ color: ink }}>No fidelity gate:</strong> style rules do not prove semantic preservation the way LLMLingua or Entropy Gate-style methods try to.
          </div>
          <div style={{ color: soft, fontSize: 28, lineHeight: 1.36 }}>
            <strong style={{ color: ink }}>Failure mode:</strong> strict brevity can drop logic, formatting, or edge-case handling to satisfy the style.
          </div>
        </div>
        <div style={{ ...mono, color: muted, fontSize: 20, lineHeight: 1.35, marginTop: 26 }}>
          Agyemang et al. (2026), arXiv:2606.03739 ("Entropy Gate"): entropy-based input pruning reaches 40–60% (up to ~90% stacked). Style rules like Caveman only trim the output side.
        </div>
</div>
</div>
</Shell>
);

const SourceReceipts: Page = () => (
  <Shell eyebrow="receipts" title="Fact check the talk. Keep the claims boring.">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
      <SourceReceipt
        tool="Graphify"
        fact="Maps code, docs, PDFs, images, and videos into graph.html, GRAPH_REPORT.md, and graph.json."
        source="safishamsi/graphify"
        color={cyan}
      />
      <SourceReceipt
        tool="tldr-code"
        fact="Reports structure, calls, impact, dead code, health, security, and quality. JSON is the default."
        source="parcadei/tldr-code"
        color={lime}
      />
      <SourceReceipt
        tool="Trueline"
        fact="Provides AST outlines, targeted reads, hash-verified edits, atomic batches, and stale-edit rejection."
        source="rjkaes/trueline-mcp"
        color={amber}
      />
      <SourceReceipt
        tool="Compression"
        fact="RTK trims shell output; Caveman trims replies; Headroom compresses live tool/log/RAG/file context before the LLM."
        source="rtk · caveman · headroom"
        color={rose}
      />
      <SourceReceipt
        tool="AgentMemory"
        fact="Stores persistent coding-agent memory through MCP, hooks, REST, and multiple agent clients."
        source="rohitg00/agentmemory"
        color={purple}
      />
      <SourceReceipt
        tool="Stagehand / NotebookLM"
        fact="Stagehand exposes act, extract, observe, and agent. notebooklm-py is unofficial and uses undocumented Google APIs."
        source="Stagehand · notebooklm-py"
        color={cyan}
      />
    </div>
  </Shell>
);

const Extras: Page = () => (
  <Shell eyebrow="extras" title="Don't pile skills. Pull what this task needs.">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 34 }}>
      <div style={{ display: 'grid', gap: 22, alignContent: 'start' }}>
        <div style={{ background: panel, border: `1px solid ${cyan}`, borderRadius: 30, padding: 34 }}>
          <div style={{ color: cyan, fontSize: 32, fontWeight: 850 }}>Clipboard manager for prompt fragments</div>
          <p style={{ color: soft, fontSize: 27, lineHeight: 1.42, margin: '18px 0 0' }}>
            Save complex prompts, MCP invocations, and specialized workflows as named snippets.
            Paste on demand. Nothing always-on that this session does not need.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Tag color={lime}>Raycast snippets</Tag>
          <Tag color={cyan}>Alfred workflows</Tag>
          <Tag color={amber}>Espanso</Tag>
          <Tag color={purple}>Pasta / Clipy</Tag>
        </div>
        <div style={{ background: panel, border: `1px solid ${line}`, borderRadius: 30, padding: 34 }}>
          <div style={{ color: rose, fontSize: 30, fontWeight: 850 }}>Every always-on MCP has a cost</div>
          <p style={{ color: soft, fontSize: 27, lineHeight: 1.38, margin: '16px 0 0' }}>
            Tool descriptions consume tokens per call. More active tools means more selection overhead and more chances to pick wrong.
          </p>
        </div>
      </div>
      <div style={{ display: 'grid', gap: 22, alignContent: 'start' }}>
        <CodeBlock>{`# clipboard snippet: "refactor-analysis"
# paste at start of any refactor prompt

Map first:
  graphify query "what depends on [target]?"

Blast radius:
  tldr impact [symbol] src --format json

Read exact state before editing:
  trueline read → hash → reject stale anchors

Save root cause after:
  agentmemory remember "[finding]"`}</CodeBlock>
        <div style={{ background: panel, border: `1px solid ${line}`, borderRadius: 30, padding: 34 }}>
          <div style={{ color: amber, fontSize: 30, fontWeight: 850 }}>Same discipline as context</div>
          <p style={{ color: soft, fontSize: 27, lineHeight: 1.38, margin: '16px 0 0' }}>
            Pick the cheapest context surface per task. Apply the same logic to tools: activate only what this job needs.
          </p>
        </div>
      </div>
    </div>
  </Shell>
);

const StarterRepo: Page = () => (
  <Shell eyebrow="take home" title="Starter repo included in this deck.">
    <div style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 34 }}>
      <div style={{ background: panel, border: `1px solid ${line}`, borderRadius: 30, padding: 38 }}>
        <div style={{ color: cyan, fontSize: 34, fontWeight: 850 }}>Path in this slide folder</div>
        <CodeBlock size={22}>{`slides/context-optimization/assets/
  context-optimization-starter/
  context-optimization-starter.zip`}</CodeBlock>
        <a
          href={starterZipUrl}
          download="context-optimization-starter.zip"
          style={{
            display: 'inline-flex',
            marginTop: 26,
            color: '#0d1117',
            background: cyan,
            borderRadius: 999,
            padding: '16px 24px',
            fontSize: 26,
            fontWeight: 850,
            textDecoration: 'none',
          }}
        >
          Download starter zip
        </a>
        <a
          href={implementationNotesUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            marginTop: 16,
            color: cyan,
            border: `1px solid ${cyan}`,
            borderRadius: 999,
            padding: '14px 22px',
            fontSize: 24,
            fontWeight: 850,
            textDecoration: 'none',
          }}
        >
          Open implementation notes
        </a>
      </div>
      <div>
        <CodeBlock>{`node scripts/doctor.mjs
node hooks/user-prompt-submit.mjs --demo \
  "where is auth and what breaks if I refactor it?"

Optional, still local if installed:
headroom proxy --port 8787
bash scripts/sync-md-html-to-txt.sh --once

Output:
.starter-output/drive-context/`}</CodeBlock>
        <p style={{ color: muted, fontSize: 27, lineHeight: 1.4, margin: '30px 0 0' }}>
          No install script runs here. No global hooks. The demo writes inside the starter unless someone passes a custom path.
        </p>
      </div>
    </div>
  </Shell>
);

const NotebookCase: Page = () => (
  <Shell eyebrow="case study 1" title="NotebookLM gives you Gemini's 1M window over your full corpus.">
    <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 36 }}>
      <div style={{ display: 'grid', gap: 22, alignContent: 'start' }}>
        <div style={{ background: panel, border: `1px solid ${amber}`, borderRadius: 30, padding: 34 }}>
          <div style={{ color: amber, fontSize: 32, fontWeight: 850, lineHeight: 1.1 }}>Million-context window</div>
          <p style={{ color: soft, fontSize: 27, lineHeight: 1.42, margin: '18px 0 0' }}>
            Load the full corpus at once — docs, notes, specs, RFCs, threads.
            Ask hard questions against the whole source base, not a handful of files.
          </p>
</div>
<div style={{ background: panel, border: `1px solid ${purple}`, borderRadius: 30, padding: 34 }}>
  <div style={{ color: purple, fontSize: 32, fontWeight: 850 }}>Same pattern as agent bouncing</div>
  <p style={{ color: soft, fontSize: 27, lineHeight: 1.38, margin: '18px 0 0' }}>
    Route a hard question to a specialist. Get a structured response.
    Record durable findings in memory. NotebookLM is one more
    verification node in the harness — persistent across sessions.
  </p>
</div>
</div>
<div style={{ display: 'grid', gap: 20, alignContent: 'start' }}>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 50px 1fr', gap: 12, alignItems: 'center' }}>
  <FlowNode label="Preprocess corpus" detail="Pandoc to .txt, Drive-mirrored, stable filenames." color={cyan} />
  <Arrow />
  <FlowNode label="NotebookLM" detail="Ask, challenge, generate audio overviews, notes, briefings." color={amber} />
</div>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 50px 1fr', gap: 12, alignItems: 'center' }}>
  <FlowNode label="Agent" detail="Consumes structured findings, not raw corpus noise." color={purple} />
  <Arrow />
  <FlowNode label="Memory" detail="Persist durable conclusions. Discard the working pile." color={rose} />
</div>
<CodeBlock size={22}>{`notebooklm-py: github.com/teng-lin/notebooklm-py
pandoc:        github.com/jgm/pandoc

Use when: deep-dive research, spec review, RFC analysis,
or challenging your own reasoning across a large source base
before committing to an architecture or integration decision.

Starter: scripts/sync-md-html-to-txt.sh`}</CodeBlock>
</div>
</div>
</Shell>
);

const WebDebugCase: Page = () => (
  <Shell eyebrow="case study 2" title="Do not pay browser-MCP prices for a console log.">
    <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 34 }}>
      <div style={{ display: 'grid', gap: 18 }}>
        <LadderStep number="1" name="Inspect code" job="Many client bugs are obvious from source." color={soft} />
        <LadderStep number="2" name="Bridge logs" job="Send dev-only frontend console logs to backend logs." color={cyan} />
        <LadderStep number="3" name="Script the flow" job="Reusable script beats re-prompting the same browser steps." color={lime} />
        <LadderStep number="4" name="Use Stagehand / Browserbase" job="When rendered state, auth, replay, or visual inspection matters." color={amber} />
      </div>
      <div style={{ display: 'grid', gap: 24 }}>
        <ToolCard
          name="Stagehand"
          job="Reusable AI browser automation: observe, act, extract, agent."
          link="github.com/browserbase/stagehand"
          color={lime}
        />
        <ToolCard
          name="Browserbase"
          job="Hosted sessions, replay, logs, auth, artifacts. Use when local browser state is not enough."
          link="browserbase.com/stagehand"
          color={cyan}
        />
        <CodeBlock size={22}>{`Reference:
blog.fsck.com/2025/12/02/helping-agents-debug-webapps/

Starter snippets:
frontend-console-bridge.ts
server-console-endpoint.express.ts
examples/stagehand-debug.ts`}</CodeBlock>
      </div>
    </div>
  </Shell>
);

const WhyUseThis: Page = () => (
  <Shell eyebrow="why use this" title="The win is not one tool. It is better sequencing.">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
      <Card title="Less spend" body="Fewer files, fewer logs, fewer repeated explanations." color={lime} />
      <Card title="Less wandering" body="Graph first. Function facts second. Exact lines last." color={cyan} />
      <Card title="Safer edits" body="Hash refs reject stale context before it writes." color={amber} />
      <Card title="Reusable work" body="Hooks, scripts, and memory make the next run cheaper." color={purple} />
    </div>
    <div style={{ marginTop: 48, background: panel, border: `1px solid ${line}`, borderRadius: 30, padding: 38 }}>
      <div style={{ color: rose, fontSize: 34, fontWeight: 850 }}>Say this before every agent task:</div>
      <p style={{ color: ink, fontSize: 42, lineHeight: 1.28, margin: '22px 0 0', maxWidth: 1420 }}>
        "Do I need a map, a function summary, exact lines, runtime evidence, or a memory from last time?"
      </p>
    </div>
  </Shell>
);

const Close: Page = () => (
  <section style={{ ...fill, padding: '0 120px', display: 'grid', placeItems: 'center' }}>
    <div style={{ textAlign: 'center', maxWidth: 1320 }}>
      <div style={smallCaps}>takeaway</div>
      <h2
        style={{
          margin: '34px 0 0',
          fontFamily: 'var(--osd-font-display)',
          fontSize: 122,
          lineHeight: 0.96,
          letterSpacing: '-0.04em',
          fontWeight: 900,
        }}
      >
        Context is not a pile. It is a route.
      </h2>
      <p style={{ color: soft, fontSize: 38, lineHeight: 1.34, margin: '42px auto 0', maxWidth: 1050 }}>
        Keep the ladder simple: compress live input, map, distill, localize, edit safely, remember.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginTop: 44 }}>
        <Tag color={cyan}>starter zip in deck</Tag>
        <Tag color={lime}>works with any harness</Tag>
      </div>
    </div>
    <Footer />
    <GridMist />
  </section>
);

export const meta: SlideMeta = {
  title: 'Context optimization for coding agents',
  createdAt: '2026-06-08T08:04:42.678Z',
};

export default [
  Cover,
  Problem,
  Principle,
  CompressionLayer,
  HeadroomFit,
  GraphifyPage,
  TldrPage,
  SafeEdits,
  MemoryAndHook,
  ComplementaryArchitecture,
  WhyUseThis,
  NotebookCase,
  WebDebugCase,
  Extras,
  StarterRepo,
  CavemanCaveats,
  SourceReceipts,
  Close,
] satisfies Page[];
