import 'dotenv/config';
import express from 'express';
import ImageController from '../controllers/http/image.controller';


import { Request, Response } from 'express';

export const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Lets do this!');
});

app.use(express.json());
app.use('/image', ImageController);

app.listen(port, () => {
  console.log('Application started, running on http://localhost:' + port);
});
