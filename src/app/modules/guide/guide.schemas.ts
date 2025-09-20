import z from "zod";

export const guideStatusEnum = [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "ARCHIVED",
] as const;

const createGuideSchema = z.object({
  user: z
    .string({ error: "User ID must be a string." })
    .min(1, { error: "User is required." }),
  division: z
    .string({ error: "Division ID must be a string." })
    .min(1, { error: "Division ID is required." }),
  status: z.enum(guideStatusEnum).default("PENDING").optional(),
});

export const guideSchema = {
  createGuideSchema,
};
