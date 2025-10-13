// Steps for confirming payment.
// Frontend -> User -> Tour -> Booking (Pending) -> Payment (Unpaid) -> SSLCommerz page -> (if Payment Completed) -> Backend (localhost:8888/api/v1/payments/success) -> Update Payment (Paid) & Booking (Confirm) -> Redirect to frontend success page

import { Request, Response } from "express";
import safeAsync from "../../utils/safeAsync";
import { paymentServices } from "./payment.services";
import env from "../../configurations/env";
import resHandler from "../../utils/resHandler";
import message from "../../utils/message";
import { StatusCodes } from "http-status-codes";
import { sslServices } from "../sslCommerz/sslCommerz.services";

// Steps for failure payment.
// Frontend -> User -> Tour -> Booking (Pending) -> Payment (Unpaid) -> SSLCommerz page -> (if Payment Failed / Cancel) -> Backend -> Update Payment (Fail) & Booking (Fail) -> Redirect to frontend failure page

const successPayment = safeAsync(async (req: Request, res: Response) => {
  const response = await paymentServices.successPayment(req);
  const query = `?status=success&message=${response.message}&amount=${response.amount}&transaction_id=${response.transactionId}`;
  if (response.success) {
    res.redirect(env.ssl.frontend.success_url + query);
  }
});
const failPayment = safeAsync(async (req: Request, res: Response) => {
  const response = await paymentServices.failPayment(req);
  const query = `?status=fail&message=${response.message}&amount=${response.amount}&transaction_id=${response.transactionId}`;
  if (!response.success) {
    res.redirect(env.ssl.frontend.fail_url + query);
  }
});
const cancelPayment = safeAsync(async (req: Request, res: Response) => {
  const response = await paymentServices.cancelPayment(req);
  const query = `?status=cancel&message=${response.message}&amount=${response.amount}&transaction_id=${response.transactionId}`;
  if (!response.success) {
    res.redirect(env.ssl.frontend.cancel_url + query);
  }
});

const updatePayment = safeAsync(async (req: Request, res: Response) => {
  const response = await paymentServices.updatePayment(req);
  if (response.success) {
    resHandler(res, {
      message: message("create", "SSLCommerz gateway page url"),
      success: true,
      status: StatusCodes.OK,
      data: {
        sslPaymentUrl: response.sslPaymentUrl,
      },
    });
  }
});

const retrievePayments = safeAsync(async (req: Request, res: Response) => {
  const payments = await paymentServices.retrievePayments();
  resHandler(res, {
    success: true,
    status: StatusCodes.OK,
    message: message("get", "payments"),
    data: payments,
  });
});
const retrievePayment = safeAsync(async (req: Request, res: Response) => {
  const payment = await paymentServices.retrievePayment(req);
  resHandler(res, {
    success: true,
    status: StatusCodes.OK,
    message: message("get", "payment"),
    data: payment,
  });
});

const retrievePaymentInvoice = safeAsync(
  async (req: Request, res: Response) => {
    const invoice = await paymentServices.retrievePaymentInvoice(req);
    resHandler(res, {
      success: true,
      status: StatusCodes.OK,
      message: message("get", "payment invoice"),
      data: invoice,
    });
  }
);

const validatePayment = safeAsync(async (req: Request, res: Response) => {
  await sslServices.validatePayment(req.body);
  resHandler(res, {
    success: true,
    status: StatusCodes.OK,
    message: message("success", "payment validation"),
  });
});

export const paymentControllers = {
  successPayment,
  failPayment,
  cancelPayment,
  updatePayment,
  retrievePayments,
  retrievePayment,
  retrievePaymentInvoice,
  validatePayment,
};
