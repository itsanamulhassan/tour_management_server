import { Request } from "express";

const userStatistics = async (req: Request) => {};
const bookingStatistics = async (req: Request) => {};
const paymentStatistics = async (req: Request) => {};
const tourStatistics = async (req: Request) => {};

export const statisticServices = {
  userStatistics,
  bookingStatistics,
  paymentStatistics,
  tourStatistics,
};
