import mongoose, { Schema } from "mongoose";

const wineMakerSchema = new Schema({
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: true,
  },
  refreshJWT: {
    type: String,
    default: "",
  },
});

export default mongoose.model("WineMakers", wineMakerSchema);
