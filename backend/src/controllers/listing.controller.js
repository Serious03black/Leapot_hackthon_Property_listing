import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Listing } from "../models/listing.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

const createListing = asyncHandler(async (req, res) => {
  // 1. Get listing details from frontend (form-data or JSON)
  // 2. Validate required fields
  // 3. Validate numeric fields and enums
  // 4. Handle image uploads to Cloudinary
  // 5. Create listing in database
  // 6. Remove temporary files
  // 7. Return response with created listing

  console.log("Request body:", req.body);
  console.log("Request files:", req.files);
  console.log("Content-Type:", req.get("Content-Type"));

  const {
    title,
    description,
    address,
    price,
    propertyType,
    bedrooms,
    area,
    status,
  } = req.body;

  // Validate required fields
  if (
    !title ||
    !description ||
    !address ||
    !price ||
    !propertyType ||
    !area
  ) {
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => fs.unlinkSync(file.path));
    }
    throw new ApiError(400, "All required fields (title, description, address, price, propertyType, area) must be provided");
  }

  // Validate field types
  if (typeof title !== "string" || title.trim() === "") {
    if (req.files) req.files.forEach((file) => fs.unlinkSync(file.path));
    throw new ApiError(400, "Title must be a non-empty string");
  }
  if (typeof description !== "string" || description.trim() === "") {
    if (req.files) req.files.forEach((file) => fs.unlinkSync(file.path));
    throw new ApiError(400, "Description must be a non-empty string");
  }
  if (typeof address !== "string" || address.trim() === "") {
    if (req.files) req.files.forEach((file) => fs.unlinkSync(file.path));
    throw new ApiError(400, "Address must be a non-empty string");
  }
  if (isNaN(price) || price < 0) {
    if (req.files) req.files.forEach((file) => fs.unlinkSync(file.path));
    throw new ApiError(400, "Price must be a non-negative number");
  }
  if (isNaN(area) || area < 0) {
    if (req.files) req.files.forEach((file) => fs.unlinkSync(file.path));
    throw new ApiError(400, "Area must be a non-negative number");
  }
  if (bedrooms && (isNaN(bedrooms) || bedrooms < 0)) {
    if (req.files) req.files.forEach((file) => fs.unlinkSync(file.path));
    throw new ApiError(400, "Bedrooms must be a non-negative number");
  }

  // Validate enums
  const validPropertyTypes = ["House", "Apartment", "Condo", "Land", "Commercial"];
  if (!validPropertyTypes.includes(propertyType)) {
    if (req.files) req.files.forEach((file) => fs.unlinkSync(file.path));
    throw new ApiError(400, "Invalid property type");
  }
  const validStatuses = ["Active", "Pending", "Sold", "Withdrawn"];
  if (status && !validStatuses.includes(status)) {
    if (req.files) req.files.forEach((file) => fs.unlinkSync(file.path));
    throw new ApiError(400, "Invalid status");
  }

  // Handle image uploads
  let images = [];
  if (req.files && req.files.length > 0) {
    const uploadPromises = req.files.map(async (file) => {
      const result = await uploadOnCloudinary(file.path);
      if (!result) {
        throw new ApiError(500, "Failed to upload image to Cloudinary");
      }
      fs.unlinkSync(file.path); // Remove local file
      return result.url;
    });
    images = await Promise.all(uploadPromises);
  }

  // Create listing
  const listing = await Listing.create({
    userId: req.user._id,
    title,
    description,
    address,
    price,
    propertyType,
    bedrooms: bedrooms || 0,
    area,
    images,
    status: status || "Active",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, listing, "Listing created successfully"));
});

const getListingById = asyncHandler(async (req, res) => {
  // 1. Get listing ID from request parameters
  // 2. Find listing in database
  // 3. Check if listing exists
  // 4. Populate user details
  // 5. Return response with listing

  const { listingId } = req.params;

  const listing = await Listing.findById(listingId).populate(
    "userId",
    "username email"
  );

  if (!listing) {
    throw new ApiError(404, "Listing not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, listing, "Listing retrieved successfully"));
});

const getAllListings = asyncHandler(async (req, res) => {
  // 1. Find all listings in database
  // 2. Populate user details
  // 3. Sort by creation date (newest first)
  // 4. Return response with listings

  const listings = await Listing.find()
    .populate("userId", "username email")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, listings, "All listings retrieved successfully"));
});

const getUserListings = asyncHandler(async (req, res) => {
  // 1. Get authenticated user ID from req.user
  // 2. Find listings for the user
  // 3. Sort by creation date (newest first)
  // 4. Return response with listings

  const listings = await Listing.find({ userId: req.user._id }).sort({
    createdAt: -1,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, listings, "User listings retrieved successfully"));
});

