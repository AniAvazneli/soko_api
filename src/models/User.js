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
  },
  phone: {
    type: Schema.Types.String,
  },
  allowRules: {
    type: Schema.Types.String,
  },
  accessMail: {
    type: Schema.Types.String,
  },
  id: {
    type: Schema.Types.Number,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
