import express from "express";
import {
  getAllSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../controllers/miniEventController.js";

const subCategoryRouter = express.Router();

subCategoryRouter.get("/subCategory", getAllSubCategories);
subCategoryRouter.post("/subCategory", createSubCategory);
subCategoryRouter.put("/subCategory/:id", updateSubCategory);
subCategoryRouter.delete("/subCategory/:id", deleteSubCategory);

export default subCategoryRouter;
