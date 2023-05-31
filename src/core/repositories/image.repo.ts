import ImageEntity from '../entities/image.entity';
import ImageDTO from '../dto/image.dto';

interface ImageRepository {
  add(image: ImageDTO): Promise<Parital<ImageEntity>>;
  get(id: number): Promise<ImageEntity>;
  getAll(): Promise<ImageEntity[]>;
}

export default ImageRepository;
