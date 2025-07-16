import express from "express";
import cors from "cors";
import router from "./app/router";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(200).send({ message: "Hello from express" });
});

// global error hanlder middleware
app.use(globalErrorHandler);
app.use(notFound);

export default app;
