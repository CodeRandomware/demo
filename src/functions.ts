// model
import userModel from "../models/user";

//Display all Users
export const displayUsers = async () => {
  return userModel.find({});
};

// Find User
export const findUser = async (userid: number) => {
  return userModel.findOne({ userID: userid });
};

// POST
export const addUser = (
  userid: number,
  userFname: string,
  userLname: string
) => {
  userModel.create({ userID: userid, fname: userFname, lname: userLname });
};

// PUT
export const updateUser = async (
  userFname: string,
  userLname: string,
  userid: number
) => {
  return userModel.findOneAndUpdate(
    { userID: userid },
    { fname: userFname, lname: userLname },
    { new: true }
  );
};

//DELETE
export const deleteUser = async (userid: number) => {
  return userModel.findOneAndRemove({ userID: userid });
};
