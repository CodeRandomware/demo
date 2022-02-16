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

const userModel = model("week1_demos", userSchema);

export default userModel;
