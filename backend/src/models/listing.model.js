import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxLength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxLength: [2000, "Description cannot exceed 2000 characters"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      maxLength: [200, "Address cannot exceed 200 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    propertyType: {
      type: String,
      enum: ["House", "Apartment", "Condo", "Land", "Commercial"],
      required: [true, "Property type is required"],
    },
    bedrooms: {
      type: Number,
      min: [0, "Bedrooms cannot be negative"],
      default: 0,
    },
    area: {
      type: Number,
      min: [0, "Area cannot be negative"],
      required: [true, "Area (sq ft) is required"],
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ["Active", "Pending", "Sold", "Withdrawn"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model("Listing", listingSchema);

export { Listing };