import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    return accessToken;
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating access token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // 1. Get user details from frontend
  // 2. Validate - not empty
  // 3. Check if user already exists: username, email, or phone
  // 4. Create user object - save to DB
  // 5. Remove password from response
  // 6. Return response
  console.log(req.body);
  const { username, email, phone, password } = req.body;

  // Validate required fields
  if (
    [username, email, phone, password].some((item) => item?.trim() === "")
  ) {
    throw new ApiError(400, "Please fill all the fields");
  }

  // Check if user already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }, { phone }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with this username, email, or phone already exists");
  }

  // Create user
  const user = await User.create({
    username: username.toLowerCase(),
    email,
    phone,
    password,
  });

  // Fetch created user, excluding password
  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // 1. Get data from request body
  // 2. Validate username or email
  // 3. Find the user
  // 4. Check password
  // 5. Generate access token
  // 6. Send cookie and response

  const { email, username, password } = req.body;

  if (!email && !username) {
    throw new ApiError(400, "Username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordMatch(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const accessToken = await generateAccessToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken },
        "User logged in successfully"
      )
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  // Clear cookies and return response
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export { registerUser, loginUser, logOutUser };