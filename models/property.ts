import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
    },
    name: {
      type: String,
      required: [true, "Property name is required"],
    },
    type: {
      type: String,
      required: [true, "Property type is required"],
    },
    description: {
      type: String,
    },
    location: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipcode: {
        type: String,
      },
      center: {
        type: [Number],
        index: "2dsphere",
        default: undefined,
      },
    },
    plots: { type: Number, required: [true, "Number of plots is required"] },
    price: { type: Number, required: [true, "price of property is required"] },
    square_meter: {
      type: Number,
      required: [true, "Square meter is required"],
    },
    amenities: [{ type: String }],
    rates: {
      nightly: { type: Number },
      weekly: { type: Number },
      monthly: { type: Number },
    },
    seller_info: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
    },
    images: [{ type: String }],
    is_featured: { type: Boolean },
  },
  { timestamps: true },
);

const Property =
  mongoose.models.Property || mongoose.model("Property", propertySchema);

export default Property;
