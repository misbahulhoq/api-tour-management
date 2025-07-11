import dotenv from "dotenv";
dotenv.config();

export const envVars = {
  PORT: process.env.PORT || 5000,
  MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/playground",
  NODE_ENV: process.env.NODE_ENV || "development",
};

export default envVars;
