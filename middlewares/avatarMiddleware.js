import multer from "multer";
import path from "path";
import HttpError from "../helpers/HttpError.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "tmp"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(HttpError(400, "Please, upload images only.."), false);
  }
};

export const imageInitialUpload = multer({
  storage: storage,
  fileFilter: multerFilter,
}).single("avatar");
