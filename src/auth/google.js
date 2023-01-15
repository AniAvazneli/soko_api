import User from "../models/User.js";

export const googleCallback = async (req, res) => {
  if (!req.user) {
    return res.status(404).json({ message: "მონაცემები არასწორია" });
  }
  const {
    emails,
    name: { familyName, givenName },
  } = req.user;
  const validated = emails
    .filter((email) => email.verified)
    .map((email) => email.value);

  const users = await User.find();

  const findUser = users.find((user) => validated.includes(user.email));
  if (findUser) {
  } else {
    return res.json({
      firstName: givenName,
      lastName: familyName,
      email: validated[0],
    });
  }
};
