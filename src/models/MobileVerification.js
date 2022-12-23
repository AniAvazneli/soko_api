import mongoose from "mongoose";

const { Schema } = mongoose;

const mobileVerification = new Schema({
  mobile: {
    type: Schema.Types.String,
    required: true,
  },
  code: {
    type: Schema.Types.Number,
    required: true,
  },
});

const MobileVerification = mongoose.model(
  "MobileVerification",
  mobileVerification
);

export default MobileVerification;
