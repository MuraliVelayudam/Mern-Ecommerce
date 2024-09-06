import mongoose from "mongoose";
import configuration from "./config.js";

const mongodb = configuration.mongodbURL;

const connectDb = async () => {
  try {
    await mongoose.connect(mongodb);
    console.log(`Successfully connected to Database`);
  } catch (error) {
    console.log(`Failed to connect to DB : Error : ${error} `);
    process.exit(1);
  }
};

export default connectDb;
