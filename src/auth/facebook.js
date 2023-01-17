import User from "../models/User.js";
//routes

export const facebookCallback = async (req,res) => {
  console.log(req.user)
  if (!req.user) {
    return res.status(404).json({ message: "მონაცემები არასწორია" });
  }
  const {
    email,
    name,
  } = req.user;

  const user = await User.findOne({email});

  if (user) {
    const signData = {
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
    };

    const token = jwt.sign(signData, process.env.JWT_SECRET);

    return res.json({ token });
  } else {
    return res.json({
      name,
      email,
    });
  }
}




