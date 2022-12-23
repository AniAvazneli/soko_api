import mongoose from "mongoose";

const { Schema } = mongoose;

const passwordRecoverySchema = new Schema({
  hash: {
    type: Schema.Types.String,
    required: true,
  },
  userId: {
    type: Schema.Types.String,
    required: true,
  },
});

const PasswordRecovery = mongoose.model(
  "PasswordRecovery",
  passwordRecoverySchema
);

export default PasswordRecovery;
