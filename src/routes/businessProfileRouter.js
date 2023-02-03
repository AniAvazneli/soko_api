import express from "express";
import {
    getAllBusinessProfile,
    createBusinessProfile,
    updateBusinessProfile,
    deleteBusinessProfile,
} from "../controllers/businessProfileController.js";
import multer from "multer"

const businessProfileRouter = express.Router();

businessProfileRouter.get("/businessProfiles", getAllBusinessProfile);
businessProfileRouter.post("/businessProfiles",multer({dest: 'public/storage'}).array('gallery'), createBusinessProfile);
businessProfileRouter.put("/businessProfiles/:id",multer({dest: 'public/storage'}).array('gallery'), updateBusinessProfile);
businessProfileRouter.delete("/businessProfiles/:id", deleteBusinessProfile);

export default businessProfileRouter;