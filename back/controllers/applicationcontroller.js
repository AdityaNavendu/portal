/**
 * Backend module: Node.js, Express 5, Mongoose aur MongoDB.
 * Use case: Ye file job portal ke HTTP API aur database data flow mein kaam karti hai.
 */

import Application from '../modals/application.modal.js';
import Job from '../modals/jobmodal.js';

/**
 * Express route/controller ya Node.js utility: `applyjob`.
 * Express, Mongoose ya project utility ke through ek HTTP/API ya data operation process karta hai.
 * Example: `applyjob(req, res);`
 */
export const applyjob = async (req, res) => {
  try {
    /**
     * Express route/controller ya Node.js utility: `getappliedjobs`.
     * Express, Mongoose ya project utility ke through ek HTTP/API ya data operation process karta hai.
     * Example: `getappliedjobs(req, res);`
     */
    export const getappliedjobs = async (req, res) => {
  try {
    /**
     * Express route/controller ya Node.js utility: `getapplicants`.
     * Express, Mongoose ya project utility ke through ek HTTP/API ya data operation process karta hai.
     * Example: `getapplicants(req, res);`
     */
    export const getapplicants = async (req, res) => {
  try {
    /**
     * Express route/controller ya Node.js utility: `updateapplicationstatus`.
     * Express, Mongoose ya project utility ke through ek HTTP/API ya data operation process karta hai.
     * Example: `updateapplicationstatus(req, res);`
     */
    export const updateapplicationstatus = async (req, res) => {
  try {
    const { id: applicationId } = req.params;
    const { status } = req.body;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({
        message: 'Status must be accepted or rejected',
        success: false,
      });
    }

    /**
     * Express route/controller or Node.js utility: `application`.
     * Processes one HTTP/API or data operation using Express, Mongoose, or a project utility.
     * Example: `application(req, res);`
     */
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(400).json({ message: 'Application not found', success: false });
    }

    application.status = status;
    await application.save();

    return res.status(200).json({ message: 'Application status updated', success: true });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating application status', error });
  }
};
