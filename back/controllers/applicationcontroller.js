import Application from '../modals/application.modal.js';
import Job from '../modals/jobmodal.js';

export const applyjob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    console.log('applyjob userId:', userId, 'jobId:', jobId);
    const job = await Job.findById(jobId);
    console.log('applyjob job found:', !!job);
    if (!job) {
      return res.status(400).json({ message: 'Job not found', success: false });
    }

    const existingApplication = await Application.findOne({ applicant: userId, job: jobId });
    console.log('applyjob existingApplication:', !!existingApplication);
    if (existingApplication) {
      
      if (!job.applicants.some((id) => id.toString() === userId.toString())) {
        job.applicants.push(userId);
        await job.save();
      }
      return res.status(200).json({ message: 'Application already exists', success: true });
    }



    await Application.create({
      applicant: userId,
      job: jobId,
    });

    if (!job.applicants.some((id) => id.toString() === userId.toString())) {
      job.applicants.push(userId);
      await job.save();
    }

    return res.status(201).json({ message: 'Application submitted successfully', success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};

export const getappliedjobs = async (req, res) => {
  try {
    const userId = req.id;

    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: 'job',
        populate: { path: 'company' },
      });

    const jobs = applications
      .filter((application) => application.job)
      .map((application) => ({
        ...application.job.toObject(),
        applicationId: application._id,
        status: application.status,
        appliedAt: application.createdAt,
      }));

    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving jobs', error });
  }
};

export const getapplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const applications = await Application.find({ job: jobId })
      .populate({
        path: 'applicant',
        options: { sort: { createdAt: -1 } },
      })
      .sort({ createdAt: -1 });

    const applicants = applications.map((app) => ({
      applicationId: app._id,
      status: app.status,
      ...(app.applicant?.toObject ? app.applicant.toObject() : app.applicant),
    }));

    return res.status(200).json({
      job: { applicants, jobId },
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving applicants', error });
  }
};

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
