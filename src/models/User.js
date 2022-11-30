import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: Schema.Types.String,
    require: true,
  },
  lastName: {
    type: Schema.Types.String,
    require: true,
  },
  email: {
    type: Schema.Types.String,
    require: true,
  },
  phone: {
    type: Schema.Types.String,
  },
  avatar: {
    type: Schema.Types.String,
  },
  password: {
    type: Schema.Types.String,
  },
  id: {
    type: Schema.Types.Number,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
