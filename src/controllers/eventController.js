import Event from "../models/Event.js";
import { v4 as uuidv4 } from "uuid";
import createEventSchema from "../schemas/create-event-schema";

export const getAllEvents = async (req, res) => {
  const data = await Event.find();
  return res.json(data);
};

export const createEvent = async (req, res) => {
  const { body } = req;

  const validator = await createEventSchema(body);
  const { value, error } = validator.validate(body);

  if (error) {
    return res.status(401).json(error.details);
  }

  const { name } = value;

  const id = uuidv4();

  await Event.create({
    name,
    id,
  });

  return res.status(201).json({ message: "Event created successfully" });
};
