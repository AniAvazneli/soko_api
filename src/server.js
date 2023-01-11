import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectMongo from "./config/mongo.js";
import userRouter from "./routes/userRouter.js";
import swaggerMiddleware from "./middlewares/swagger-middleware.js";
import authRouter from "./routes/authRouter.js";
import googleRouter from "./routes/googleRouter.js";
import facebookRouter from "./routes/facebookRouter.js";
import expressSession from "express-session";
import passport from "passport";

const app = express();
dotenv.config();
connectMongo();

app.use(bodyParser.json());

app.use(
  expressSession({
    secret: "jayantpatilapp",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/api", cors(), userRouter);
app.use("/api", cors(), authRouter);
app.use("/", cors(), googleRouter);
app.use("/api", cors(), facebookRouter);
app.use("/", ...swaggerMiddleware());

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.use("/protected", (req, res) => {
  res.send("works!");
});

app.get("/fail", (req, res) => {
  res.send(req.user ? req.user : "Not logged in, login with facebook");
});

app.listen(process.env.PORT || 3000);
