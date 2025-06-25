import app from "./app";
import { connectDB } from "./lib/db";
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`I am listing form assignment-3 | port ${PORT}`);
});
