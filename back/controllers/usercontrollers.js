import User from "../modals/usermodels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloud.js";
import getdatauri from "../utils/datauri.js";
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    const files = req.files;

    // profilepicture/resume are optional, but multer expects req.files to exist when multipart is sent.
    const profilePictureFile = files?.profilepicture?.[0];
    let cloudinaryProfilePictureResponse = null;

    if (profilePictureFile) {
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

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        bio: "",
        skills: [],
        resume: "",
        resumeoriginalname: "",
        company: null,
        profilepicture:
          cloudinaryProfilePictureResponse?.secure_url || " ",
      },
    });

    await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        success: false,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
      console.log("Incorrect password");
    }

    if (user.role !== role) {
      return res.status(400).json({
        message: "Incorrect role",
        success: false,
      });
      console.log("Incorrect role");
    }

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });

    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        success: true,
        user: userData,
        token,
      });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
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

export const updateProfile = async (req, res) => {
  try {
    const { fullname, phoneNumber, bio, skills } = req.body;
    const files = req.files;

    if (!files) {
      return res.status(400).json({
        success: false,
        message:
          "Files not received. Ensure resume/profilepicture are attached.",
      });
    }

    const resumeFile = files?.resume?.[0];
    const profilePictureFile = files?.profilepicture?.[0];

    let cloudinaryResponse = null;
    let cloudinaryProfilePictureResponse = null;

    if (resumeFile) {
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
