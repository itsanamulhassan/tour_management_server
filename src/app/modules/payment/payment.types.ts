import z from "zod";
import { paymentSchemas } from "./payment.schemas";

// ✅ Type representing a payment creation payload
export type CreatePaymentProps = z.infer<typeof paymentSchemas.createPayment>;
