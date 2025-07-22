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
  street: z.string().optional(), // Optional street line
  city: z.string().min(1, { message: "City is required" }),
  division: z.string().min(1, { message: "Division is required" }),
  postalCode: z.string().optional(), // Optional postal code
  country: z.string().min(1, { message: "Country is required" }),
});

// ✅ Auth provider sub-document schema
export const authProviderSchema = z.object({
  provider: z.enum(authProviderEnum),
  providerId: z.string().min(1, { message: "Provider ID is required" }),
});

// ✅ Main user creation schema
const createUserSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" })
    .lowercase(),

  // Password is optional (e.g. social login), but if provided, must match regex
  password: z
    .string()
    .regex(passwordRegex, {
      message:
        "Password must be 6 - 32 characters long, include at least 1 uppercase letter and 1 special character",
    })
    .optional(),

  phone: z.string().optional(),
  avatar: z.url({ message: "Avatar must be a valid URL" }).optional(),

  // Embedded address object
  address: addressSchema.optional(),

  // Status flags
  isDeleted: z.boolean().default(false).optional(),
  isActive: z.enum(userActivityStatusEnum).default("ACTIVE"),
  isVerified: z.boolean().default(true).optional(),

  // Linked authentication providers
  auths: z
    .array(authProviderSchema)
    .min(1, { message: "At least one auth provider is required" })
    .default([]),

  // User role
  role: z.enum(userRoleStatusEnum).default("USER"),

  // References to bookings or guides
  booking: z.array(z.string()).optional(),
  guides: z.array(z.string()).optional(),
});

export const userSchemas = {
  createUserSchema,
};
