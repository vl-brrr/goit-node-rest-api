import {
  createAndRegisterUserService,
  loginUserService,
  updateUserById,
  updateAvatarService,
  findUser,
  sendVefiryEmail,
} from "../services/userServices.js";

export const createAndRegisterUser = async (req, res, next) => {
  try {
    const newUser = await createAndRegisterUserService(req.body);
    await sendVefiryEmail(newUser);
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

    res.status(200).json({
      token: user.token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (err) {
    next(err);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    const updatedUser = await updateUserById(req.user.id, { token: null });
    res.status(204).send();
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

export const updateAvatar = async (req, res, next) => {
  try {
    const updatedUser = await updateAvatarService(req.user, req.file);

    res.status(200).json({
      avatarURL: updatedUser.avatarURL,
    });
  } catch (err) {
    next(err);
  }
};

export const checkVerificationToken = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await findUser({ verificationToken });

    if (user) {
      const verifiedUser = await updateUserById(user.id, {
        verificationToken: null,
        verify: true,
      });
      res.status(200).json({ message: "Verification successful" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    next(err);
  }
};
export const sendVerificationLetter = async (req, res, next) => {
  try {
    const user = await findUser(req.body);
    if (!user.verify) {
      await sendVefiryEmail(user);
      res.status(200).json({ message: "Verification email sent" });
    } else {
      res.status(400).json({ message: "Verification has already been passed" });
    }
  } catch (err) {
    next(err);
  }
};
