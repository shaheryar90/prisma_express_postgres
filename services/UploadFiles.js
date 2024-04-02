const fs = require("fs");
const path = require("path");
const multer = require("multer");
class UploadFile {
  uploadImage() {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        const userName =
          req.body.userName == undefined ? "avatar" : req.body.userName;
        const dir = `./public/uploads/${userName}/`;
        fs.stat(dir, (exist) => {
          if (exist) {
            var mkdir = fs.mkdir(dir, () => {});
          }
          cb(null, dir);
        });
      },
      filename: function (req, file, cb) {
        const { userName } = req.body;
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
      },
    });

    return multer({
      storage,
      limits: 1024 * 1024 * 5,
      fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|png|jpg|svg/;
        const extname = fileTypes.test(
          path.extname(file.originalname).toLowerCase()
        );
        const mimeType = fileTypes.test(file.mimetype);
        if (mimeType && extname) {
          return cb(null, true);
        } else {
          cb("Error: invalid file type");
        }
      },
    });
  }
}
module.exports = new UploadFile();
