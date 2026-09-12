import Job from "../modals/jobmodal.js";

export const postjob = async (req, res) => {

    try{
        const {title,description,requirements,location,salary,jobtype,company_Id,position,experience} = req.body;
        const userId = req.id;
        console.log(userId);
        if (!title || !description || !requirements || !location || !salary || !jobtype || !company_Id || !position || !experience) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        const job = await Job.create({
            title,
            description,
            requirements:requirements.split(","),
            location,
            salary:Number(salary),
            jobtype,
            company:company_Id,
            position,
            experience:Number(experience),
            created_by: userId
        });

        res.status(201).json({ message: "Job created successfully", success: true, job });
    } catch (error) {
        console.log("POSTJOB ERROR:", error);
        return res.status(500).json({
            message: "Error creating job",
            error: error?.message || error,
        });
    }
}

export const getalljobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { requirements: { $regex: keyword, $options: "i" } },
                { location: { $regex: keyword, $options: "i" } },
                { jobtype: { $regex: keyword, $options: "i" } },
                { position: { $regex: keyword, $options: "i" } },
            ],
        };

        const jobs = await Job.find(query)
            .populate({ path: "company" })
            .sort({ createdAt: -1 });

        res.status(200).json({ message: "Jobs retrieved successfully", success: true, jobs });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving jobs", error });
    }
};


export const getjobbyid = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applicants",
        });
        if (!job) {
            return res.status(400).json({ message: "Job not found", success: false });
        }
        res.status(200).json({ message: "Job retrieved successfully", success: true, job });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving job", error });
    }
}


export const getadminjobs = async (req, res) => {
    try {
        console.log("req.id:", req.id);

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