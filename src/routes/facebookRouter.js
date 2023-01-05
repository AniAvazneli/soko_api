import express, { Router } from "express";
import { Facebook, FacebookCallback } from "../auth/facebook.js";

const facebookRouter = express.Router();

facebookRouter.get("/auth/facebook", Facebook);
facebookRouter.get("/auth/facebook/callback", FacebookCallback);

export default facebookRouter;
