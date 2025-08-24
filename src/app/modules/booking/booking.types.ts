import { Types } from "mongoose";
import { bookingSchemas } from "./booking.schemas";
import z from "zod";

// ✅ Type representing a booking creation payload
export type CreateBookingProps = Omit<
  z.infer<typeof bookingSchemas.createBooking>,
  "user" | "payment" | "tour"
> & {
  tour: Types.ObjectId;
  user: Types.ObjectId;
  payment?: Types.ObjectId;
};
