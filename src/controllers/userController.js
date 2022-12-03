import User from "../models/user.js";

export const getAllUsers = async (req, res) => {
  const data = await User.find();
  return res.json(data);
};


export const addUser = async (req, res) => {
  
}