export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new Error('Only image files are allowed!'),
      false,
    );
  }
  callback(null, true);
};

export const pdfFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(pdf)$/)) {
    return callback(
      new Error('Only pdf files are allowed!'),
      false,
    );
  }
  callback(null, true);
};

export const generateFileName = (req, file, cb) => {
  const fileNameSplit = file.originalname.split('.');
  const fileExt = fileNameSplit[fileNameSplit.length - 1];
  console.log(file);

  cb(null, `${fileNameSplit[0]}-${Date.now()}.${fileExt}`);
};
