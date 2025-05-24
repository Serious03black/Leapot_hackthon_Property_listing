import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import { upload } from "./middlewares/multer.middleware.js";
import { ApiError } from "./utils/ApiError.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "22kb" }));
app.use(express.urlencoded({ extended: true, limit: "22kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(upload.none()); // For non-file form-data

// Error handling for Multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res
        .status(400)
        .json(new ApiError(400, `Unexpected field: ${err.field}. Use 'images' for file uploads.`));
    }
    return res.status(400).json(new ApiError(400, err.message));
  }
  next(err);
});

// Routes
import userRouter from "./routes/user.routes.js";
import listingRouter from "./routes/listing.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/listings", listingRouter);

export { app };