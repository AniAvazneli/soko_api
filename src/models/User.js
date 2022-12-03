import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: Schema.Types.String,
    require: true,
  },
  email: {
    type: Schema.Types.String,
    require: true,
  },
  password: {
    type: Schema.Types.String,
    require: true,
  },
  phone: {
    type: Schema.Types.String,
    require: true,
  },
  allowRules: {
    type: Schema.Types.String,
    require: true,
  },
  accessMail: {
    type: Schema.Types.String,
    require: true,
  },
  id: {
    type: Schema.Types.Number,
    require: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
