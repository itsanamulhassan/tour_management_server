import { Request } from "express";
import { withTransaction } from "../../database/transaction";
import { Payment, Payments } from "./payment.models";
import { Booking, Bookings } from "../booking/booking.models";
import message from "../../utils/message";
import AppError from "../../utils/helpers/error/appError";
import { StatusCodes } from "http-status-codes";
import { CreateUserDto } from "../user/user.types";
import { sslServices } from "../sslCommerz/sslCommerz.services";
import { User } from "../user/user.models";
import { Tour } from "../tour/tour.models";
import bookingInvoice from "../../utils/pdf/bookingInvoice";
import sendMail from "../../utils/sendEmail";
import { fileUploader } from "../../configurations/cloudinary";

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
    )) as Payment;
    const booking = (await Bookings.findByIdAndUpdate(
      updatePayment.booking,
      {
        status: "COMPLETE",
      },
      { session, runValidators: true, new: true }
    )
      .populate("user", ["name", "email", "phone"])
      .populate("tour", ["title"])) as unknown as Booking & {
      user: User;
      tour: Tour;
    };

    const invoiceData = {
      bookingAmount: updatePayment.amount,
      bookingDate: booking?.createdAt,
      clientEmail: booking.user.email,
      clientName: booking.user.name,
      clientPhone: booking.user.phone as string,
      guestCount: booking.guestCount,
      tourTitle: booking.tour.title,
      transactionID: updatePayment.transactionId,
    };

    const invoicePdf = (await bookingInvoice(
      invoiceData
    )) as Buffer<ArrayBufferLike>;

    const file = await fileUploader("booking_invoices", invoicePdf);
    await Payments.findOneAndUpdate(
      { transactionId },
      {
        invoice: {
          public_id: file.public_id,
          url: file.secure_url,
        },
      },
      {
        session,
        runValidators: true,
        new: true,
      }
    );

    await sendMail({
      subject: "Booking Confirmation",
      template: "invoice",
      to: "imransakib104@gmail.com",
      data: invoiceData,
      attachments: [
        {
          content: invoicePdf as Buffer<ArrayBufferLike>,
          contentType: "application/pdf",
          filename: "invoice.pdf",
        },
      ],
    });

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
    )) as Payment;
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
    )) as Payment;
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
    booking?.user as Partial<CreateUserDto>;
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
const retrievePayments = async () => {
  const payments = await Payments.find({});
  if (payments.length) {
    throw new AppError(message("notFound", "payments"), StatusCodes.NOT_FOUND);
  }
  return payments;
};
const retrievePayment = async (req: Request) => {
  const id = req.params.id;
  const payment = await Payments.findById(id);

  if (payment) {
    throw new AppError(message("notFound", "payments"), StatusCodes.NOT_FOUND);
  }
  return payment;
};

const retrievePaymentInvoice = async (req: Request) => {
  const id = req.params.id;

  const payment = await Payments.findById(id);
  if (!payment) {
    throw new AppError(message("notFound", "payment"), StatusCodes.NOT_FOUND);
  }
  return {
    invoice: payment.invoice,
  };
};
export const paymentServices = {
  successPayment,
  failPayment,
  cancelPayment,
  updatePayment,
  retrievePayments,
  retrievePayment,
  retrievePaymentInvoice,
};
