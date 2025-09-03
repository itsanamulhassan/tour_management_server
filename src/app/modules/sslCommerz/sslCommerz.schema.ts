import z from "zod";

const createPaymentSSLCommerz = z.object({
  amount: z
    .number({ error: "Amount must be a number." })
    .min(1, { error: "Amount is required." }),
  transactionId: z
    .string({ error: "Transaction ID must be a string." })
    .min(1, { error: "Transaction ID is required." }),
  name: z
    .string({ error: "Name must be a string." })
    .min(1, { error: "Name is required." }),
  email: z
    .email({ error: "Email must be a valid email format." })
    .min(1, { error: "Email is required." }),
  phoneNumber: z
    .string({ error: "Phone number must be a string." })
    .min(1, { error: "Phone number is required." }),
  address: z
    .string({ error: "Address must be a string." })
    .min(1, { error: "Address is required." }),
});

export const ssLCommerzSchemas = {
  createPaymentSSLCommerz,
};
