import express, { Request, Response } from "express";
import cors from "cors";
import bookRoute from "./routes/book.routes";
import borrowRoute from "./routes/borrow.routes";

const app = express();

app.use(cors());
app.use(express.json());

// book router
app.use("/api/books", bookRoute);
// borrow router
app.use("/api/borrow", borrowRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("I am working form assignment-3");
});

export default app;
