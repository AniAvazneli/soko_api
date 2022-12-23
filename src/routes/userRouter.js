import express from "express";
import { mobileVerification } from "../controllers/mobileVerificationController.js";
import { addUser, getAllUsers } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUsers);
userRouter.post("/mobile/verify", mobileVerification);
userRouter.post("/register", addUser);

export default userRouter;