const updateListing = asyncHandler(async (req, res) => {
  // 1. Get listing ID from request parameters
  // 2. Get updated fields from frontend
  // 3. Find listing in database
  // 4. Check if listing exists and user is authorized
  // 5. Validate updated fields
  // 6. Handle image uploads
  // 7. Update listing in database
  // 8. Return response with updated listing

  console.log("Update request body:", req.body);
  console.log("Update request files:", req.files);
  console.log("Content-Type:", req.get("Content-Type"));

  const { listingId } = req.params;
  const {
    title,
    description,
    address,
    price,
    propertyType,
    bedrooms,
    area,
    status,
  } = req.body;

  const listing = await Listing.findById(listingId);
  if (!listing) {
    if (req.files) req.files.forEach((file) => fs.unlinkSync(file.path));
    throw new ApiError(404, "Listing not found");
  }

  if (listing.userId.toString() !== req.user._id.toString()) {
    if (req.files) req.files.forEach((file) => fs.unlinkSync(file.path));
    throw new ApiError(403, "You are not authorized to update this listing");
  }

  // Validate updated fields
  if (title && (typeof title !== "string" || title.trim() === "")) {
    if (req.files) req.files.forEach((file) => fs.unlinkSync(file.path));
    throw new ApiError(400, "Title must be a non-empty string");
  }
  if (description && (typeof description !== "string" || description.trim() === "")) {
    if (req.files) req.files.forEach((file) => fs.unlinkSync(file.path));
    throw new ApiError(400, "Description must be a non-empty string");
  }
  if (address && (typeof address !== "string" || address.trim() === "")) {
    if (req.files) req.files.forEach((file) => fs.unlinkSync(file.path));
    throw new ApiError(400, "Address must be a non-empty string");
  }
  if (price && (isNaN(price) || price < 0)) {
    if (req.files) req.files.forEach((file) => fs.unlinkSync(file.path));
    throw new ApiError(400, "Price must be a non-negative number");
  }
  if (area && (isNaN(area) || area < 0)) {
    if (req.files) req.files.forEach((file) => fs.unlinkSync(file.path));
    throw new ApiError(400, "Area must be a non-negative number");
  }
  if (bedrooms && (isNaN(bedrooms) || bedrooms < 0)) {
    if (req.files) req.files.forEach((file) => fs.unlinkSync(file.path));
    throw new ApiError(400, "Bedrooms must be a non-negative number");
  }
  if (propertyType) {
    const validPropertyTypes = ["House", "Apartment", "Condo", "Land", "Commercial"];
    if (!validPropertyTypes.includes(propertyType)) {
      if (req.files) req.files.forEach((file) => fs.unlinkSync(file.path));
      throw new ApiError(400, "Invalid property type");
    }
  }
  if (status) {
    const validStatuses = ["Active", "Pending", "Sold", "Withdrawn"];
    if (!validStatuses.includes(status)) {
      if (req.files) req.files.forEach((file) => fs.unlinkSync(file.path));
      throw new ApiError(400, "Invalid status");
    }
  }

  // Update fields if provided
  if (title) listing.title = title;
  if (description) listing.description = description;
  if (address) listing.address = address;
  if (price) listing.price = price;
  if (propertyType) listing.propertyType = propertyType;
  if (bedrooms !== undefined) listing.bedrooms = bedrooms;
  if (area) listing.area = area;
  if (status) listing.status = status;

  // Handle image uploads
  if (req.files && req.files.length > 0) {
    const uploadPromises = req.files.map(async (file) => {
      const result = await uploadOnCloudinary(file.path);
      if (!result) {
        throw new ApiError(500, "Failed to upload image to Cloudinary");
      }
      fs.unlinkSync(file.path); // Remove local file
      return result.url;
    });
    const newImages = await Promise.all(uploadPromises);
    listing.images = [...listing.images, ...newImages];
  }

  await listing.save();

  return res
    .status(200)
    .json(new ApiResponse(200, listing, "Listing updated successfully"));
});

const deleteListing = asyncHandler(async (req, res) => {
  // 1. Get listing ID from request parameters
  // 2. Find listing in database
  // 3. Check if listing exists and user is authorized
  // 4. Delete listing
  // 5. Return response

  const { listingId } = req.params;

  const listing = await Listing.findById(listingId);
  if (!listing) {
    throw new ApiError(404, "Listing not found");
  }

  if (listing.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this listing");
  }

  await listing.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Listing deleted successfully"));
});

export {
  createListing,
  getListingById,
  getAllListings,
  getUserListings,
  updateListing,
  deleteListing,
};