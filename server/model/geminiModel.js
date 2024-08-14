import mongoose from "mongoose";

const { Schema } = mongoose;

const geminiSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imageUrls: {
    type: Array,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("Gemini", geminiSchema);

export default User;
