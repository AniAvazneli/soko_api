import miniEvent from "../models/MiniEvent.js";
import { v4 as uuidv4 } from "uuid";
import createSubCategoryRouterSchema from "../schemas/create-miniEvent-schema.js";

export const getAllSubCategories = async (req, res) => {
  const data = await miniEvent.find();
  return res.json(data);
};

export const createSubCategory = async (req, res) => {
  const { body } = req;

  const validator = await createSubCategoryRouterSchema(body);
  const { value, error } = validator.validate(body);

  if (error) {
    return res.status(401).json(error.details);
  }

  const { name, eventId } = value;

  const id = uuidv4();

  await miniEvent.create({
    eventId,
    name,
    id,
  });

  return res.status(201).json({ message: "Event created successfully" });
};

export const updateSubCategory = async (req, res) => {
  const { params, body } = req;

  const event = await miniEvent.findOne({ id: params.id });

  if (!event) {
    return res
      .status(422)
      .json({ message: "there is no miniEvent with this id" });
  }

  const validator = await createSubCategoryRouterSchema(body);
  const { value, error } = validator.validate(body);

  if (error) {
    return res.status(422).json(error.details);
  }

  const {
    name
  } = value;

  await miniEvent.findOneAndUpdate(
    { id: params.id },
    {
      name
    }
  );

  return res.status(200).json({ message: "miniEvent update successfully" });
};

export const deleteSubCategory = async (req, res) => {
  const { params } = req;

  const event = await miniEvent.findOne({ id: params.id });

  if (!event) {
    return res
      .status(422)
      .json({ message: "there is no event with this id" });
  }

  await miniEvent.findOneAndDelete({ id: params.id });

  return res.status(200).json({ message: "miniEvent removed successfully" });
};