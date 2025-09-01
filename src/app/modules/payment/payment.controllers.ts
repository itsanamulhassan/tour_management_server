// Steps for confirming payment.
// Frontend -> User -> Tour -> Booking (Pending) -> Payment (Unpaid) -> SSLCommerz page -> (if Payment Completed) -> Backend (localhost:8888/api/v1/payments/success) -> Update Payment (Paid) & Booking (Confirm) -> Redirect to frontend success page

import { Request, Response } from "express";
import safeAsync from "../../utils/safeAsync";
import { paymentServices } from "./payment.services";
import env from "../../configurations/env";

// Steps for failure payment.
// Frontend -> User -> Tour -> Booking (Pending) -> Payment (Unpaid) -> SSLCommerz page -> (if Payment Failed / Cancel) -> Backend -> Update Payment (Fail) & Booking (Fail) -> Redirect to frontend failure page

const successPayment = safeAsync(async (req: Request, res: Response) => {
  const response = await paymentServices.successPayment(req);
  const query = `?status=success&message=${response.message}&amount=${response.amount}&transaction_id=${response.transactionId}`;
  if (response.success) {
    res.redirect(env.ssl.frontend.success_url + query);
  }
});
const failPayment = safeAsync(async (req: Request, res: Response) => {});
const cancelPayment = safeAsync(async (req: Request, res: Response) => {});

export const paymentControllers = {
  successPayment,
  failPayment,
  cancelPayment,
};
