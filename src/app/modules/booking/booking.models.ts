import { model, Schema } from "mongoose";
import { bookingStatusEnum } from "./booking.schemas";
import { CreateBookingProps } from "./booking.types";

const bookingSchema = new Schema<CreateBookingProps>(
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
      uppercase: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Bookings = model<CreateBookingProps>("Bookings", bookingSchema);
