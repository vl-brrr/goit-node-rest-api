import express from "express";

import {
  registerDataCheck,
  loginDataCheck,
  checkToken,
} from "../middlewares/authMiddlewares.js";
import {
  createAndRegisterUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  subscriptionUpdate,
} from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import { subscriptionUserUpdateSchema } from "../schemas/usersSchema.js";
import { subscriptionTypes } from "../constants/subscriptionTypes.js";

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

export default usersRouter;
