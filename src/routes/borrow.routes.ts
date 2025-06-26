import { Router } from "express";
import { createBorrow, getSummary } from "../controllers/borrow.controllers";

const borrowRoute = Router();

borrowRoute.post("/", createBorrow);
borrowRoute.get("/", getSummary);

export default borrowRoute;
