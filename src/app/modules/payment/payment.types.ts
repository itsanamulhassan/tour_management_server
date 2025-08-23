// import z from "zod";
// import { Types } from "mongoose";
// import { paymentSchemas } from "./payment.schemas";

// // ✅ Type representing a booking creation payload
// export type CreatePaymentProps = Omit<
//   z.infer<typeof paymentSchemas.createPayment>,
//   "user" | "payment" | "tour"
// > & {
//   tour: Types.ObjectId;
//   user: Types.ObjectId;
//   payment?: Types.ObjectId;
// };
