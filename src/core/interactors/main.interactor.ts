import ImageInteractor from './image.interactor';

import ImageDataSource from '../../datasources/image.datasource';

const imageDataSource = new ImageDataSource();


export const imageInteractor = new ImageInteractor(imageDataSource);
