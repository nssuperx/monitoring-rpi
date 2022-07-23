import express from 'express';
import getData from '../models/GenerateData';

const router = express.Router();

router.get('/graphdata', (req: express.Request, res: express.Response) => {
  getData(req).then((data) => { res.json(data); });
});

export default router;
