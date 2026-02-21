import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};


export default connectDB;
