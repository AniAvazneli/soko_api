import express from "express";
import { addUser, getAllUsers } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUsers);

userRouter.post("/users", addUser);

export default userRouter;

'/api/users'