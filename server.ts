import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: 'custom',
});

const app = express();
app.use(vite.middlewares);
app.use('*', async (request: Request, response: Response, next: NextFunction) => {
  const url = request.originalUrl;
  try {
    const template = await vite.transformIndexHtml(
      request.originalUrl,
      fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
    );

    const { render } = await vite.ssrLoadModule('./src/entryServer.tsx');
    const [{ pipe }, store] = await render(url, {
      onShellReady() {
        response.write(template.split(`<!--ssr-outlet-->`)[0]);
        pipe(response);
      },
      onAllReady() {
        response.write(
          template.split(`<!--ssr-outlet-->`)[1] +
            `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState()).replace(
              /</g,
              '\\u003c'
            )}</script>`
        );
        response.end();
      },
    });
  } catch (exception: unknown) {
    if (exception instanceof Error) {
      vite.ssrFixStacktrace(exception);
      next(exception);
    }
  }
});

(function () {
  try {
    app.listen(PORT, () => {
      console.log(
        '\x1b[40m\x1b[94m\x1b[40m\x1b[1m',
        `SSR Server has been started on http://localhost:${PORT}`
      );
    });
  } catch (exception: unknown) {
    if (exception instanceof Error) {
      console.error(exception);
    }
  }
})();
