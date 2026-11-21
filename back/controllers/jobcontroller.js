/**
 * Backend module: Node.js, Express 5, Mongoose aur MongoDB.
 * Use case: Ye file job portal ke HTTP API aur database data flow mein kaam karti hai.
 */

import Job from "../modals/jobmodal.js";

/**
 * Express route/controller ya Node.js utility: `postjob`.
 * Express, Mongoose ya project utility ke through ek HTTP/API ya data operation process karta hai.
 * Example: `postjob(req, res);`
 */
export const postjob = async (req, res) => {

    try{
        const {title,description,requirements,location,salary,jobtype,company_Id,position,experience} = req.body;
        /**
         * Express route/controller ya Node.js utility: `getalljobs`.
         * Express, Mongoose ya project utility ke through ek HTTP/API ya data operation process karta hai.
         * Example: `getalljobs(req, res);`
         */
        export const getalljobs = async (req, res) => {
    try {
        /**
         * Express route/controller ya Node.js utility: `getjobbyid`.
         * Express, Mongoose ya project utility ke through ek HTTP/API ya data operation process karta hai.
         * Example: `getjobbyid(req, res);`
         */
        export const getjobbyid = async (req, res) => {
    try {
        /**
         * Express route/controller ya Node.js utility: `getadminjobs`.
         * Express, Mongoose ya project utility ke through ek HTTP/API ya data operation process karta hai.
         * Example: `getadminjobs(req, res);`
         */
        export const getadminjobs = async (req, res) => {
    try {
        console.log("req.id:", req.id);

        /**
         * Express route/controller or Node.js utility: `jobs`.
         * Processes one HTTP/API or data operation using Express, Mongoose, or a project utility.
         * Example: `jobs(req, res);`
         */
        const jobs = await Job.find({
            created_by: req.id
        }).populate({
            path: "company",
            options: { sort: { createdAt: -1 } }
        });

        console.log("Jobs:", jobs);

        return res.status(200).json({
            success: true,
            jobs
        });
    } catch (error) {
        console.error("ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}