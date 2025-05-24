import { Router } from "express";
import {
  createListing,
  getListingById,
  getAllListings,
  getUserListings,
  updateListing,
  deleteListing,
} from "../controllers/listing.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import multer from "multer";
import { ApiError } from "../utils/ApiError.js";

const router = Router();

// Multer error handling middleware
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res
        .status(400)
        .json(new ApiError(400, `Unexpected field: ${err.field}. Use 'images' for file uploads.`));
    }
    return res.status(400).json(new ApiError(400, err.message));
  }
  next(err);
};

// Routes
router
  .route("/")
  .post(verifyJWT, upload.array("images", 10), handleMulterError, createListing)
  .get(getAllListings);

router.route("/user").get(verifyJWT, getUserListings);

router
  .route("/:listingId")
  .get(getListingById)
  .patch(verifyJWT, upload.array("images", 10), handleMulterError, updateListing)
  .delete(verifyJWT, deleteListing);

export default router;