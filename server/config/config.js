import dotenv from "dotenv";
dotenv.config();

const _Config = {
  port: process.env.PORT,
  client_url: process.env.CLIENT_URL,
  mongodbURL: process.env.MONGODB_URL,
  mode: process.env.NODE_ENV,
  secretKey: process.env.SECRETE_KEY,
  cloudName: process.env.CLOUDNAME,
  cloud_Api_Key: process.env.CLOUD_API_KEY,
  cloud_Api_Secret: process.env.CLOUD_API_SECRET,
};

const configuration = Object.freeze(_Config);
export default configuration;
