import mongoose from "mongoose";
import User from "../modals/usermodels.js";
import Job from "../modals/jobmodal.js";

export const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.id)
      .select("bookmarks")
      .populate({
        path: "bookmarks",
        populate: { path: "company" },
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      jobs: user.bookmarks.filter(Boolean),
    });
  } catch (error) {
    console.error("GET BOOKMARKS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to retrieve bookmarks",
    });
  }
};

export const addBookmark = async (req, res) => {
  try {
    const { jobId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const job = await Job.findById(jobId).populate("company");
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.id,
      { $addToSet: { bookmarks: job._id } },
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
      bookmarked: true,
      job,
    });
  } catch (error) {
    console.error("ADD BOOKMARK ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to save job",
    });
  }
};

export const removeBookmark = async (req, res) => {
  try {
    const { jobId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

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
