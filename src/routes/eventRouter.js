import express from "express";
import {getAllEvents, createEvent, updateEvent, deleteEvent} from '../controllers/eventController.js'

const eventRouter = express.Router();

eventRouter.get("/events", getAllEvents);
eventRouter.post("/events", createEvent);
eventRouter.delete("/events/:id", deleteEvent);
eventRouter.put("/events/:id", updateEvent);

export default eventRouter;