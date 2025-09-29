import { HydratedDocument, InferSchemaType, model, Schema } from "mongoose";
import { guideStatusEnum } from "./guide.schemas";
import { fileSchema } from "../tour/tour.models";

const guideSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "User ID is required."],
    },
    nid: fileSchema,
    division: {
      type: Schema.Types.ObjectId,
      ref: "Divisions",
      required: [true, "Division ID is required."],
    },
    status: {
      type: String,
      enum: guideStatusEnum,
      default: "PENDING",
      uppercase: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export type Guide = InferSchemaType<typeof guideSchema>;
export type GuideDocument = HydratedDocument<Guide>;
export const Guides = model("Guides", guideSchema);
