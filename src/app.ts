import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/router";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import passport from "passport";
import expressSession from "express-session";
const app = express();
import "./app/config/passport";

// middleware
app.use(
  expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1", router);

app.get("/", (_req, res) => {
  res.status(200).send({ message: "Hello from express" });
});

// global error hanlder middleware
app.use(globalErrorHandler);
app.use(notFound);

export default app;
