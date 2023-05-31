import express from 'express';
import { Request, Response } from 'express';
import { imageInteractor } from '../../core/interactors/main.interactor';
import { multerMiddleware } from '../../middleware/multer.middleware';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.post('/', multerMiddleware.single('image'), async (req: any, res: Response) => {
  const { status, data, error } = await imageInteractor.process(req.file);
  
  res.status(status).json({ data, error });
  return;
});

router.get('/all', async (req: Request, res: Response) => {
  const { status, data, error } = await imageInteractor.getAll();

  res.status(status).json({ data, error });
  return;
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { format } = req.query;

  const { status, data, error } = await imageInteractor.get(parseInt(id), String(format));
  
  if (error) {
    res.status(status).json({ error });
  } else {
    const { mimeType, fileName } = data;
    res.setHeader('Content-Type', mimeType);
    fs.createReadStream(path.join(process.env.UPLOAD_PATH, fileName)).pipe(res);
  }
  
  return;
});

export default router;
