import express from "express";

import {
  registerDataCheck,
  loginDataCheck,
  checkToken,
} from "../middlewares/authMiddlewares.js";
import { imageInitialUpload } from "../middlewares/avatarMiddleware.js";
import {
  createAndRegisterUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  subscriptionUpdate,
  updateAvatar,
} from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import { subscriptionUserUpdateSchema } from "../schemas/usersSchema.js";

const usersRouter = express.Router();

usersRouter.post("/register", registerDataCheck, createAndRegisterUser);
usersRouter.post("/login", loginDataCheck, loginUser);
usersRouter.post("/logout", checkToken, logoutUser);
usersRouter.get("/current", checkToken, getCurrentUser);
usersRouter.patch(
  "/subscription",
  checkToken,
  validateBody(subscriptionUserUpdateSchema),
  subscriptionUpdate
);
usersRouter.patch("/avatars", checkToken, imageInitialUpload, updateAvatar);

export default usersRouter;
