import z from "zod";
import { bookingSchemas } from "../booking/booking.schemas";
import { Types } from "mongoose";

// ✅ Type representing a booking creation payload
export type CreateBookingProps = Omit<
  z.infer<typeof bookingSchemas.createBooking>,
  "user" | "payment" | "tour"
> & {
  tour: Types.ObjectId;
  user: Types.ObjectId;
  payment?: Types.ObjectId;
};
