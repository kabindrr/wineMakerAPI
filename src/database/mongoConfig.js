import mongoose from "mongoose";

const uri = process.env.MONGO_DB_CONNECTION;

export const connectMongoDB = () => {
  try {
    mongoose.connect(uri);
    console.log("Database connected");
  } catch (error) {
    console.log("database not connected");
  }
};
