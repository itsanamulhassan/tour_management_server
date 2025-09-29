import { InferSchemaType, model, Schema } from "mongoose";
import { paymentStatusEnum } from "./payment.schemas";
import { fileSchema } from "../tour/tour.models";
import { MergeDocument } from "../../types/global.types";

const paymentSchema = new Schema(
  {
    amount: {
      type: Number,
      required: [true, "Payment amount is required."],
      min: [1, "Payment amount must be a positive number."],
    },
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Bookings",
      required: [true, "Booking ID is required."],
    },
    invoice: fileSchema,
    status: {
      type: String,
      enum: paymentStatusEnum,
      default: "UNPAID",
    },
    paymentGatewayData: {
      type: Schema.Types.Mixed,
    },
    transactionId: {
      type: String,
      unique: [true, "Transaction ID must be unique."],
      required: [true, "Transaction ID is required."],
    },
  },
  { timestamps: true, versionKey: false }
);

export type Payment = InferSchemaType<typeof paymentSchema>;
export type PaymentDocument = MergeDocument<Payment>;
export const Payments = model<Payment>("Payments", paymentSchema);
