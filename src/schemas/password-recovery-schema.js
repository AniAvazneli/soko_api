import Joi from "joi";
import PasswordRecovery from "../models/PasswordRecovery.js";

const determineIfHashExists = (passwordRecovery) => (value, helpers) => {
  if (!passwordRecovery) {
    return helpers.message("მონაცემები არასწორია");
  }
  return value;
};

const passwordRecoverySchema = async (data) => {
  const passwordRecovery = await PasswordRecovery.findOne({ hash: data.hash });

  return Joi.object({
    password: Joi.string().required().messages({
      "string.base": "password should be a string",
      "any.required": "password is required",
    }),
    hash: Joi.string()
      .required()
      .custom(determineIfHashExists(passwordRecovery))
      .messages({
        "string.base": "ჰეში უნდა იყოს ტექსტური",
        "any.required": "ჰეშის ველი არ უნდა იყოს ცარიელი",
      }),
  });
};

export default passwordRecoverySchema;
