import multer from 'multer';

const imageFilter = function(req: any, file: any, cb: any) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only jpg, jpeg, png files'), false);
  }
  cb(null, true);
} 

const multerMiddleware = multer({
    dest: `${process.env.UPLOAD_PATH}`,
    fileFilter: imageFilter
});

export { multerMiddleware }