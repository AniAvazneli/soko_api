import MobileVerification from "../models/MobileVerification.js";
import { sendMessages } from "../sms/index.js";

export const mobileVerification = async (req, res) => {
  const { phone } = req.body;

  if (!/^[+]\d{12}$/.test(phone)) {
    return res
      .status(404)
      .json({ message: "არ სეესაბამება მობილურის ფორმატს" });
  }

  const code = Math.floor(Math.random() * 10 ** 7);

  await MobileVerification.create({
    mobile: phone,
    code,
  });

  await sendMessages(`code: ${code}`, phone);

  return res.status(201).json({ message: "code sent successfully" });
};
