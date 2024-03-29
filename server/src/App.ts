import express from 'express';

import indexRouter from './routes/index';
import appsetting from './AppSetting';

const app: express.Express = express();
const { host, port, portFront } = appsetting;

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  // TODO: 何とかしたい...
  if (portFront === 80) {
    res.setHeader('Access-Control-Allow-Origin', `http://${host}`);
  } else {
    res.setHeader('Access-Control-Allow-Origin', `http://${host}:${portFront}`);
  }
  next();
});

app.use('/', indexRouter);

module.exports = app;

app.listen(port, () => {
  console.log(`Starting server on port ${port}!`);
});
