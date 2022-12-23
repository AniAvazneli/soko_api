import User from "../models/User.js";
import loginSchema from "../schemas/login-schema.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import sendRecoverySchema from "../schemas/send-recovery-schema.js";
import PasswordRecovery from "../models/PasswordRecovery.js";
import { sendPasswordRecovery } from "../mail/index.js";
import passwordRecoverySchema from "../schemas/password-recovery-schema.js";

export const login = async (req, res) => {
  const { body } = req;

  const validator = await loginSchema(body);
  const { value, error } = validator.validate(body);

  if (error) {
    return res.status(404).json(error.details);
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

  return res.status(404).json({
    en: "please, provide correct credentials...",
    geo: "მონაცემები არასწორია",
  });
};

export const sendRecovery = async (req, res) => {
  const { body } = req;

  const validator = await sendRecoverySchema(body);

  const { value, error } = validator.validate(body);

  if (error) {
    return res.status(422).json(error.details);
  }

  const { email, redirectLink } = value;

  const user = await User.findOne({ email });
  const hash = crypto.randomBytes(48).toString("hex");

  await PasswordRecovery.create({
    hash,
    userId: user.id,
  });

  await sendPasswordRecovery(email, hash, user.fullName, redirectLink);

  return res.status(201).json({ message: "password recovery link sent" });
};

export const passwordReset = async (req, res) => {
  const { body } = req;

  const validator = await passwordRecoverySchema(body);
  const { value, error } = validator.validate(body);

  if (error) {
    return res.status(422).json(error.details);
  }

  const { password, hash } = value;

  const passwordRecovery = await PasswordRecovery.findOne({ hash });

  if (!passwordRecovery) {
    return res.status(422).json({ message: "მონაცემები ვერ მოიძებნა" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.findOneAndUpdate(
    { id: passwordRecovery.userId },
    { password: hashedPassword }
  );

  await passwordRecovery.delete();

  return res.json({ message: "new password saved successfully" });
};
