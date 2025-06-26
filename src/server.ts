import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const port = process.env.PORT || 5000;
// const uri = process.env.MONGODB_URI as string;
const uri: string = "mongodb://localhost:27018/assignment_3";

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ Database connected");
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
