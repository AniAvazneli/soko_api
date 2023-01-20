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

export const updateEvent = async (req, res) => {
  const { params, body } = req;

  const event = await Event.findOne({ id: params.id });

  if (!event) {
    return res
      .status(422)
      .json({ message: "there is no event with this id" });
  }

  const validator = await createEventSchema(body);
  const { value, error } = validator.validate(body);

  if (error) {
    return res.status(422).json(error.details);
  }

  const {
    name
  } = value;

  await Event.findOneAndUpdate(
    { id: params.id },
    {
      name
    }
  );

  return res.status(200).json({ message: "event update successfully" });
};

export const deleteEvent = async (req, res) => {
  const { params } = req;

  const event = await Event.findOne({ id: params.id });

  if (!event) {
    return res
      .status(422)
      .json({ message: "there is no event with this id" });
  }

  await Event.findOneAndDelete({ id: params.id });

  return res.status(200).json({ message: "event removed successfully" });
};