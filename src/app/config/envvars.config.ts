import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = [
  "NODE_ENV",
  "MONGO_URL",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "SALT_ROUNDS",
  "SUPER_ADMIN_EMAIL",
  "SUPER_ADMIN_PASS",
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing environment variable: ${envVar}`);
  }
});

export const envVars = {
  PORT: process.env.PORT || 5000,
  MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/playground",
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET || "something",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "30d",
  SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PASS: process.env.SUPER_ADMIN_PASS,
};

export default envVars;
