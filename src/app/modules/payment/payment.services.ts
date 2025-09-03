import { Request } from "express";
import { withTransaction } from "../../database/transaction";
import { Payments } from "./payment.models";
import { Bookings } from "../booking/booking.models";
import { MongooseResponseProps } from "../../types/utils.types";
import { CreatePaymentProps } from "./payment.types";
import message from "../../utils/message";
import AppError from "../../utils/helpers/error/appError";
import { StatusCodes } from "http-status-codes";
import { CreateUserProps } from "../user/user.types";
import { sslServices } from "../sslCommerz/sslCommerz.services";
import { success } from "zod";

const successPayment = async (req: Request) => {
  const transactionId = req.query.transaction_id;
  // Update booking status --> CONFIRM
  // Update payment status --> PAID
  return withTransaction(async (session) => {
    const updatePayment = (await Payments.findOneAndUpdate(
      { transactionId },
      {
        status: "PAID",
      },
      {
        session,
        runValidators: true,
        new: true,
      }
    )) as MongooseResponseProps<CreatePaymentProps>;
    await Bookings.findByIdAndUpdate(
      updatePayment.booking,
      {
        status: "COMPLETE",
      },
      { session, runValidators: true, new: true }
    );
    return {
      success: true,
      message: message("success", "payment"),
      transactionId,
      amount: updatePayment.amount,
    };
  });
};
const failPayment = async (req: Request) => {
  const transactionId = req.query.transaction_id;
  // Update booking status --> FAIL
  // Update payment status --> FAIL

  return withTransaction(async (session) => {
    const updatePayment = (await Payments.findOneAndUpdate(
      { transactionId },
      {
        status: "FAIL",
      },
      {
        session,
        runValidators: true,
        new: true,
      }
    )) as MongooseResponseProps<CreatePaymentProps>;
    await Bookings.findByIdAndUpdate(
      updatePayment.booking,
      {
        status: "FAIL",
      },
      { session, runValidators: true, new: true }
    );
    return {
      success: false,
      message: message("fail", "payment"),
      transactionId,
      amount: updatePayment.amount,
    };
  });
};
const cancelPayment = async (req: Request) => {
  const transactionId = req.query.transaction_id;
  // Update booking status --> CANCEL
  // Update payment status --> CANCEL

  return withTransaction(async (session) => {
    const updatePayment = (await Payments.findOneAndUpdate(
      { transactionId },
      {
        status: "CANCEL",
      },
      {
        session,
        runValidators: true,
        new: true,
      }
    )) as MongooseResponseProps<CreatePaymentProps>;
    await Bookings.findByIdAndUpdate(
      updatePayment.booking,
      {
        status: "CANCEL",
      },
      { session, runValidators: true, new: true }
    );
    return {
      success: false,
      message: message("cancel", "payment"),
      transactionId,
      amount: updatePayment.amount,
    };
  });
};

const updatePayment = async (req: Request) => {
  const paymentId = req.params.id;

  const payment = await Payments.findById(paymentId);
  if (!payment) {
    throw new AppError(message("notFound", "payment"), StatusCodes.NOT_FOUND);
  }

  if (payment?.status === "PAID") {
    throw new AppError(message("badRequest", "payment"), StatusCodes.NOT_FOUND);
  }
  const booking = await Bookings.findById(payment.booking).populate("user", [
    "name",
    "email",
    "phone",
    "address",
  ]);
  if (!booking) {
    throw new AppError(message("notFound", "booking"), StatusCodes.NOT_FOUND);
  }

  const { address, email, name, phone } =
    booking?.user as Partial<CreateUserProps>;
  const sslPayment = await sslServices.sslCommerzPaymentInitialization({
    amount: payment.amount,
    address: JSON.stringify(address),
    email: email as string,
    name: name as string,
    phoneNumber: phone as string,
    transactionId: payment?.transactionId as string,
  });
  if (sslPayment?.GatewayPageURL) {
    return {
      success: true,
      sslPaymentUrl: sslPayment.GatewayPageURL,
    };
  }

  return { success: false };
};
export const paymentServices = {
  successPayment,
  failPayment,
  cancelPayment,
  updatePayment,
};
