import * as z from "zod";

// Import Zod schemas
import {
  addressSchema,
  authProviderSchema,
  createUserSchema,
} from "./user.schema";

// ✅ Type representing a user creation payload
export type CreateUserProps = z.infer<typeof createUserSchema>;

// ✅ Type representing an address sub-document
export type AddressProps = z.infer<typeof addressSchema>;

// ✅ Type representing an authentication provider entry
export type AuthProviderProps = z.infer<typeof authProviderSchema>;
