import { Schema, model, InferSchemaType, HydratedDocument } from "mongoose";
import { fileSchema } from "../tour/tour.models";
import { generateSlug } from "../../utils/slug";
import { CreateDivisionDto } from "./division.types";

const divisionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Division name is required."],
      unique: [true, "Division should be unique."],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Division slug is required."],
      unique: [true, "Division slug should be unique."],
      trim: true,
      lowercase: true,
    },
    thumbnail: fileSchema,
    description: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ✅  Create slug automatically on validate
divisionSchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = generateSlug(this.name, { suffix: "division" });
  }
  next();
});

// ✅  Update slug automatically on findOneAndUpdate
divisionSchema.pre("findOneAndUpdate", function (next) {
  const division = this.getUpdate() as Partial<CreateDivisionDto>;

  if (division.name) {
    division.slug = generateSlug(division.name, { suffix: "division" });
  }
  this.setUpdate(division);

  next();
});

export type Division = InferSchemaType<typeof divisionSchema>;
export type DivisionDocument = HydratedDocument<Division>;

export const Divisions = model<DivisionDocument>("Divisions", divisionSchema);
