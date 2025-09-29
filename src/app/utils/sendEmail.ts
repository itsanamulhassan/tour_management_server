import env from "../configurations/env";
import transporter from "../configurations/nodemailer";
import { SendMailProps } from "../types/utils.types";
import path from "path";
import ejs from "ejs";
import AppError from "./helpers/error/appError";
import { StatusCodes } from "http-status-codes";
import message from "./message";

const sendMail = async <T>({
  subject,
  to,
  attachments,
  template,
  data,
}: SendMailProps<T>) => {
  try {
    const file = path.join(__dirname, "..", "templates", `${template}.ejs`);

    const html = await ejs.renderFile(file, data && data);
    await transporter.sendMail({
      from: env.smtp.from,
      to,
      subject,
      html,
      attachments,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(
        message("badRequest", "email sender", error.message),
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
};

// http://localhost:5173/forget_password?id=6884bd0d8ff3a6be2286fd15&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVkZW50aWFsSWQiOiI2ODg0YmQwZDhmZjNhNmJlMjI4NmZkMTUiLCJlbWFpbCI6InR1aGluY2xvdWQ2NjVAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzU4MzI1MzgyLCJleHAiOjE3NTgzMjU5ODJ9.nA4vZyPgs-LcnusDUdnXS897oRm1ZPcC-BE9jxSRc0c

export default sendMail;
