import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb connected successfully");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
