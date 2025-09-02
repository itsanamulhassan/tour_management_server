import { Request } from "express";
import { withTransaction } from "../../database/transaction";
import { Payments } from "./payment.models";
import { Bookings } from "../booking/booking.models";
import { MongooseResponseProps } from "../../types/utils.types";
import { CreatePaymentProps } from "./payment.types";
import message from "../../utils/message";

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
export const paymentServices = {
  successPayment,
  failPayment,
  cancelPayment,
};
