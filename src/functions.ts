// model
import userModel from "../models/user";

//Display all Users
export const displayUsers = () => {
  return userModel
    .find({})
    .then((value) => {
      return value;
    })
    .catch((error) => {
      return error;
    });
};

// Find User
export const findUser = async (userid: number) => {
  return await userModel
    .findOne({ userID: userid })
    .then((value) => {
      return value;
    })
    .catch((error) => {
      return error;
    });
};

// POST
export const addUser = (
  userid: number,
  userFname: string,
  userLname: string
) => {
  try {
    userModel.create({ userID: userid, fname: userFname, lname: userLname });

    return "User Added";
  } catch (error) {
    return error;
  }
};

// PUT
export const updateUser = async (
  userFname: string,
  userLname: string,
  userid: number
) => {
  try {
    return await userModel.findOneAndUpdate(
      { userID: userid },
      { fname: userFname, lname: userLname },
      { new: true }
    );
  } catch (error) {
    return error;
  }
};

//DELETE
export const deleteUser = async (userid: number) => {
  try {
    return await userModel.findOneAndRemove({ userID: userid });
  } catch (error) {
    return error;
  }
};
