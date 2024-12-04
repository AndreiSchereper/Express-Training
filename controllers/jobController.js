let jobs = [
    {
        "id": 1,
        "title": "Senior Vue Developer",
        "type": "Full-Time",
        "description": "We are seeking a talented Front-End Developer...",
        "location": "Boston, MA",
        "salary": "$70K - $80K",
        "company": {
            "name": "NewTek Solutions",
            "description": "NewTek Solutions is a leading technology company...",
            "contactEmail": "contact@teksolutions.com",
            "contactPhone": "555-555-5555",
        },
    },
    {
        "id": 2,
        "title": "Front-End Engineer (Vue)",
        "type": "Full-Time",
        "description": "Join our team as a Front-End Developer in sunny Miami, FL. We are looking for a motivated individual with a passion for crafting beautiful and responsive web applications. Experience with UI/UX design principles and a strong attention to detail are highly desirable.",
        "location": "Miami, FL",
        "salary": "$70K - $80K",
        "company": {
          "name": "Veneer Solutions",
          "description": "Veneer Solutions is a creative agency specializing in digital design and development. Our team is dedicated to pushing the boundaries of creativity and innovation to deliver exceptional results for our clients.",
          "contactEmail": "contact@loremipsum.com",
          "contactPhone": "555-555-5555"
        }
    },
    {
        "id": 3,
        "title": "Vue.js Developer",
        "type": "Full-Time",
        "description": "Are you passionate about front-end development? Join our team in vibrant Brooklyn, NY, and work on exciting projects that make a difference. We offer competitive compensation and a collaborative work environment where your ideas are valued.",
        "location": "Brooklyn, NY",
        "salary": "$70K - $80K",
        "company": {
          "name": "Dolor Cloud",
          "description": "Dolor Cloud is a leading technology company specializing in digital solutions for businesses of all sizes. With a focus on innovation and customer satisfaction, we are committed to delivering cutting-edge products and services.",
          "contactEmail": "contact@dolorsitamet.com",
          "contactPhone": "555-555-5555"
        }
      },
      {
        "id": 4,
        "title": "Vue Front-End Developer",
        "type": "Part-Time",
        "description": "Join our team as a Part-Time Front-End Developer in beautiful Pheonix, AZ. We are looking for a self-motivated individual with a passion for creating engaging user experiences. This position offers flexible hours and the opportunity to work remotely.",
        "location": "Pheonix, AZ",
        "salary": "$60K - $70K",
        "company": {
          "name": "Alpha Elite",
          "description": "Alpha Elite is a dynamic startup specializing in digital marketing and web development. We are committed to fostering a diverse and inclusive workplace where creativity and innovation thrive.",
          "contactEmail": "contact@adipisicingelit.com",
          "contactPhone": "555-555-5555"
        }
      },
      {
        "id": 5,
        "title": "Full Stack Vue Developer",
        "type": "Full-Time",
        "description": "Exciting opportunity for a Full-Time Front-End Developer in bustling Atlanta, GA. We are seeking a talented individual with a passion for building elegant and scalable web applications. Join our team and make an impact!",
        "location": "Atlanta, GA",
        "salary": "$90K - $100K",
        "company": {
          "name": "Browning Technologies",
          "description": "Browning Technologies is a rapidly growing technology company specializing in e-commerce solutions. We offer a dynamic and collaborative work environment where employees are encouraged to think creatively and innovate.",
          "contactEmail": "contact@consecteturadipisicing.com",
          "contactPhone": "555-555-5555"
        }
      },
      {
        "id": 6,
        "title": "Vue Native Developer",
        "type": "Full-Time",
        "description": "Join our team as a Front-End Developer in beautiful Portland, OR. We are looking for a skilled and enthusiastic individual to help us create innovative web solutions. Competitive salary and great benefits package available.",
        "location": "Portland, OR",
        "salary": "$100K - $110K",
        "company": {
          "name": "Port Solutions INC",
          "description": "Port Solutions is a leading technology company specializing in software development and digital marketing. We are committed to providing our clients with cutting-edge solutions and our employees with a supportive and rewarding work environment.",
          "contactEmail": "contact@ipsumlorem.com",
          "contactPhone": "555-555-5555"
        }
      }
];

// Get all jobs
const getJobs = (req, res) => {
    const limit = parseInt(req.query.limit);

    if (!isNaN(limit) && limit > 0) {
        res.status(200).json(jobs.slice(0, limit));
        return;
    }
    res.status(200).json(jobs);
};

// Get a single job
const getJob = (req, res, next) => {
    const id = parseInt(req.params.id);
    const job = jobs.find((job) => job.id === id);

    if (job) {
        res.status(200).json(job);
        return;
    }

    const error = new Error(`A job with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
};

// Add a new job
const addJob = (req, res, next) => {
    const { name, type, description, location, salary, company } = req.body;

    if (name && type && description && location && salary && company?.name) {
        const newJob = {
            id: jobs.length + 1,
            title: name, // Map `name` from frontend to `title` in backend
            type,
            description,
            location,
            salary,
            company: {
                name: company.name,
                description: company.description || '', // Default to empty string if not provided
                contactEmail: company.contactEmail || '',
                contactPhone: company.contactPhone || '',
            },
        };
        jobs.push(newJob);
        res.status(201).json(newJob);
        return;
    }

    const error = new Error('Please provide all required fields for the job');
    error.status = 400;
    return next(error);
};

// Update a job
const updateJob = (req, res, next) => {
    const id = parseInt(req.params.id);
    const job = jobs.find((job) => job.id === id);

    if (job) {
        const { title, type, description, location, salary, company } = req.body;
        if (title) job.title = title;
        if (type) job.type = type;
        if (description) job.description = description;
        if (location) job.location = location;
        if (salary) job.salary = salary;
        if (company) job.company = company;

        res.status(200).json(job);
        return;
    }

    const error = new Error(`A job with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
};

// Delete a job
const deleteJob = (req, res, next) => {
    const id = parseInt(req.params.id);
    const jobIndex = jobs.findIndex((job) => job.id === id);

    if (jobIndex > -1) {
        jobs.splice(jobIndex, 1);
        res.status(200).json({
            message: `Job with the id of ${id} has been deleted`, jobs});
        return;
    }

    const error = new Error(`A job with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
};

export { getJobs, getJob, addJob, updateJob, deleteJob };