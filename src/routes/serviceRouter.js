import express from "express";
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";
import multer from "multer";

const serviceRouter = express.Router();

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

serviceRouter.get("/services", getAllServices);
serviceRouter.post(
  "/services",
  multer({ storage: fileStorage, fileFilter }).array("gallery"),
  createService
);
serviceRouter.put(
  "/services/:id",
  multer({ dest: "public/storage" }).array("gallery"),
  updateService
);
serviceRouter.delete("/services/:id", deleteService);

export default serviceRouter;
