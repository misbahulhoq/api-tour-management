import express from "express";

const app = express();
app.get("/", (req, res) => {
  res.status(200).send({ message: "Hello from express" });
});

app.use(express.json());
export default app;
