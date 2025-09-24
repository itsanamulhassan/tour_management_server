import nodemailer from "nodemailer";
import env from "./env";
const transporter = nodemailer.createTransport({
  secure: true,
  auth: {
    pass: env.smtp.pass,
    user: env.smtp.user,
  },
  port: env.smtp.port,
  host: env.smtp.host,
});

export default transporter;
