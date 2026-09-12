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



    const newApplication = await Application.create({
      applicant: userId,
      job: jobId,
    });

    // job.applicants stores User IDs in schema, so push the userId
    // (your current code pushed newApplication._id which is an Application document id)
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

    const jobs = await Job.find({ applicants: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: 'company',
        options: { sort: { createdAt: -1 } },
      });

    if (!jobs || jobs.length === 0) {
      // Return 200 with empty list so frontend can still render "No applied jobs" gracefully.
      return res.status(200).json({ jobs: [], success: true });
    }

    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving jobs', error });
  }
};

export const getapplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Fetch applicants from Application collection (source of truth)
    const applications = await Application.find({ job: jobId })
      .populate({
        path: 'applicant',
        options: { sort: { createdAt: -1 } },
      })
      .sort({ createdAt: -1 });

    if (!applications) {
      return res.status(400).json({ message: 'No applications found', success: false });
    }

    // Keep response shape compatible with frontend: { job: { applicants: [...] }, success: true }
    // But include application id + status so frontend can update it.
    const applicants = applications.map((app) => ({
      applicationId: app._id,
      status: app.status,
      // `applicant` is populated, so spread its fields at top-level for existing UI compatibility.
      ...(app.applicant?.toObject ? app.applicant.toObject() : app.applicant),
      // also keep jobTitle/job if frontend expects them later (optional)
    }));

    return res.status(200).json({
      // include job id so frontend can optionally refetch after status updates
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

    if (!status) {
      return res.status(400).json({ message: 'Status is required', success: false });
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
