import { model, Schema } from "mongoose";
import { CreateTourProps } from "./tour.types";

const tourSchema = new Schema<CreateTourProps>(
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
      type: [String],
      default: [],
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
      required: true,
    },
    tourType: {
      type: Schema.Types.ObjectId,
      ref: "TourTypes",
      required: true,
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

// ✅ Helper function for slug generation
const generateSlug = (name: string) =>
  name.toLowerCase().replace(/\s+/g, "_") + "_division";

tourSchema.pre("validate", async function (next) {
  if (this.title) {
    this.slug = generateSlug(this.title);
  }
  next();
});

tourSchema.pre("findOneAndUpdate", async function (next) {
  const tour = this.getUpdate() as Partial<CreateTourProps>;

  if (tour.title) {
    tour.slug = generateSlug(tour.title);
  }
  this.setUpdate(tour);
  next();
});

export const Tours = model<CreateTourProps>("Tours", tourSchema);
