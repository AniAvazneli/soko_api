import express from "express";
import { AuthGoogle, googleCallback } from "../auth/google.js";

const googleRouter = express.Router();

googleRouter.get("/auth/google", AuthGoogle);
googleRouter.get("/auth/google/callback", googleCallback);

export default googleRouter;
