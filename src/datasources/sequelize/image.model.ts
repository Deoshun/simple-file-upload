import { Model, DataTypes, Optional } from 'sequelize';

import ImageEntity from '../../core/entities/image.entity';
import sequelizeInstance from './db-connection.service';

type ImageCreationAtrributes = Optional<ImageEntity, 'id'>

class Image
extends Model<ImageEntity, ImageCreationAtrributes>
implements ImageEntity {
  public id!: number;
  public originalName!: string;
  public mimeType!: string;
  public destination!: string;
  public fileName!: string;

  // time stamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    originalName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    mimeType: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    fileName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    destination: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    }
  },
  { 
    tableName: 'image',
    sequelize: sequelizeInstance
  }
);
(async () => {
  if (process.env.NODE_ENV !== 'test') {
    await sequelizeInstance.sync({force:true});
  }
})();
export default Image;