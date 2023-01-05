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


const app = express();
dotenv.config();
connectMongo();

app.use(bodyParser.json());

app.use("/api", cors(), userRouter);
app.use("/api", cors(), authRouter);
app.use("/api", cors(), googleRouter);
app.use("/api", cors(), facebookRouter);
app.use("/", ...swaggerMiddleware());

app.listen(process.env.PORT || 3000);
