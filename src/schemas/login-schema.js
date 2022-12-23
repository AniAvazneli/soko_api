import Joi from "joi";
import User from "../models/User.js";

const determineIfUserExists = (user) => (value, helpers) => {
  if (!user) {
    return helpers.message({
      en: "user with this email does not exists",
      geo: "მომხმარებელი აღნიშნული მეილით არ მოიძებნა",
    });
  }
  return value;
};

const loginSchema = async (data) => {
  const user = await User.findOne({ email: data.email });

  return Joi.object({
    email: Joi.string()
      .email()
      .custom(determineIfUserExists(user))
      .required()
      .messages({
        "string.base": "email should be a string",
        "any.required": "email is required",
      }),
    password: Joi.string().required().messages({
      "string.base": "password should be a string",
      "any.required": "password is required",
    }),
  });
};

export default loginSchema;
