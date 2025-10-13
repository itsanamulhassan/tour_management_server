import { StatusCodes } from "http-status-codes";
import env from "../../configurations/env";
import AppError from "../../utils/helpers/error/appError";
import { SSLCommerzPaymentInitializationProps } from "./sslCommerz.types";
import axios from "axios";
import { Payments } from "../payment/payment.models";
import message from "../../utils/message";

const sslCommerzPaymentInitialization = async (
  payload: SSLCommerzPaymentInitializationProps
) => {
  try {
    const { address, amount, transactionId, email, name, phoneNumber } =
      payload;
    const {
      ssl: {
        payment_api,
        store_id,
        store_pass,
        backend: { success_url, fail_url, cancel_url, ipn_url },
      },
    } = env;
    const query = "?transaction_id=" + transactionId;
    const data = {
      store_id,
      store_passwd: store_pass,
      total_amount: amount,
      currency: "BDT",
      tran_id: transactionId,
      success_url: success_url + query,
      fail_url: fail_url + query,
      cancel_url: cancel_url + query,
      ipn_url,
      shipping_method: "N/A",
      product_name: "Tour",
      product_category: "Service",
      product_profile: "general",

      cus_name: name,
      cus_email: email,
      cus_add1: address,
      cus_add2: "N/A",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: phoneNumber,
      cus_fax: "01711111111",
      ship_name: "N/A",
      ship_add1: "N/A",
      ship_add2: "N/A",
      ship_city: "N/A",
      ship_state: "N/A",
      ship_postcode: "1000",
      ship_country: "N/A",
    };
    const res = await axios({
      method: "POST",
      url: payment_api,
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.data;
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error("SSLCOMMERZ payment initialization error!", error);
    let message = "An unexpected error occurred";

    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "string") {
      message = error;
    }

    throw new AppError(message, StatusCodes.BAD_REQUEST);
  }
};
const validatePayment = async (payload: Record<string, string>) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${env.ssl.validation_api}?val_id=${payload.val_id}&store_id=${env.ssl.store_id}&store_passwd=${env.ssl.store_pass}`,
    });

    await Payments.updateOne(
      { transactionId: payload.tran_id },
      { paymentGatewayData: response.data },
      {
        runValidators: true,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(
        message("badRequest", "payment validation", error.message),
        StatusCodes.BAD_REQUEST
      );
    }
  }
};

export const sslServices = {
  sslCommerzPaymentInitialization,
  validatePayment,
};
