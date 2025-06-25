import app from "./app";
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`I am listing form assignment-3 | port ${PORT}`);
});
