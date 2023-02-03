import express from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/category", getAllCategories);
categoryRouter.post("/category", createCategory);
categoryRouter.delete("/category/:id", deleteCategory);
categoryRouter.put("/category/:id", updateCategory);

export default categoryRouter;
