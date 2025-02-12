import mongoose from "mongoose";

import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "provide DB_URI environment variable inside .env.<development/production>.local",
  );
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);

    console.log(`connected to ${NODE_ENV} database`);
  } catch (error) {
    console.log("Error while connecting to database: ", error);

    process.exit(1);
  }
};

export default connectToDatabase;
