import { Types } from "mongoose";
import HttpError from "./HttpError.js";

const checkContactId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const idIsValid = Types.ObjectId.isValid(id);

    if (!idIsValid) throw new HttpError(404, "Not found..");

    next();
  } catch (err) {
    next(err);
  }
};

export default checkContactId;
