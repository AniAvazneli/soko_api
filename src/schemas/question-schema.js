import Joi from "joi";

const questionSchema = async () => {
  return Joi.object({
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
  });
};

export default questionSchema;
