import ImageRepository from '../repositories/image.repo';
import ImageEntity from '../entities/image.entity';
import ImageDTO from '../dto/image.dto';

import { HTTP_STATUS } from '../const/http';
import { IResponse } from './IResponse';

import { mimeMap } from '../const/fileFormat';
import { assertSupportedFileFormat, imageExist, generateNewImage } from '../utils/functions';

class ImageInteractor {
  imageRepository: ImageRepository;

  constructor(imageRepository: ImageRepository) {
    this.imageRepository = imageRepository;
  }

  async process(image: ImageDTO): Promise<IResponse<Partial<ImageEntity>>> {
    try {
      const { id } = await this.imageRepository.add(image);
      return { status: HTTP_STATUS.OK, data: { id } };
    } catch (e) {
      return { status: HTTP_STATUS.INTERNAL_ERROR, error: e.message };
    }
  }
  
  async getAll(): Promise<IResponse<ImageEntity[]>> {
    try {
      const images = await this.imageRepository.getAll();
      return { status: HTTP_STATUS.OK, data: images };
    } catch (e) {
      return { status: HTTP_STATUS.INTERNAL_ERROR, error: e.message };
    }
  }
  
  async get(id: any, format: string): Promise<IResponse<ImageEntity>> {
    try {
      assertSupportedFileFormat(format);
      
      const image = await this.imageRepository.get(parseInt(id));
      
      if (!image) {
        throw new Error('Not Found');
      }
      
      const imageInStore = await imageExist(image.fileName, format);
      if (!imageInStore) {
        await generateNewImage(image.fileName, format);
      }
      
      image.fileName = image.fileName + '.' + format;
      image.mimeType = mimeMap[format];
      
      return { status: HTTP_STATUS.OK, data: image};
    } catch (e) {
      if (e.message === 'Not Supported') {
        return { status: HTTP_STATUS.BAD_REQUEST, error: e.message };
      } else if (e.message === 'Not Found') {
        return { status: HTTP_STATUS.NOT_FOUND, error: e.message };
      }
      
      return { status: HTTP_STATUS.INTERNAL_ERROR, error: e.message };
    }
  }

}

export default ImageInteractor;
