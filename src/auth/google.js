import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  "http://localhost:3000/auth/google/callback"
);

export const AuthGoogle = async (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar"],
  });

  res.redirect(authUrl);
};

export const googleCallback = async (req, res) => {
  const { code } = req.query;

  oAuth2Client.getToken(code, (err, tokens) => {
    if (err) {
      res.send(`Error retrieving tokens: ${err}`);
      return;
    }
    oAuth2Client.setCredentials(tokens);
    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
    calendar.calendarList.list((err, calendarList) => {
      if (err) {
        res.send(`Error accessing calendar: ${err}`);
        return;
      }
      res.send(calendarList.data.items);
    });
  });
};
