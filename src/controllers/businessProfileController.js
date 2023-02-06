import BusinessProfile from "../models/BusinessProfile.js";
import { v4 as uuidv4 } from "uuid";
import createBusinessProfileSchema from "../schemas/create-businessProfile-schema.js";

export const getAllBusinessProfile = async (req, res) => {
  const data = await BusinessProfile.find();
  return res.json(data);
};

export const createBusinessProfile = async (req, res) => {
  const { file, body } = req;
  const socialsIdentifier = Array.isArray(body.socials)
    ? body.socials
    : body.socials.split(",");
  const tagsIdentifier = Array.isArray(body.tags)
    ? body.tags
    : body.tags.split(",");

  const validator = await createBusinessProfileSchema({
    ...body,
    socials: socialsIdentifier,
    tags: tagsIdentifier,
    avatar: "images/" + file.originalname,
  });
  const { value, error } = validator.validate({
    ...body,
    socials: socialsIdentifier,
    tags: tagsIdentifier,
    avatar: "images/" + file.originalname,
  });

  if (error) {
    return res.status(401).json(error.details);
  }

  const {
    userID,
    avatar,
    businessName,
    memberSince,
    experience,
    rate,
    viewedNumber,
    likes,
    littleDescription,
    socials,
    tags,
  } = value;

  const id = uuidv4();

  await BusinessProfile.create({
    userID,
    id,
    avatar,
    businessName,
    memberSince,
    experience,
    rate,
    viewedNumber,
    likes,
    littleDescription,
    socials,
    tags,
  });

  return res
    .status(201)
    .json({ message: "BusinessProfile created successfully" });
};

export const updateBusinessProfile = async (req, res) => {
  const { params, file, body } = req;

  const socialsIdentifier = Array.isArray(body.socials)
    ? body.socials
    : body.socials.split(",");
  const tagsIdentifier = Array.isArray(body.tags)
    ? body.tags
    : body.tags.split(",");

  const businessProfile = await BusinessProfile.findOne({ id: params.id });

  if (!businessProfile) {
    return res
      .status(422)
      .json({ message: "there is no businessProfile with this id" });
  }

  const validator = await createBusinessProfileSchema({
    ...body,
    socials: socialsIdentifier,
    tags: tagsIdentifier,
    avatar: "images/" + file.originalname,
  });
  const { value, error } = validator.validate({
    ...body,
    socials: socialsIdentifier,
    tags: tagsIdentifier,
    avatar: "images/" + file.originalname,
  });

  if (error) {
    return res.status(422).json(error.details);
  }

  const {
    userID,
    avatar,
    businessName,
    memberSince,
    experience,
    rate,
    viewedNumber,
    likes,
    littleDescription,
    socials,
    tags,
  } = value;

  await BusinessProfile.findOneAndUpdate(
    { id: params.id },
    {
      userID,
      avatar,
      businessName,
      memberSince,
      experience,
      rate,
      viewedNumber,
      likes,
      littleDescription,
      socials,
      tags,
    }
  );

  return res
    .status(200)
    .json({ message: "businessProfile update successfully" });
};

export const deleteBusinessProfile = async (req, res) => {
  const { params } = req;

  const businessProfile = await BusinessProfile.findOne({ id: params.id });

  if (!businessProfile) {
    return res
      .status(422)
      .json({ message: "there is no businessProfile with this id" });
  }

  await BusinessProfile.findOneAndDelete({ id: params.id });

  return res
    .status(200)
    .json({ message: "businessProfile removed successfully" });
};
