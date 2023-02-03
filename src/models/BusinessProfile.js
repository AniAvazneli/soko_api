import mongoose from "mongoose";

const { Schema } = mongoose;

const businessProfileSchema = new Schema({
  id: {
    type: Schema.Types.String,
    require: true,
  },
  avatar: {
    type: Schema.Types.String,
    require: true,
  },
  businessName: {
    type: Schema.Types.String,
    require: true,
  },
  memberSince: {
    type: Schema.Types.String,
    require: true,
  },
  experience: {
    type: Schema.Types.String,
    require: true,
  },
  rate: {
    type: Schema.Types.Number,
    require: true,
  },
  viewedNumber: {
    type: Schema.Types.Number,
    require: true,
  },
  likes: {
    type: Schema.Types.Number,
    require: true,
  },
  littleDescription: {
    type: Schema.Types.String,
    require: true,
  },
  socials: {
    type: Schema.Types.Mixed,
    require: true,
  },
  tags: {
    type: Schema.Types.Mixed,
    require: true,
  },
});

const BusinessProfile = mongoose.model(
  "businessProfile",
  businessProfileSchema
);

export default BusinessProfile;
