import mongoose from "mongoose";

const { Schema } = mongoose;

const sheetSchema = new Schema({
  user: {
    type: String,
  },
  title: {
    type: String,
  },
  imageUrls: {
    type: Array,
  },
  sheetId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Sheet = mongoose.model("Sheet", sheetSchema);

export default Sheet;
