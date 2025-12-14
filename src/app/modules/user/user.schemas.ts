import * as z from "zod";

// ✅ Password regex: At least 1 uppercase, 1 special char, 6–32 characters
export const passwordRegex =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\\{};':"|,.<>/?]).{6,32}$/;
// ✅ User activity status enum
export const userActivityStatusEnum = [
  "ACTIVE",
  "INACTIVE",
  "BLOCKED",
] as const;
// ✅ User role status enum
export const userRoleStatusEnum = [
  "USER",
  "ADMIN",
  "GUIDE",
  "SUPERADMIN",
] as const;
// ✅ Auth provider enum
export const authProviderEnum = ["GOOGLE", "FACEBOOK", "CREDENTIAL"] as const;

// ✅ User address schema
export const addressSchema = z.object({
  street: z.string({ error: "Street must be a string." }).optional(), // Optional street line
  city: z
    .string({ error: "City must be a string." })
    .min(1, { error: "City is required." }),
  division: z
    .string({ error: "Division must be a string." })
    .min(1, { error: "Division is required." }),
  postalCode: z.string({ error: "Postal code must be a string." }).optional(), // Optional postal code
  country: z
    .string({ error: "Country must be a string." })
    .min(1, { error: "Country is required." }),
});

// ✅ Auth provider sub-document schema
export const authProviderSchema = z.object({
  provider: z.enum(authProviderEnum),
  providerId: z
    .string({ error: "Authentication provided id must be a string." })
    .min(1, { error: "Provider ID is required." }),
});

// ✅ Main user creation schema
const createUser = z.object({
  name: z
    .string({ error: "Name must be a string." })
    .min(1, { error: "Name is required." }),
  email: z
    .email({ error: "Invalid email address." })
    .min(1, { error: "Email is required." })
    .lowercase(),

  // Password is optional (e.g. social login), but if provided, must match regex
  password: z.string().regex(passwordRegex, {
    error:
      "Password must be 6 - 32 characters long, include at least 1 uppercase letter and 1 special character.",
  }),
});
const updateUser = createUser.omit({
  email: true,
  password: true,
});
export const userSchemas = {
  createUser,
  updateUser,
};
