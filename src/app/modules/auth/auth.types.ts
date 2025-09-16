import * as z from "zod";
import { authSchemas } from "./auth.schemas";

// ✅ Type representing the credential signin properties
export type CredentialSignInProps = z.infer<
  typeof authSchemas.credentialSignInSchema
>;
// ✅ Type representing the reset password properties
export type ResetPasswordProps = z.infer<
  typeof authSchemas.resetPasswordSchema
>;

// ✅ Type representing the set password properties
export type SetPasswordProps = z.infer<typeof authSchemas.setPasswordSchema>;
// ✅ Type representing the change password properties
export type ChangePasswordProps = z.infer<
  typeof authSchemas.changePasswordSchema
>;
