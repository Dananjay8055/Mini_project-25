import auth from "../controllers/authController.js";
import { User } from "../models/UserModels.js";
import { getRoleId } from "../helpers/dbLookup.js";

const createUser = async (req, res) => {
  console.log(req.body);
  //   console.log(req);

  const { name, email, password, phone, gender, dob, address, roleID } =
    req.body;
  const appwriteuser = await auth.signup({ email, password, name, phone });
  const userID = appwriteuser.$id;
  const role = await getRoleId(roleID);
  console.log(role);
  
  const user = new User({
    _id: userID,
    userID,
    name,
    email,
    phone,
    gender,
    dob,
    address,
    roleID:role
  });
  await user.save();
    return res.status(200).json({
      status: "success",
      message: "User created successfully",
      data: user,
    });
};

const getUser = async (req, res) => {
  const { _id } = req.params;
  console.log(req.params);
  try {
    const user = await User.findById(_id);
    console.log(user);
    
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    } else {
      return res.status(200).json({
        status: "success",
        message: "User found successfully",
        data: user,
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};


export {createUser,getUser};