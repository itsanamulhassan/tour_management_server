import { Users } from "../user/user.models";
import { userActivityStatusEnum } from "../user/user.schemas";
import { Tours } from "../tour/tour.models";
import { Bookings } from "../booking/booking.models";
import { Payments } from "../payment/payment.models";
const now = new Date();
const sevenDaysAgo = new Date(now).setDate(now.getDate() - 7);
const thirtyDaysAgo = new Date(now).setDate(now.getDate() - 30);
const oneYearAgo = new Date(now).setDate(now.getDate() - 365);

const userStatistics = async () => {
  const totalUsersPromise = Users.countDocuments();
  const totalActiveUsersPromise = Users.countDocuments({
    activityStatus: userActivityStatusEnum[0],
  });
  const totalInActiveUsersPromise = Users.countDocuments({
    activityStatus: userActivityStatusEnum[1],
  });
  const totalBlockUsersPromise = Users.countDocuments({
    activityStatus: userActivityStatusEnum[2],
  });
  const newUsersInLast7DaysPromise = Users.countDocuments({
    createdAt: { $gte: sevenDaysAgo },
  });
  const newUsersInLast30DaysPromise = Users.countDocuments({
    createdAt: { $gte: thirtyDaysAgo },
  });
  const newUsersInLast1YearPromise = Users.countDocuments({
    createdAt: { $gte: oneYearAgo },
  });

  const userByRolePromise = Users.aggregate([
    {
      $group: {
        _id: "$role",
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  const [
    totalUsers,
    totalActiveUsers,
    totalInActiveUsers,
    totalBlockedUsers,
    totalNewUsersInLast7Days,
    newUsersInLast30Days,
    newUsersInLast1Year,
    userByRole,
  ] = await Promise.all([
    totalUsersPromise,
    totalActiveUsersPromise,
    totalInActiveUsersPromise,
    totalBlockUsersPromise,
    newUsersInLast7DaysPromise,
    newUsersInLast30DaysPromise,
    newUsersInLast1YearPromise,
    userByRolePromise,
  ]);
  return {
    totalUsers,
    totalActiveUsers,
    totalInActiveUsers,
    totalBlockedUsers,
    totalNewUsersInLast7Days,
    newUsersInLast30Days,
    newUsersInLast1Year,
    userByRole,
  };
};
const bookingStatistics = async () => {
  const totalBookingPromise = Bookings.countDocuments();
  const totalBookingByStatusPromise = Bookings.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const bookingPerTourPromise = Bookings.aggregate([
    {
      $group: {
        _id: "$tour",
        bookingCount: { $sum: 1 },
      },
    },
    {
      $sort: {
        bookingCount: -1,
      },
    },
    {
      $limit: 10,
    },
    {
      $lookup: {
        from: "tours",
        localField: "_id",
        foreignField: "_id",
        as: "tour",
      },
    },
    {
      $unwind: "$tour",
    },
    {
      $project: {
        bookingCount: 1,
        "tour.title": 1,
        "tour.slug": 1,
      },
    },
  ]);

  const avgGuestCountPerBookingPromise = Bookings.aggregate([
    {
      $group: {
        _id: null,
        avgGuestCount: { $avg: "$guestCount" },
      },
    },
  ]);

  const booking7DaysAgoPromise = Bookings.countDocuments({
    createdAt: { $gte: sevenDaysAgo },
  });
  const bookingThirtyDaysAgoPromise = Bookings.countDocuments({
    createdAt: { $gte: thirtyDaysAgo },
  });
  const bookingOneYearsAgoPromise = Bookings.countDocuments({
    createdAt: { $gte: oneYearAgo },
  });
  const totalBookingByUniqueUsersPromise = Bookings.aggregate([
    {
      $group: {
        _id: "$user",
        bookingCount: {
          $sum: 1,
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        count: 1,
        "user.name": 1,
      },
    },
  ]);
  const [
    totalBooking,
    totalBookingByStatus,
    bookingPerTour,
    avgGuestCountPerBooking,
    booking7DaysAgo,
    bookingThirtyDaysAgo,
    bookingOneYearsAgo,
    totalBookingByUniqueUsers,
  ] = await Promise.all([
    totalBookingPromise,
    totalBookingByStatusPromise,
    bookingPerTourPromise,
    avgGuestCountPerBookingPromise,
    booking7DaysAgoPromise,
    bookingThirtyDaysAgoPromise,
    bookingOneYearsAgoPromise,
    totalBookingByUniqueUsersPromise,
  ]);
  return {
    totalBooking,
    totalBookingByStatus,
    bookingPerTour,
    avgGuestCountPerBooking: avgGuestCountPerBooking[0].avgGuestCount,
    booking7DaysAgo,
    bookingThirtyDaysAgo,
    bookingOneYearsAgo,
    totalBookingByUniqueUsers,
  };
};
const paymentStatistics = async () => {
  const totalPaymentPromise = Payments.countDocuments();
  const totalPaymentByStatusPromise = Payments.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  const totalRevenuePromise = Payments.aggregate([
    {
      $match: {
        status: "PAID",
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$amount" },
      },
    },
  ]);
  const avgPaymentAmountPromise = Payments.aggregate([
    {
      $group: {
        _id: null,
        avgPaymentAmount: { $avg: "$amount" },
      },
    },
  ]);

  const paymentGateWayDataPromise = Payments.aggregate([
    {
      $group: {
        _id: { $ifNull: ["$paymentGatewayData.status", "UNKNOWN"] },
        count: { $sum: 1 },
      },
    },
  ]);

  const [
    totalPayment,
    totalPaymentByStatus,
    totalRevenue,
    avgPaymentAmount,
    paymentGateWayData,
  ] = await Promise.all([
    totalPaymentPromise,
    totalPaymentByStatusPromise,
    totalRevenuePromise,
    avgPaymentAmountPromise,
    paymentGateWayDataPromise,
  ]);
  return {
    totalPayment,
    totalPaymentByStatus,
    totalRevenue,
    avgPaymentAmount,
    paymentGateWayData,
  };
};
const tourStatistics = async () => {
  const totalToursPromise = Tours.countDocuments();
  const totalToursByTourTypesPromise = await Tours.aggregate([
    {
      $lookup: {
        from: "tourtypes",
        foreignField: "_id",
        localField: "tourType",
        as: "type",
      },
    },
    {
      $unwind: "$type",
    },
    {
      $group: {
        _id: "$type.name",
        count: { $sum: 1 },
      },
    },
  ]);

  const totalToursByDivisionPromise = Tours.aggregate([
    {
      $lookup: {
        from: "divisions",
        foreignField: "_id",
        localField: "division",
        as: "division",
      },
    },
    { $unwind: "$division" },
    {
      $group: {
        _id: "$division.name",
        count: { $sum: 1 },
      },
    },
  ]);
  const avgTourCostPromise = Tours.aggregate([
    {
      $group: {
        _id: null,
        avgCostFrom: { $avg: "$costFrom" },
      },
    },
  ]);
  const totalHighestBookedTourPromise = Bookings.aggregate([
    {
      $group: {
        _id: "$tour",
        bookingCount: { $sum: 1 },
      },
    },
    {
      $sort: {
        bookingCount: -1,
      },
    },
    {
      $limit: 5,
    },

    {
      $lookup: {
        from: "tours",
        localField: "_id",
        foreignField: "_id",
        as: "tour",
      },
    },
    { $unwind: "$tour" },
    {
      $project: {
        _id: 0,
        "tour.title": 1,
        "tour.slug": 1,
        bookingCount: 1,
      },
    },
  ]);
  const [
    totalTours,
    totalToursByTourTypes,
    totalToursByDivision,
    avgTourCost,
    totalHighestBookedTour,
  ] = await Promise.all([
    totalToursPromise,
    totalToursByTourTypesPromise,
    totalToursByDivisionPromise,
    avgTourCostPromise,
    totalHighestBookedTourPromise,
  ]);
  return {
    totalTours,
    totalToursByTourTypes,
    totalToursByDivision,
    avgTourCost,
    totalHighestBookedTour,
  };
};

export const statisticServices = {
  userStatistics,
  bookingStatistics,
  paymentStatistics,
  tourStatistics,
};
