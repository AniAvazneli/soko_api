import Joi from "joi";

const createMiniEventSchema = async () => {
  return Joi.object({
    name: Joi.string().min(2).required().messages({
      "string.base": "event should be a string",
      "string.min": "event should include 2 characters or more",
      "any.required": "name is required",
    }),
    eventId: Joi.string().min(2).required().messages({
      "string.base": "event should be a string",
      "string.min": "event should include 2 characters or more",
      "any.required": "eventId is required",
    }),
  });
};

export default createMiniEventSchema;
