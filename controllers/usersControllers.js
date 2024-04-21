import {
  createAndRegisterUserService,
  loginUserService,
  updateUserById,
} from "../services/userServices.js";

export const createAndRegisterUser = async (req, res, next) => {
  try {
    const newUser = await createAndRegisterUserService(req.body);
    res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription },
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const user = await loginUserService(req.body);

    res.status(201).json({
      token: user.token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (err) {
    next(err);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    await updateUserById(req.user.id, { token: null });
    res.status(204);
  } catch (err) {
    next(err);
  }
};

export const getCurrentUser = (req, res) => {
  const user = req.user;
  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

export const subscriptionUpdate = async (req, res, next) => {
  try {
    const updatedUser = await updateUserById(req.user.id, req.body);
    res.status(200).json({
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    });
  } catch (err) {
    next(err);
  }
};
