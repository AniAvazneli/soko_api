import Joi from "joi";

const createCategorySchema = async () => {
    return Joi.object({
      name: Joi.string().min(2).required().messages({
          "string.base": "Category should be a string",
          "string.min": "Category should include 2 characters or more",
          "any.required": "name is required",
      })
    });
  };
  
  export default createCategorySchema;