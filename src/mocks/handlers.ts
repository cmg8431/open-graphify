import { rest } from 'msw';

import { exampleHTML } from './fixtures';

export const handlers = [
  rest.get('http://example.com', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.set('Content-Type', 'text/html'),
      ctx.body(exampleHTML),
    );
  }),
];
