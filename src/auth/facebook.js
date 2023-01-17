//routes

export const facebookCallback = async (req,res) => {
  console.log(req.user)
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

  const users = await User.findOne();

  const findUser = users.find((user) => validated.includes(user.email));
  if (findUser) {
  } else {
    return res.json({
      firstName: givenName,
      lastName: familyName,
      email: validated[0],
    });
  }
}




