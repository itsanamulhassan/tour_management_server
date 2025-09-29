import { InferSchemaType, model, Schema } from "mongoose";
import { bookingStatusEnum } from "./booking.schemas";
import { MergeDocument } from "../../types/global.types";

const bookingSchema = new Schema(
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
      min: [1, "Number of guest must be a positive number."],
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

export type Booking = InferSchemaType<typeof bookingSchema>;
export type BookingDocument = MergeDocument<Booking>;

export const Bookings = model<Booking>("Bookings", bookingSchema);
