import express from "express";
import { UserRoutes } from "./app/modules/user/user.route";

const app = express();

app.use("/api/v1/user", UserRoutes);
app.get("/", (req, res) => {
  res.status(200).send({ message: "Hello from express" });
});

app.use(express.json());
export default app;
