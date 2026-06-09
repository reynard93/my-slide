import { Stagehand } from '@browserbasehq/stagehand';

// Use this when logs and deterministic scripts are not enough.
// Stagehand gives you observe/act/extract primitives you can reuse in code.

const stagehand = new Stagehand({
  env: process.env.BROWSERBASE_API_KEY ? 'BROWSERBASE' : 'LOCAL',
  model: process.env.STAGEHAND_MODEL ?? 'google/gemini-3-flash-preview'
});

await stagehand.init();

try {
  const page = stagehand.context.pages()[0];
  await page.goto(process.env.DEBUG_URL ?? 'http://localhost:5173');

  const observations = await stagehand.observe('Find navigation, error banners, and primary actions on the page.');
  console.log(JSON.stringify(observations, null, 2));

  await stagehand.act('Open the failing flow but do not submit destructive forms.');

  const state = await stagehand.extract({
    instruction: 'Extract visible errors, route, selected tab, and the main call-to-action text.',
    schema: {
      type: 'object',
      properties: {
        route: { type: 'string' },
        visibleErrors: { type: 'array', items: { type: 'string' } },
        selectedTab: { type: 'string' },
        primaryAction: { type: 'string' }
      },
      required: ['route', 'visibleErrors', 'selectedTab', 'primaryAction']
    }
  });

  console.log(JSON.stringify(state, null, 2));
} finally {
  await stagehand.close();
}
