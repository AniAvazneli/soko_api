import Joi from "joi";

const createBusinessProfileSchema = async () => {
  return Joi.object({
    userID: Joi.string().min(2).required().messages({
      "string.base": "userID should be a string",
      "string.min": "userID should include 2 characters or more",
      "any.required": "userID is required",
    }),
    avatar: Joi.string().required().messages({
      "array.base": "avatar should be a array",
      "any.required": "avatar is not required",
    }),
    businessName: Joi.string().min(2).required().messages({
      "string.base": "businessName should be a string",
      "string.min": "businessName should include 2 characters or more",
      "any.required": "businessName is required",
    }),
    memberSince: Joi.string().min(2).required().messages({
      "string.base": "memberSince should be a string",
      "string.min": "memberSince should include 2 characters or more",
      "any.required": "memberSince is required",
    }),
    experience: Joi.string().min(2).required().messages({
      "string.base": "experience should be a string",
      "string.min": "experience should include 2 characters or more",
      "any.required": "experience is required",
    }),
    rate: Joi.string().min(1).required().messages({
      "string.base": "rate should be a string",
      "string.min": "rate should include 1 characters or more",
      "any.required": "rate is required",
    }),
    viewedNumber: Joi.number().required().messages({
      "number.base": "viewedNumber should be a number",
      "any.required": "viewedNumber is not required",
    }),
    likes: Joi.number().required().messages({
      "number.base": "likes should be a number",
      "any.required": "likes is not required",
    }),
    littleDescription: Joi.string().min(2).required().messages({
      "string.base": "littleDescription should be a string",
      "string.min": "littleDescription should include 2 characters or more",
      "any.required": "littleDescription is required",
    }),
    socials: Joi.array().items(
      Joi.string().required().messages({
        "array.base": "socials should be a array",
        "any.required": "socials is required",
      })
    ),
    tags: Joi.array().items(
      Joi.string().required().messages({
        "array.base": "tags should be a array",
        "any.required": "tags is required",
      })
    ),
  });
};

export default createBusinessProfileSchema;
