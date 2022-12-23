import { Edge } from "edge.js";
import path, { join } from "path";
import gmailTransport from "./gmail.js";

const edge = new Edge({ cache: false });
const templatesPath = join(path.resolve(), "src/mail/templates");
edge.mount(templatesPath);

const sendMail = (to, subject, html) => {
  const options = {
    to,
    subject,
    html,
    from: "nikanozadze1010@gmail.com",
  };

  return gmailTransport.sendMail(options);
};

export const sendPasswordRecovery = async (to, hash, name, backLink) => {
  const html = edge.renderSync("password-recovery", {
    link: `${backLink}?hash=${hash}`,
    name,
  });

  return sendMail(to, "Reset Password", html);
};
