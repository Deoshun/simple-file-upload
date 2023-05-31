import ImageRepository from '../core/repositories/image.repo';
import ImageEntity from '../core/entities/image.entity';
import ImageDTO from '../core/dto/image.dto';
import ImageModel from './sequelize/image.model';

class ImageDataSource implements ImageRepository {
  public async add(image: ImageDTO): Promise<Partial<ImageEntity>> {
    const { originalname, mimetype, destination, filename } = image;
    
    const newImage: ImageEntity = await ImageModel.create({
      originalName: originalname,
      mimeType: mimetype,
      fileName: filename,
      destination
    });
    
    return newImage;
  }
  public async get(id: number): Promise<ImageEntity> {
    const image: ImageEntity = await ImageModel.findOne({ where: { id } });
    return image;
  }
  public async getAll(): Promise<ImageEntity[]> {
    const images: ImageEntity[] = await ImageModel.findAll();
    return images;
  }
}

export default ImageDataSource;
