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
      message: message("update", "payment & update"),
      transactionId,
      amount: updatePayment.amount,
    };
  });
};
const failPayment = async () => {
  // Update booking status --> FAIL
  // Update payment status --> FAIL
};
const cancelPayment = async () => {
  // Update booking status --> CANCEL
  // Update payment status --> CANCEL
};
export const paymentServices = {
  successPayment,
  failPayment,
  cancelPayment,
};
