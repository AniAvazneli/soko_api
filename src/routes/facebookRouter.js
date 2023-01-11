import express, { Router } from "express";
import { facebookCallback } from "../auth/facebook.js";
import passport  from 'passport';

const facebookRouter = express.Router();

facebookRouter.get("/auth/facebook", passport.authenticate('facebook', {scope: ['email']}));
facebookRouter.get("/auth/facebook/callback", facebookCallback);

export default facebookRouter;
