import { registerUserDataSchema } from "../schemas/usersSchema.js";
import {
  ifUserExistsService,
  checkTokenService,
  getUserByIdService,
} from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";

export const registerDataCheck = async (req, res, next) => {
  try {
    const { value, error } = registerUserDataSchema.validate(req.body);

    if (error) {
      throw HttpError(400, "Помилка від Joi або іншої бібліотеки валідації");
    }

    const userExists = await ifUserExistsService({ email: value.email });

    if (userExists) {
      throw HttpError(409, "Email in use");
    }

    next();
  } catch (err) {
    next(err);
  }
};

export const loginDataCheck = async (req, res, next) => {
  try {
    const { value, error } = registerUserDataSchema.validate(req.body);

    if (error)
      next(HttpError(400, "Помилка від Joi або іншої бібліотеки валідації"));

    next();
  } catch (err) {
    next(err);
  }
};

export const checkToken = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.startsWith("Bearer ") &&
      req.headers.authorization.split(" ")[1];
    const userId = await checkTokenService(token);

    if (!userId) throw HttpError(401, "Not authorized");

    const currentUser = await getUserByIdService(userId);

    if (!currentUser || currentUser.token !== token)
      throw HttpError(401, "Not authorized");

    req.user = currentUser;

    next();
  } catch (err) {
    next(err);
  }
};
