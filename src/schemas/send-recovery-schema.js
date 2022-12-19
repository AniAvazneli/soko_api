import Joi from "joi";
import User from "../models/User.js";

const determineIfEmailExists = (user) => (value, helpers) => {
  if (!user) {
    return helpers.message("ელ-ფოსტა ვერ მოიძებნა");
  }
  return value;
};

const sendRecoverySchema = async (data) => {
  const user = await User.findOne({ email: data.email });

  return Joi.object({
    email: Joi.string()
      .custom(determineIfEmailExists(email))
      .email()
      .required()
      .messages({
        "string.base": "ელ-ფოსტა უნდა იყოს ტექსტური",
        "string.email": "არ შეესაბამება ელ-ფოსტის ფორმატს",
        "any.required": "ელ-ფოსტის ველი არ უნდა იყოს ცარიელი",
      }),
    redirectLink: Joi.string().required().messages({
      "string.base": "ლინკი უნდა იყოს ტექსტური",
      "any.required": "ლინკჯის ველი არ უნდა იყოს ცარიელი",
    }),
  });
};

export default sendRecoverySchema;
