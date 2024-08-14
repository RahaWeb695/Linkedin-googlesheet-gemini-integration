import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });

const connectDatabase = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {})
    .then(() => {
      console.log(`MongoDB connected with server: ${mongoose.connection.host}`);
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error.message);
      process.exit(1); // Exit process with failure
    });
};

export default connectDatabase;
