import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL || "mongodb://localhost:27017/playground")
    .then(() => {
      // eslint-disable-next-line no-console
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
};
