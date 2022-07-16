import express from 'express';

import indexRouter from './routes/index';
import appsetting from './appsetting';

const app: express.Express = express();
const { host, port, portFront } = appsetting;

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', `http://${host}:${portFront}`);
  res.setHeader('Access-Control-Allow-Origin', `http://${host}`);
  next();
});

app.use('/', indexRouter);

module.exports = app;

app.listen(port, () => {
  console.log(`Starting server on port ${port}!`);
});
