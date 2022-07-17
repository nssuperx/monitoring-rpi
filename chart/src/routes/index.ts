import express from 'express';
import getData from '../models/generate-data';

const router = express.Router();

router.get('/graphdata', (req: express.Request, res: express.Response) => {
  getData().then((data) => { res.json(data); });
});

export default router;
