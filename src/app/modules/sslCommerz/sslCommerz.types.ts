import z from "zod";
import { ssLCommerzSchemas } from "./sslCommerz.schema";

export type SSLCommerzPaymentInitializationProps = z.infer<
  typeof ssLCommerzSchemas.createPaymentSSLCommerz
>;
