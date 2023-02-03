import Service from "../models/Service.js";
import { v4 as uuidv4 } from "uuid";
import addServiceSchema from "../schemas/add-service-schema.js";

export const getAllServices = async (req, res) => {
  const data = await Service.find();
  return res.json(data);
};

export const createService = async (req, res) => {
  const { file, body } = req;

  
  const eventTypeIdentifer = Array.isArray(body.eventType) ? body.eventType : body.eventType.split(",")

  const validator = await addServiceSchema({...body,eventType : eventTypeIdentifer});
  const { value, error } = validator.validate({...body,eventType : eventTypeIdentifer});

  if (error) {
    return res.status(401).json(error.details);
  }

  const {
    name,
    eventType,
    city,
    address,
    flexLocation,
    price,
    currency,
    unit,
    flexPrice,
    description,
    questions,
    gallery,
  } = value;

  const id = uuidv4();

  await Service.create({
    name,
    eventType,
    city,
    address,
    flexLocation,
    price,
    currency,
    unit,
    flexPrice,
    description,
    questions,
    gallery,
    id,
  });

  return res.status(201).json({ message: "Service created successfully" });
};

export const updateService = async (req, res) => {
  const { params, body } = req;
  console.log(body)
  const eventTypeIdentifer = Array.isArray(body.eventType) ? body.eventType : body.eventType.split(",")
  const service = await Service.findOne({ id: params.id });

  if (!service) {
    return res
      .status(422)
      .json({ message: "there is no service with this id" });
  }

  const validator = await addServiceSchema({...body,eventType : eventTypeIdentifer});
  const { value, error } = validator.validate({...body,eventType : eventTypeIdentifer});

  if (error) {
    return res.status(422).json(error.details);
  }

  const {
    name,
    eventType,
    city,
    address,
    flexLocation,
    price,
    currency,
    unit,
    flexPrice,
    description,
    questions,
    gallery,
  } = value;

  await Service.findOneAndUpdate(
    { id: params.id },
    {
      name,
      eventType,
      city,
      address,
      flexLocation,
      price,
      currency,
      unit,
      flexPrice,
      description,
      questions,
      gallery,
    }
  );

  return res.status(200).json({ message: "service update successfully" });
};

export const deleteService = async (req, res) => {
  const { params } = req;

  const service = await Service.findOne({ id: params.id });

  if (!service) {
    return res
      .status(422)
      .json({ message: "there is no service with this id" });
  }

  await Service.findOneAndDelete({ id: params.id });

  return res.status(200).json({ message: "service removed successfully" });
};
