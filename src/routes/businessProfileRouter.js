import express from "express";
import {
  getAllBusinessProfile,
  createBusinessProfile,
  updateBusinessProfile,
  deleteBusinessProfile,
} from "../controllers/businessProfileController.js";
import multer from "multer";

const businessProfileRouter = express.Router();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/storage");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

businessProfileRouter.get("/businessProfiles", getAllBusinessProfile);
businessProfileRouter.post(
  "/businessProfiles",
  multer({ storage: fileStorage, fileFilter }).single("avatar"),
  createBusinessProfile
);
businessProfileRouter.put(
  "/businessProfiles/:id",
  multer({ storage: fileStorage, fileFilter }).single("avatar"),
  updateBusinessProfile
);
businessProfileRouter.delete("/businessProfiles/:id", deleteBusinessProfile);

export default businessProfileRouter;
