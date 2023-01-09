import MobileVerification from "../models/MobileVerification.js";
import { sendMessages } from "../sms/index.js";

export const mobileVerification = async (req, res) => {
  const { phone } = req.body;

  if (!/^[+]\d{12}$/.test(phone)) {
    return res
      .status(404)
      .json({ message: "არ სეესაბამება მობილურის ფორმატს" });
  }

  const code = Math.floor(Math.random() * 10 ** 5);

  await MobileVerification.create({
    mobile: phone,
    code,
  });

  await sendMessages(`code: ${code}`, phone);

  return res.status(201).json({ message: "code sent successfully" });
};

export const verifyCode = async (req, res) => {
  const { code } = req.body;

  const mobile = await MobileVerification.findOne({ code: +code });

  if (!mobile) {
    return res.status(404).json({ message: "მონაცემები არასწორია" });
  }

  await MobileVerification.deleteMany({ mobile: mobile.mobile });
  return res.status(201).json({ message: "mobile number verified" });
};
