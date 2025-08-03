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

divisionSchema.pre("save", async function (next) {
  if (this.name) {
    const slug = this.name.toLowerCase().split(" ").join("_");
    this.slug = slug;
  }
  next();
});
divisionSchema.pre("findOneAndUpdate", async function (next) {
  const payload = this.getUpdate() as Partial<CreateDivisionProps>;
  if (payload.name) {
    const slug = payload.name.toLowerCase().split(" ").join("_");
    payload.slug = slug;
  }
  this.setUpdate(payload);
  next();
});

export const Divisions = model<CreateDivisionProps>(
  "Divisions",
  divisionSchema
);
