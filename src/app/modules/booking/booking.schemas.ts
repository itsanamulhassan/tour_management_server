// USER -> BOOKING (PENDING) -> PAYMENT (UNPAID) -> SSLCOMMERZ -> BOOKING UPDATE -> CONFIRM -> PAYMENT UPDATE -> PAID (SUCCESSFUL)

import z from "zod";

export const bookingStatusEnum = [
  "PENDING",
  "CANCEL",
  "COMPLETE",
  "FAIL",
] as const;

const createBooking = z.object({
  user: z
    .string({ error: "User ID must be a string." })
    .min(1, { error: "User ID is required." }),
  tour: z
    .string({ error: "Tour ID must be a string." })
    .min(1, { error: "Tour ID is required." }),
  payment: z.string({ error: "Tour ID must be a string." }).optional(),
  guestCount: z
    .number({ error: "Number of guest must be a number." })
    .positive({ error: "Number of guest must be a positive number" })
    .min(1, { error: "Number of guest is required." }),
  status: z.enum(bookingStatusEnum).default("PENDING"),
});
export const bookingSchemas = {
  createBooking,
};
