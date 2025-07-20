import dotenv from "dotenv";
dotenv.config();

export const envVars = {
  PORT: process.env.PORT || 5000,
  MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/playground",
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET || "something",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "30d",
  SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
};

export default envVars;
