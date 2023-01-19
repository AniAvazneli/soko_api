import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid";
import addUserSchema from "../schemas/add-user-schema.js";
import bcrypt from "bcrypt";
import Event from "../models/Event.js";

export const getAllUsers = async (req, res) => {
  const data = await User.find();
  return res.json(data);
};

export const addUser = async (req, res) => {
  const { body } = req;

  const validator = await addUserSchema(body);
  const { value, error } = validator.validate(body);

  if (error) {
    return res.status(401).json(error.details);
  }

  const { fullName, email, password, phone, allowRules, accessMail } = value;

  const id = uuidv4();
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.create({
    fullName,
    email,
    password: hashedPassword,
    phone,
    allowRules,
    accessMail,
    id,
  });

  return res.status(201).json({ message: "user created successfully" });
};

export const updateEvent = async (req, res) => {
  const { params, body } = req;

  const event = await Event.findOne({ id: params.id });

  if (!event) {
    return res
      .status(422)
      .json({ message: "there is no event with this id" });
  }

  const validator = await eventSchema(body);
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