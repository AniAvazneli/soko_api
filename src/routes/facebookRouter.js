import express, { Router } from "express";
import { Facebook, FacebookCallback } from "../auth/facebook.js";

const facebookRouter = express.Router();

facebookRouter.get("/auth/facebook", facebook);
facebookRouter.get("/auth/facebook/callback", facebookCallback);

export default facebookRouter;
