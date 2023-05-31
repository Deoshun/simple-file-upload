import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

import { supportedFileFormats } from '../const/fileFormat';

export function assertSupportedFileFormat(format: string) {
  if (!supportedFileFormats.includes(format)) {
    throw new Error('Not Supported');
  }
}

export async function imageExist(fileName: string, format: string) {
  return fs.existsSync(
    path.join(
      process.env.UPLOAD_PATH,
      format ? `${fileName}.${format}` : fileName
    )
  );
}

export async function generateNewImage(fileName: string, format: string) {
  const jimpImage = await sharp(path.join(
      process.env.UPLOAD_PATH,
      fileName
  )).toFile(
    path.join(
      process.env.UPLOAD_PATH,
      `${fileName}.${format}`
    )
  );
}