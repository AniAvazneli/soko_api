import User from "../models/User.js";
import loginSchema from "../schemas/login-schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { body } = req;

  const validator = await loginSchema(body);
  const { value, error } = validator.validate(body);

  if (error) {
    return res.status(401).json(error.details);
  }

  const { email, password } = value;

  const user = await User.findOne({ email }).select("+password");
  const result = await bcrypt.compare(password, user.password);

  if (result) {
    const signData = {
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
    };

    const token = jwt.sign(signData, process.env.JWT_SECRET);

    return res.json({ ...signData, token });
  }

  return res.status(401).json({
    en: "please, provide correct credentials...",
    geo: "მონაცემები არასწორია",
  });
};

export const sendPasswordRecovery = async (req, res) => {
  const { body } = req;
};
