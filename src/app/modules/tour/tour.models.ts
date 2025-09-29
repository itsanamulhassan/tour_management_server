import { HydratedDocument, InferSchemaType, model, Schema } from "mongoose";
import { CreateTourDto } from "./tour.types";
import { generateSlug } from "../../utils/slug";
import { FileProps } from "../../types/global.types";

export const fileSchema = new Schema<FileProps>(
  {
    public_id: {
      type: String,
      unique: [true, "File ID must be unique."],
    },
    url: String,
  },
  { _id: false }
);

const tourSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      unique: [true, "Title must be unique."],
      required: [true, "Title is required."],
    },
    slug: {
      type: String,
      trim: true,
      unique: [true, "Slug must be unique."],
      required: [true, "Slug is required."],
      lowercase: true,
    },
    amenities: {
      type: [String],
      default: [],
    },
    thumbnails: {
      type: [fileSchema],
    },
    costFrom: {
      type: Number,
      min: [1, "Tour cost must be a positive number."],
      default: 1,
    },
    description: {
      type: String,
    },
    division: {
      type: Schema.Types.ObjectId,
      ref: "Divisions",
      required: [true, "Division ID is required."],
    },
    tourType: {
      type: Schema.Types.ObjectId,
      ref: "TourTypes",
      required: [true, "Type of tour is required."],
    },
    endDate: {
      type: Date,
    },
    startDate: {
      type: Date,
    },
    excluded: {
      type: [String],
      default: [],
    },
    included: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
    },
    minAge: {
      type: Number,
      min: [1, "Minimum age must be a positive number."],
    },
    tourPlan: {
      type: [String],
      default: [],
    },
    maxGuest: {
      type: Number,
      min: [1, "Maximum guest must be a positive number."],
    },
  },
  { timestamps: true, versionKey: false }
);

tourSchema.pre("validate", async function (next) {
  if (this.title) {
    this.slug = generateSlug(this.title, { suffix: "tour" });
  }
  next();
});

tourSchema.pre("findOneAndUpdate", async function (next) {
  const tour = this.getUpdate() as Partial<CreateTourDto>;

  if (tour.title) {
    tour.slug = generateSlug(tour.title, { suffix: "tour" });
  }
  this.setUpdate(tour);
  next();
});

export type Tour = InferSchemaType<typeof tourSchema>;
export type TourDocument = HydratedDocument<Tour>;
export const Tours = model<CreateTourDto>("Tours", tourSchema);
