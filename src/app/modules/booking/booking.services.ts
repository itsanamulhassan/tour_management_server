import { StatusCodes } from "http-status-codes";
import AppError from "../../utils/helpers/error/appError";
import { Users } from "../user/user.models";
import { CreateUserProps } from "../user/user.types";
import { Bookings } from "./booking.models";
import { CreateBookingProps } from "./booking.types";
import message from "../../utils/message";
import { Tours } from "../tour/tour.models";
import { CreateTourDto } from "../tour/tour.types";
import { Payments } from "../payment/payment.models";
import { transactionIdGenerator } from "../payment/payment.helpers/transactionIdGenerator";
import { withTransaction } from "../../database/transaction";
import { sslServices } from "../sslCommerz/sslCommerz.services";
import { CreatePaymentProps } from "../payment/payment.types";

const createBooking = async (payload: CreateBookingProps) => {
  return withTransaction(async (session) => {
    const user = (await Users.findById(
      payload.user
    )) as Partial<CreateUserProps>;
    if (!user?.phone) {
      throw new AppError(message("notFound", "phone"), StatusCodes.NOT_FOUND);
    }
    if (!user?.address) {
      throw new AppError(message("notFound", "address"), StatusCodes.NOT_FOUND);
    }

    const tour = (await Tours.findById(payload.tour).select(
      "costFrom"
    )) as Partial<CreateTourDto>;

    if (!tour?.costFrom) {
      throw new AppError(
        message("notFound", "tour cost"),
        StatusCodes.NOT_FOUND
      );
    }

    const bookingAmount = Number(tour.costFrom) * payload.guestCount;

    const latestBooking = await Bookings.create([payload], { session });
    const latestPayment = await Payments.create(
      [
        {
          booking: latestBooking[0]._id,
          amount: bookingAmount,
          transactionId: transactionIdGenerator(),
          status: "UNPAID",
        },
      ],
      { session }
    );
    const updateBooking = await Bookings.findByIdAndUpdate(
      latestBooking[0]._id,
      { payment: latestPayment[0]._id },
      { new: true, runValidators: true, session }
    )
      .populate("user", ["name", "email", "phone", "address"])
      .populate("tour", ["title", "costFrom"])
      .populate("payment");

    const { address, email, name, phone } =
      updateBooking?.user as Partial<CreateUserProps>;
    const payment = updateBooking?.payment as Partial<CreatePaymentProps>;

    const sslPayment = await sslServices.sslCommerzPaymentInitialization({
      amount: bookingAmount,
      address: JSON.stringify(address),
      email: email as string,
      name: name as string,
      phoneNumber: phone as string,
      transactionId: payment?.transactionId as string,
    });

    return {
      booking: updateBooking,
      sslPaymentUrl: sslPayment?.GatewayPageURL,
    };
  });
};
const updateBooking = async (req: Request) => {
  console.log("");
};
const updateBookingStatus = async (req: Request) => {
  console.log("");
};
const deleteBooking = async (req: Request) => {
  console.log("");
};
const retrieveBookings = async (_req: Request) => {
  console.log("");
};
const retrieveBooking = async (req: Request) => {
  console.log("");
};
const retrieveBookingMe = async (req: Request) => {
  console.log("");
};
export const bookingServices = {
  createBooking,
  updateBooking,
  deleteBooking,
  retrieveBookings,
  retrieveBooking,
  retrieveBookingMe,
  updateBookingStatus,
};
