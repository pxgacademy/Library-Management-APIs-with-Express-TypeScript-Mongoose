import { Router } from "express";
import {
  createBorrow,
  getBorrowSummary,
} from "../controllers/borrow.controllers";

const borrowRoute = Router();

borrowRoute.post("/", createBorrow);
borrowRoute.get("/", getBorrowSummary);

export default borrowRoute;
