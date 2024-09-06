import dotenv from "dotenv";
dotenv.config();

const _Config = {
  port: process.env.PORT,
  mongodbURL: process.env.MONGODB_URL,
  secretKey: process.env.SECRETE_KEY,
};

const configuration = Object.freeze(_Config);
export default configuration;
