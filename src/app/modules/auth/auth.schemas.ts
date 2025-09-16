import * as z from "zod";
import { passwordRegex } from "../user/user.schemas";

const credentialSignInSchema = z.object({
  email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" })
    .lowercase(),

  password: z.string().regex(passwordRegex, {
    message:
      "Password must be 6 - 32 characters long, include at least 1 uppercase letter and 1 special character",
  }),
});

const resetPasswordSchema = z.object({
  previousPassword: z.string().regex(passwordRegex, {
    message:
      "Previous password must be 6 - 32 characters long, include at least 1 uppercase letter and 1 special character",
  }),
  latestPassword: z.string().regex(passwordRegex, {
    message:
      "Latest password must be 6 - 32 characters long, include at least 1 uppercase letter and 1 special character",
  }),
});

const changePasswordSchema = z.clone(resetPasswordSchema);
const setPasswordSchema = z.object({
  password: z.string().regex(passwordRegex, {
    message:
      "Password must be 6 - 32 characters long, include at least 1 uppercase letter and 1 special character",
  }),
});

export const authSchemas = {
  credentialSignInSchema,
  resetPasswordSchema,
  changePasswordSchema,
  setPasswordSchema,
};
