import Joi from "joi";

const addUserSchema = async () => {
  return Joi.object({
    fullName: Joi.string().min(2).required().messages({
        "string-base": "user should be a string",
        "string-min": "user should include 2 characters or more",
        "any.required": "fullName is required",
    }),
    email: Joi.string().required().messages({
        "string-base": "email should be a string",
        "any.required": "email is required",
    }),
    password: Joi.string().required().messages({
        "string-base": "password should be a string",
        "any.required": "password is required",
    }),
    phone: Joi.string().required().messages({
        "string-base": "phone should be a string",
        "any.required": "phone is required",
    }),
    allowRules: Joi.string().required().messages({
        "string-base": "allowRules should be a string",
        "any.required": "allowRules is required",
    }),
    accessMail: Joi.string().required().messages({
        "string-base": "accessMail should be a string",
        "any.required": "accessMail is required",
    }),
    id: Joi.number().required().messages({
        "string-base": "id should be a number",
        "any.required": "id is required",
    }),
  });
};

export default addUserSchema;
