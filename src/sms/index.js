import twilio, { Twilio } from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

export const sendMessages = (body, to) => {
  return client.messages.create({
    body,
    to,
    from: process.env.TWILIO_PHONE,
  });
};
