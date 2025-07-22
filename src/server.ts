/* eslint-disable no-console */

import mongoose from "mongoose";
import { Server } from "http";
import app from "./app";
import envVars from "./app/config/envvars.config";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";
const { PORT, MONGO_URL } = envVars;
let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
    server = app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
      seedSuperAdmin();
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

// process.on("SIGTERM", () => {
//   console.log("SIGTERM is received, server shutting down");
//   if (server) {
//     server.close();
//   }
// });

// process.on("SIGINT", () => {
//   console.log(" sigint received, server shutting down");
//   if (server) {
//     server.close();
//   }
//   process.exit(0);
// });

process.on("exit", (code) => {
  console.log("prcess exit code is ", code);
});

process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection happened", error);
  if (server) {
    server.close(() => {
      console.log(error);
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", (error) => {
  console.log("uncaughtException happened", error);
  console.log(error);
  process.exit(1);
});
