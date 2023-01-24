import express from "express";
import {
  getAllMiniEvents,
  createMiniEvent,
  updateMiniEvent,
  deleteMiniEvent,
} from "../controllers/miniEventController.js";

const miniEventRouter = express.Router();

miniEventRouter.get("/miniEvents", getAllMiniEvents);
miniEventRouter.post("/miniEvents", createMiniEvent);
miniEventRouter.put("/miniEvents/:id", updateMiniEvent);
miniEventRouter.delete("/miniEvents/:id", deleteMiniEvent);

export default miniEventRouter;
