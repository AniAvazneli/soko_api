import Joi from "joi";

const addServiceSchema = async () => {
  return Joi.object({
    name: Joi.string().min(2).required().messages({
      "string.base": "user should be a string",
      "string.min": "user should include 2 characters or more",
      "any.required": "name is required",
    }),
    useId: Joi.string().min(2).required().messages({
      "string.base": "useId should be a string",
      "string.min": "useId should include 2 characters or more",
      "any.required": "useId is required",
    }),
    eventType: Joi.array().items(
      Joi.string().required().messages({
        "array.base": "eventType should be a array",
        "any.required": "eventType is required",
      })
    ),
    city: Joi.string().required().messages({
      "string.base": "city should be a string",
      "any.required": "city is not required",
    }),
    address: Joi.string().min(2).required().messages({
      "string.base": "user should be a string",
      "string.min": "user should include 2 characters or more",
      "any.required": "address is required",
    }),
    flexLocation: Joi.boolean().required().messages({
      "boolean.base": "flexLocation should be a boolean",
      "any.required": "flexLocation is not required",
    }),
    price: Joi.number().required().messages({
      "number.base": "price should be a number",
      "any.required": "price is not required",
    }),
    currency: Joi.string().required().messages({
      "number.base": "currency should be a number",
      "any.required": "currency is not required",
    }),
    unit: Joi.string().required().messages({
      "number.base": "unit should be a number",
      "any.required": "unit is not required",
    }),
    flexPrice: Joi.boolean().required().messages({
      "boolean.base": "flexPrice should be a boolean",
      "any.required": "flexPrice is not required",
    }),
    description: Joi.string().required().messages({
      "string.base": "description should be a string",
      "any.required": "description is not required",
    }),
    questions: Joi.array().items(
      Joi.object({
        question: Joi.string().required().messages({
            "string.base": "description should be a string",
            "any.required": "description is not required",
          }),
        answers: Joi.array().items(
            Joi.string().required().messages({
              "array.base": "question should be a array",
              "any.required": "question is not required",
            })
          ),
      })
    ),
    gallery: Joi.array().items(
        Joi.string().required().messages({
          "array.base": "question should be a array",
          "any.required": "question is not required",
        })
      ),
  });
};

export default addServiceSchema;
