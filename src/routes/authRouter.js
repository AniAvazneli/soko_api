import express from "express";
import {
  login,
  passwordReset,
  sendRecovery,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/password/send-link", sendRecovery);
authRouter.put("/password/reset", passwordReset);

export default authRouter;
