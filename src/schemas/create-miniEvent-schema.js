import Joi from "joi";

const createSubCategoryRouterSchema = async () => {
  return Joi.object({
    name: Joi.string().min(2).required().messages({
      "string.base": "subCategory should be a string",
      "string.min": "subCategory should include 2 characters or more",
      "any.required": "name is required",
    }),
    eventId: Joi.string().min(2).required().messages({
      "string.base": "subCategory should be a string",
      "string.min": "subCategory should include 2 characters or more",
      "any.required": "eventId is required",
    }),
  });
};

export default createSubCategoryRouterSchema;
