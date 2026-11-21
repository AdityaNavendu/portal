/**
 * Backend module: Node.js, Express 5, Mongoose aur MongoDB.
 * Use case: Ye file job portal ke HTTP API aur database data flow mein kaam karti hai.
 */

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["recruiter", "applicant"],
      default: "applicant",
    },
    profile: {
      bio: {
        type: String,
        default: ""
      },
      skills: {
        type: [String],
        default: []
      },
      resume: {
        type: String,
        default: ""
      },
      resumeoriginalname: {
        type: String,
        default: ""
      },
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },
      profilepicture: {
        type: String,
        default: " ",
      },
    },
    bookmarks: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Job",
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
