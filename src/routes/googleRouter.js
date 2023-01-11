import express from "express";
import { googleCallback } from "../auth/google.js";
import passport from "passport";

const googleRouter = express.Router();

googleRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
googleRouter.get("/google/callback", googleCallback);

export default googleRouter;
