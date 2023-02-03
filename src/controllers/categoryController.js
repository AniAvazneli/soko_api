import Category from "../models/Category.js";
import { v4 as uuidv4 } from "uuid";
import createCategorySchema from "../schemas/create-category-schema.js";

export const getAllCategories = async (req, res) => {
  const data = await Category.find();
  return res.json(data);
};

export const createCategory = async (req, res) => {
  const { body } = req;

  const validator = await createCategorySchema(body);
  const { value, error } = validator.validate(body);

  if (error) {
    return res.status(401).json(error.details);
  }

  const { name } = value;

  const id = uuidv4();

  await Category.create({
    name,
    id,
  });

  return res.status(201).json({ message: "Category created successfully" });
};

export const updateCategory = async (req, res) => {
  const { params, body } = req;

  const category = await Category.findOne({ id: params.id });

  if (!category) {
    return res
      .status(422)
      .json({ message: "there is no Category with this id" });
  }

  const validator = await createCategorySchema(body);
  const { value, error } = validator.validate(body);

  if (error) {
    return res.status(422).json(error.details);
  }

  const {
    name
  } = value;

  await Category.findOneAndUpdate(
    { id: params.id },
    {
      name
    }
  );

  return res.status(200).json({ message: "Category update successfully" });
};

export const deleteCategory = async (req, res) => {
  const { params } = req;

  const category = await Category.findOne({ id: params.id });

  if (!category) {
    return res
      .status(422)
      .json({ message: "there is no Category with this id" });
  }

  await Category.findOneAndDelete({ id: params.id });

  return res.status(200).json({ message: "Category removed successfully" });
};