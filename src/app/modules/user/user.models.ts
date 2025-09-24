import { InferSchemaType, model, Schema } from "mongoose";
import { AddressDto, AuthProviderDto } from "./user.types";
import {
  authProviderEnum,
  userActivityStatusEnum,
  userRoleStatusEnum,
} from "./user.schemas";
import { MergeDocument } from "../../types/global.types";

const addressSchema = new Schema<AddressDto>(
  {
    street: { type: String },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    division: {
      type: String,
      required: [true, "Division is required"],
    },
    postalCode: {
      type: String,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
  },
  { versionKey: false, _id: false }
);

const authProviderSchema = new Schema<AuthProviderDto>(
  {
    provider: {
      type: String,
      value: authProviderEnum,
      default: "CREDENTIAL",
    },
    providerId: {
      type: String,
      required: [true, "Provider ID is required."],
    },
  },
  {
    versionKey: false,
    _id: false,
  }
);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required."],
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: [true, "Duplicate email found."],
      required: [true, "Email is required."],
    },
    password: {
      type: String,
      required: false,
      select: false,
    },
    phone: {
      type: String,
    },
    avatar: {
      type: String,
    },
    address: addressSchema,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    activityStatus: {
      type: String,
      enum: userActivityStatusEnum,
      default: "ACTIVE",
      uppercase: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: userRoleStatusEnum,
      default: "USER",
      uppercase: true,
    },
    auths: [authProviderSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export type User = InferSchemaType<typeof userSchema>;
export type UserDocument = MergeDocument<User>;
export const Users = model<User>("Users", userSchema);
