import { Router } from "express";
import {
  createBorrow,
  getBorrowSummary,
} from "../controllers/borrow.controllers";

const borrowRouter = Router();

borrowRouter.post("/", createBorrow);
borrowRouter.get("/", getBorrowSummary);

export default borrowRouter;
