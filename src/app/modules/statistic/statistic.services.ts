import { Request } from "express";
import { Users } from "../user/user.models";
import { userActivityStatusEnum } from "../user/user.schemas";
import { Tours } from "../tour/tour.models";
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
const bookingStatistics = async (req: Request) => {};
const paymentStatistics = async (req: Request) => {};
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
  const [totalTours, totalToursByTourTypes, totalToursByDivision, avgTourCost] =
    await Promise.all([
      totalToursPromise,
      totalToursByTourTypesPromise,
      totalToursByDivisionPromise,
      avgTourCostPromise,
    ]);
  return {
    totalTours,
    totalToursByTourTypes,
    totalToursByDivision,
    avgTourCost,
  };
};

export const statisticServices = {
  userStatistics,
  bookingStatistics,
  paymentStatistics,
  tourStatistics,
};
