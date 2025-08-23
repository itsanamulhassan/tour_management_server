import { Schema } from "mongoose";
import { CreateBookingProps } from "../payment/payment.types";
import { bookingStatusEnum } from "./booking.schemas";

const tourSchema = new Schema<CreateBookingProps>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "User ID is required."],
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: "Payments",
    },
    tour: {
      type: Schema.Types.ObjectId,
      ref: "Tours",
      required: [true, "Tour ID is required."],
    },
    guestCount: {
      type: Number,
      required: [true, "Number of guest is required."],
    },
    status: {
      type: String,
      enum: bookingStatusEnum,
      default: "PENDING",
    },
  },
  { timestamps: true }
);
