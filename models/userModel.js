import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

import { subscriptionTypes } from "../constants/subscriptionTypes.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: Object.values(subscriptionTypes),
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.checkUserPassword = (candidate, passwordHash) =>
  bcrypt.compare(candidate, passwordHash);

export const User = model("User", userSchema);
