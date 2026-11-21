/**
 * Backend module: Node.js, Express 5, Mongoose aur MongoDB.
 * Use case: Ye file job portal ke HTTP API aur database data flow mein kaam karti hai.
 */

import Company from "../modals/companymodel.js";

import getDataUri from "../utils/datauri.js";
import cloudinary from '../utils/cloud.js';


/**
 * Express route/controller ya Node.js utility: `registerCompany`.
 * Express, Mongoose ya project utility ke through ek HTTP/API ya data operation process karta hai.
 * Example: `registerCompany(req, res);`
 */
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(401).json({
        message: "Company name is required",
        success: false,
      });
    }
    /**
     * Express route/controller ya Node.js utility: `getallCompanies`.
     * Express, Mongoose ya project utility ke through ek HTTP/API ya data operation process karta hai.
     * Example: `getallCompanies(req, res);`
     */
    export const getallCompanies = async (req, res) => {
  try {
    /**
     * Express route/controller ya Node.js utility: `getCompanyByid`.
     * Express, Mongoose ya project utility ke through ek HTTP/API ya data operation process karta hai.
     * Example: `getCompanyByid(req, res);`
     */
    export const getCompanyByid = async (req, res) => {
  try {
    /**
     * Express route/controller ya Node.js utility: `updateCompany`.
     * Express, Mongoose ya project utility ke through ek HTTP/API ya data operation process karta hai.
     * Example: `updateCompany(req, res);`
     */
    export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    
    /**
     * Express route/controller or Node.js utility: `file`.
     * Processes one HTTP/API or data operation using Express, Mongoose, or a project utility.
     * Example: `file(req, res);`
     */
    const file = req.files?.file?.[0];

    /**
     * Express route/controller or Node.js utility: `updateData`.
     * Processes one HTTP/API or data operation using Express, Mongoose, or a project utility.
     * Example: `updateData(req, res);`
     */
    const updateData = { name, description, website, location };

    
    if (file) {
      /**
       * Express route/controller or Node.js utility: `fileUri`.
       * Processes one HTTP/API or data operation using Express, Mongoose, or a project utility.
       * Example: `fileUri(req, res);`
       */
      const fileUri = await getDataUri(file);
      if (!fileUri?.dataUri) {
        return res.status(400).json({ message: "Invalid file upload" });
      }


      /**
       * Express route/controller or Node.js utility: `cloudResponse`.
       * Processes one HTTP/API or data operation using Express, Mongoose, or a project utility.
       * Example: `cloudResponse(req, res);`
       */
      const cloudResponse = await cloudinary.uploader.upload(fileUri.dataUri);
      updateData.logo = cloudResponse.secure_url;
    }

    /**
     * Express route/controller or Node.js utility: `company`.
     * Processes one HTTP/API or data operation using Express, Mongoose, or a project utility.
     * Example: `company(req, res);`
     */
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    return res.status(200).json({ message: "Company updated", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error?.message || "Server error", success: false });
  }
};
