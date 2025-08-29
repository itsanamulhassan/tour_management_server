import env from "../../configurations/env";
import { SSLCommerzPaymentInitializationProps } from "./sslCommerz.types";

const sslCommerzPaymentInitialization = (
  payload: SSLCommerzPaymentInitializationProps
) => {
  const { address, amount, transactionId, email, name, phoneNumber } = payload;
  const {
    ssl: { payment_api, store_id, store_pass, validation_api },
  } = env;
  const data = {
    store_id,
    store_passwd: store_pass,
    total_amount: amount,
    currency: "BDT",
    tran_id: transactionId,
    success_url: "http://localhost:8888/api/v1/payments/success",
    fail_url: "http://localhost:8888/api/v1/payments/failure",
    cancel_url: "http://yoursite.com/cancel.php",
    cus_name: "Customer Name",
    cus_email: "cust@yahoo.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: "1000",
    ship_country: "Bangladesh",
    multi_card_name: "mastercard,visacard,amexcard",
    value_a: "ref001_A",
    value_b: "ref002_B",
    value_c: "ref003_C",
    value_d: "ref004_D",
  };
};
