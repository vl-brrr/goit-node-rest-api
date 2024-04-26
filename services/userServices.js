import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import { nanoid } from "nanoid";
import path from "path";
import Jimp from "jimp";
import fs from "fs";

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

async function ifUserExistsService(filter) {
  try {
    const user = await User.exists(filter);
    return user;
  } catch (err) {
    throw err;
  }
}

async function createAndRegisterUserService(userData) {
  try {
    const newUser = await User.create(userData);
    newUser.password = undefined;
    return newUser;
  } catch (err) {
    throw err;
  }
}

async function getUserByIdService(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    throw err;
  }
}

async function updateUserById(userId, updatedData) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      updatedData,
      {
        new: true,
      }
    );
    return updatedUser;
  } catch (err) {
    throw err;
  }
}
async function loginUserService({ email, password }) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw HttpError(401, "Email or password is wrong");
    }
    const token = signToken(user.id);

    const userWithToken = await User.findByIdAndUpdate(
      { _id: user.id },
      { token },
      {
        new: true,
      }
    );

    userWithToken.password = undefined;
    return userWithToken;
  } catch (err) {
    throw err;
  }
}

async function checkTokenService(token) {
  try {
    if (!token) throw HttpError(401, "Not authorized");
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    if (!id) throw HttpError(401, "Not authorized");
    return id;
  } catch (err) {
    throw err;
  }
}

async function updateAvatarService(user, file) {
  try {
    if (file) {
      const fileName = `${user.id}-${nanoid()}.jpeg`;
      const fullFilePath = path.join(process.cwd(), "public", "avatars");

      const avatar = await Jimp.read(file.path);

      await avatar
        .cover(250, 250)
        .quality(90)
        .writeAsync(path.join(fullFilePath, fileName));

      fs.unlinkSync(file.path);
      user.avatarURL = path.join("avatars", fileName);
    }
    return user.save();
  } catch (err) {
    throw err;
  }
}

export {
  ifUserExistsService,
  createAndRegisterUserService,
  loginUserService,
  checkTokenService,
  getUserByIdService,
  updateUserById,
  updateAvatarService,
};
