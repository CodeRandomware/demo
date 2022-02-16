import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userID: Number,
    fname: String,
    lname: String,
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true }
);

const userModel = model("usersdbs", userSchema);

export default userModel;
