import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import bookRoute from "./routes/book.routes";

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api/books", bookRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("I am working form assignment-3");
});

export default app;
