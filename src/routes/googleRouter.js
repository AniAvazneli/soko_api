import express from "express";
import { googleCallback } from "../auth/google.js";
import passport from "passport";

const googleRouter = express.Router();

googleRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
googleRouter.get("/auth/google/callback", googleCallback);

export default googleRouter;
