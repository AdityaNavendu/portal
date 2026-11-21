/**
 * Backend module: Node.js, Express 5, Mongoose aur MongoDB.
 * Use case: Ye file job portal ke HTTP API aur database data flow mein kaam karti hai.
 */

import mongoose from "mongoose";
import User from "../modals/usermodels.js";
import Job from "../modals/jobmodal.js";

/**
 * Express route/controller ya Node.js utility: `getBookmarks`.
 * Express, Mongoose ya project utility ke through ek HTTP/API ya data operation process karta hai.
 * Example: `getBookmarks(req, res);`
 */
export const getBookmarks = async (req, res) => {
  try {
    /**
     * Express route/controller ya Node.js utility: `addBookmark`.
     * Express, Mongoose ya project utility ke through ek HTTP/API ya data operation process karta hai.
     * Example: `addBookmark(req, res);`
     */
    export const addBookmark = async (req, res) => {
  try {
    const { jobId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    /**
     * Express route/controller ya Node.js utility: `removeBookmark`.
     * Express, Mongoose ya project utility ke through ek HTTP/API ya data operation process karta hai.
     * Example: `removeBookmark(req, res);`
     */
    export const removeBookmark = async (req, res) => {
  try {
    const { jobId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    /**
     * Express route/controller or Node.js utility: `user`.
     * Processes one HTTP/API or data operation using Express, Mongoose, or a project utility.
     * Example: `user(req, res);`
     */
    const user = await User.findByIdAndUpdate(
      req.id,
      { $pull: { bookmarks: jobId } },
      { new: true },
    ).select("_id");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      bookmarked: false,
      jobId,
    });
  } catch (error) {
    console.error("REMOVE BOOKMARK ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to remove saved job",
    });
  }
};
