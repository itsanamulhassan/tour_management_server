import z from "zod";
import { Types } from "mongoose";
import { paymentSchemas } from "./payment.schemas";

// ✅ Type representing a payment creation payload
export type CreatePaymentProps = Omit<
  z.infer<typeof paymentSchemas.createPayment>,
  "booking"
> & {
  booking: Types.ObjectId;
};
