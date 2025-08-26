import { model, Schema } from "mongoose";
import { CreatePaymentProps } from "./payment.types";
import { paymentStatusEnum } from "./payment.schemas";

const paymentSchema = new Schema<CreatePaymentProps>(
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
    invoiceUrl: {
      type: String,
    },
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

export const Payments = model<CreatePaymentProps>("Payments", paymentSchema);
