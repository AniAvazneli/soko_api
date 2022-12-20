import mongoose from "mongoose";

const { Schema } = mongoose;

const passwordRecoverySchema = new Schema({
  hash: {
    type: Schema.Types.string,
    required: true,
  },
  userId: {
    type: Schema.Types.string,
    required: true,
  },
});

const PasswordRecovery = mongoose.model(
  "PasswordRecovery",
  passwordRecoverySchema
);

export default PasswordRecovery;
