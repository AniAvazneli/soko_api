import { Edge } from "edge.js";
import path from "path";
import gmailTransport from "./gmail";

const edge = new Edge({ cache: false });
const templatesPath = join(path.resolve(), "src/mail/templates");
edge.mount(templatesPath);

const send = (to, subject, html) => {
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

  return send(to, "Reset Password", html);
};
