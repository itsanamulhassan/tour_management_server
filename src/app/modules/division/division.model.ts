import { model, Schema } from "mongoose";
import { CreateDivisionProps } from "./division.types";

const createDivision = new Schema<CreateDivisionProps>(
  {
    name: {
      type: String,
      required: [true, "Division name is required."],
      unique: [true, "Division should be unique."],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Division slug is required"],
      unique: [true, "Division slug should be unique."],
      trim: true,
      lowercase: true,
    },
    thumbnail: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Divisions = model<CreateDivisionProps>(
  "Divisions",
  createDivision
);
