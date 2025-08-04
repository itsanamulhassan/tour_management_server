import { model, Schema } from "mongoose";
import { CreateTourTypeProps } from "./tour.type.types";

const tourTypeSchema = new Schema<CreateTourTypeProps>({
  name: {
    type: String,
    unique: [true, "Tour type must be unique."],
    required: [true, "Tour type is required."],
  },
});

export const TourTypes = model<CreateTourTypeProps>(
  "TourTypes",
  tourTypeSchema
);
