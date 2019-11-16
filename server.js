const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    // eslint-disable-next-line
    console.log('hey');

    server.get('/work/:slug', (req, res) => {
      const actualPage = '/work/single';
      const queryParams = { slug: req.params.slug };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;

      // eslint-disable-next-line
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    // eslint-disable-next-line
    console.error('ex.stack', ex.stack);
    process.exit(1);
  });
