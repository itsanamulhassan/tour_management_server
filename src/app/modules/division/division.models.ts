import { model, Schema } from "mongoose";
import { CreateDivisionProps } from "./division.types";

const divisionSchema = new Schema<CreateDivisionProps>(
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
    thumbnail: String,
    description: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ✅ Helper function for slug generation
const generateSlug = (name: string) =>
  name.toLowerCase().replace(/\s+/g, "_") + "_division";

// ✅ Run BEFORE validation to ensure slug is set
divisionSchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = generateSlug(this.name);
  }
  next();
});

// ✅  Update slug automatically on findOneAndUpdate
divisionSchema.pre("findOneAndUpdate", function (next) {
  const division = this.getUpdate() as Partial<CreateDivisionProps>;

  if (division.name) {
    division.slug = generateSlug(division.name);
  }
  this.setUpdate(division);

  next();
});

export const Divisions = model<CreateDivisionProps>(
  "Divisions",
  divisionSchema
);
