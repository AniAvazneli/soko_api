import bodyParser from "body-parser";
import express from "express";
import dotenv from 'dotenv'

import connectMongo from "./cofig/mongo.js";

const app = express();
dotenv.config();
connectMongo();

app.use(bodyParser.json());

app.listen(3000);
