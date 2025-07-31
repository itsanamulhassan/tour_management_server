import * as z from "zod";
import { authSchemas } from "./auth.schema";

// ✅ Type representing the credential signin properties
export type CredentialSignInProps = z.infer<
  typeof authSchemas.credentialSignInSchema
>;
// ✅ Type representing the reset password properties
export type ResetPasswordProps = z.infer<
  typeof authSchemas.resetPasswordSchema
>;
