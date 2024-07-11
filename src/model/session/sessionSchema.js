import mongoose, { Schema } from "mongoose";
import { token } from "morgan";

const schema = new Schema({
  token: {
    type: String,
    required: true,
  },
  associate: {
    type: String,
    default: null,
  },
});
export default mongoose.model("sessionTable", schema);
