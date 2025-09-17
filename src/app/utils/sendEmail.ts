import env from "../configurations/env";
import transporter from "../configurations/nodemailer";
import { SendMailProps } from "../types/utils.types";

const sendMail = async ({
  subject,
  to,
  attachments,
  template,
  data,
}: SendMailProps) => {
  const info = transporter.sendMail({
    from: env.smtp.from,
    to,
    subject,
    html: template,
    attachments,
  });
};
