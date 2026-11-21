/**
 * Backend module: Node.js, Express 5, Mongoose aur MongoDB.
 * Use case: Ye file job portal ke HTTP API aur database data flow mein kaam karti hai.
 */

import User from "../modals/usermodels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloud.js";
import getdatauri from "../utils/datauri.js";
/**
 * Express route/controller ya Node.js utility: `register`.
 * Express, Mongoose ya project utility ke through ek HTTP/API ya data operation process karta hai.
 * Example: `register(req, res);`
 */
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    /**
     * Express route/controller ya Node.js utility: `login`.
     * Express, Mongoose ya project utility ke through ek HTTP/API ya data operation process karta hai.
     * Example: `login(req, res);`
     */
    export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    /**
     * Express route/controller ya Node.js utility: `logout`.
     * Express, Mongoose ya project utility ke through ek HTTP/API ya data operation process karta hai.
     * Example: `logout(req, res);`
     */
    export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        maxAge: 0,
        sameSite: "Strict",
      })
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error logging out", error });
  }
};

/**
 * Express route/controller ya Node.js utility: `updateProfile`.
 * Express, Mongoose ya project utility ke through ek HTTP/API ya data operation process karta hai.
 * Example: `updateProfile(req, res);`
 */
export const updateProfile = async (req, res) => {
  try {
    const { fullname, phoneNumber, bio, skills } = req.body;
    /**
     * Express route/controller or Node.js utility: `files`.
     * Processes one HTTP/API or data operation using Express, Mongoose, or a project utility.
     * Example: `files(req, res);`
     */
    const files = req.files;

    if (!files) {
      return res.status(400).json({
        success: false,
        message:
          "Files not received. Ensure resume/profilepicture are attached.",
      });
    }

    /**
     * Express route/controller or Node.js utility: `resumeFile`.
     * Processes one HTTP/API or data operation using Express, Mongoose, or a project utility.
     * Example: `resumeFile(req, res);`
     */
    const resumeFile = files?.resume?.[0];
    /**
     * Express route/controller or Node.js utility: `profilePictureFile`.
     * Processes one HTTP/API or data operation using Express, Mongoose, or a project utility.
     * Example: `profilePictureFile(req, res);`
     */
    const profilePictureFile = files?.profilepicture?.[0];

    /**
     * Express route/controller or Node.js utility: `cloudinaryResponse`.
     * Processes one HTTP/API or data operation using Express, Mongoose, or a project utility.
     * Example: `cloudinaryResponse(req, res);`
     */
    let cloudinaryResponse = null;
    /**
     * Express route/controller or Node.js utility: `cloudinaryProfilePictureResponse`.
     * Processes one HTTP/API or data operation using Express, Mongoose, or a project utility.
     * Example: `cloudinaryProfilePictureResponse(req, res);`
     */
    let cloudinaryProfilePictureResponse = null;

    if (resumeFile) {
      /**
       * Express route/controller or Node.js utility: `resumeFileuri`.
       * Processes one HTTP/API or data operation using Express, Mongoose, or a project utility.
       * Example: `resumeFileuri(req, res);`
       */
      const resumeFileuri = await getdatauri(resumeFile);
      if (resumeFileuri?.dataUri) {
        try {
          cloudinaryResponse = await cloudinary.uploader.upload(
            resumeFileuri.dataUri,
          );
        } catch (e) {
          console.error("Cloudinary resume upload failed:", e);
        }
      }
    }

    if (profilePictureFile) {
      /**
       * Express route/controller or Node.js utility: `profilePictureFileuri`.
       * Processes one HTTP/API or data operation using Express, Mongoose, or a project utility.
       * Example: `profilePictureFileuri(req, res);`
       */
      const profilePictureFileuri = await getdatauri(profilePictureFile);
      if (profilePictureFileuri?.dataUri) {
        try {
          cloudinaryProfilePictureResponse = await cloudinary.uploader.upload(
            profilePictureFileuri.dataUri,
          );
        } catch (e) {
          console.error("Cloudinary profile picture upload failed:", e);
        }
      }
    }

    /**
     * Express route/controller or Node.js utility: `user`.
     * Processes one HTTP/API or data operation using Express, Mongoose, or a project utility.
     * Example: `user(req, res);`
     */
    const user = await User.findById(req.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (fullname) user.fullname = fullname;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    if (bio) {
      user.profile.bio = bio;
    }

    if (skills) {
      user.profile.skills = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
    }

    if (cloudinaryResponse) {
      user.profile.resume = cloudinaryResponse.secure_url;
      user.profile.resumeoriginalname = resumeFile?.originalname || "";
    }

    if (cloudinaryProfilePictureResponse) {
      user.profile.profilepicture = cloudinaryProfilePictureResponse.secure_url;
    }

    await user.save();

    /**
     * Express route/controller or Node.js utility: `userData`.
     * Processes one HTTP/API or data operation using Express, Mongoose, or a project utility.
     * Example: `userData(req, res);`
     */
    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      company: user.company,
      profile: user.profile,
    };

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
