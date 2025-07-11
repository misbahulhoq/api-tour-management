import express from "express";
import cors from "cors";
import router from "./app/router";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(200).send({ message: "Hello from express" });
});

export default app;
