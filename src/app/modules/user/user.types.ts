import * as z from "zod";

// Import Zod schemas
import {
  addressSchema,
  authProviderEnum,
  authProviderSchema,
  createUserSchema,
  userActivityStatusEnum,
  userRoleStatusEnum,
} from "./user.schema";

// ✅ Type representing a user creation payload
export type CreateUserProps = z.infer<typeof createUserSchema>;

// ✅ Type representing an address sub-document
export type AddressProps = z.infer<typeof addressSchema>;

// ✅ Type representing an authentication provider entry
export type AuthProviderProps = z.infer<typeof authProviderSchema>;

// ✅ Type representing a user role status enum
export type UserRoleStatusEnumProps = (typeof userRoleStatusEnum)[number];

// ✅ Type representing a user activity status enum
export type UserActivityStatusEnumProps =
  (typeof userActivityStatusEnum)[number];
// ✅ Type representing a authentication provider enum
export type authProviderEnumProps = (typeof authProviderEnum)[number];
