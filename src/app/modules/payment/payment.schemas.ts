import z from "zod";

const paymentStatusEnum = [
  "PAID",
  "UNPAID",
  "CANCEL",
  "FAIL",
  "REFUND",
] as const;
const createPayment = z.object({
  booking: z
    .string({ error: "Booking ID must a string." })
    .min(1, { error: "Booking ID is required." }),
  transactionId: z
    .string({ error: "Transaction ID must be a string." })
    .min(1, { error: "Transaction ID is required." }),
  amount: z
    .number({ error: "Payment amount must be a number." })
    .positive({ error: "Payment amount must be a positive number." })
    .min(1, { error: "Payment amount is required." }),
  paymentGatewayData: z.any().optional(),
  invoiceUrl: z.string({ error: "Invoice URL must be a string" }).optional(),
  status: z.enum(paymentStatusEnum).default("UNPAID"),
});

export const paymentSchemas = {
  createPayment,
};
