# 💼 Job Portal – MERN Stack

A full-stack Job Portal application built using the **MERN Stack (MongoDB, Express.js, React.js, and Node.js)**. The platform connects job seekers with recruiters, allowing applicants to explore job opportunities and recruiters to manage job postings and applications.

## 🚀 Features

### 👨‍💻 Applicant
- User registration and login.
- Browse and explore available jobs.
- Search jobs using keywords.
- View detailed job descriptions.
- Apply for available jobs.
- Manage profile information.
- Upload and manage profile pictures and resumes.
- Track job application status.

### 🏢 Recruiter
- Recruiter registration and authentication.
- Create and manage companies.
- Post new job opportunities.
- Update and manage existing job postings.
- View applicants for posted jobs.
- Review applicant profiles and resumes.
- Manage application statuses.

### 🔐 Authentication & Security
- JWT-based authentication.
- HTTP-only cookie-based authentication.
- Role-based access control.
- Protected routes for applicants and recruiters.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend UI |
| Redux Toolkit | Global state management |
| Redux Persist | State persistence |
| React Router | Client-side routing |
| Tailwind CSS | Styling |
| Node.js | Backend runtime |
| Express.js | REST API development |
| MongoDB | Database |
| Mongoose | Database modeling |
| JWT | Authentication |
| Multer | File uploads |
| Axios | API requests |
| Sonner | Notifications |
| Vite | Frontend development and build |

## 📂 Project Structure

```text
Job-Portal/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── package.json
│
├── back/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── index.js
│   └── package.json
│
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Job-Portal
```

### 2. Setup Backend

```bash
cd back
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Add any additional environment variables required by your project, such as your file-upload service credentials.

Start the backend:

```bash
npm run dev
```

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5001
```

## 🔄 Application Workflow

1. Users register as applicants or recruiters.
2. Applicants create profiles and explore job opportunities.
3. Recruiters create companies and publish job openings.
4. Applicants apply for jobs by submitting their information and resumes.
5. Recruiters review applications and manage applicant statuses.
6. Applicants can track their application progress.

## 🎯 Project Objectives

- Build a real-world full-stack web application.
- Implement RESTful API architecture.
- Understand frontend-backend communication.
- Implement authentication and authorization.
- Work with MongoDB relationships and data management.
- Practice global state management using Redux Toolkit.
- Handle file uploads and user profiles.

## 🔮 Future Improvements

- Saved jobs and personalized bookmarks.
- Advanced job filtering and sorting.
- Email notifications for application updates.
- Real-time application status updates.
- Pagination and optimized job searching.
- Admin dashboard and analytics.

## 👨‍💻 Author

**Aditya Navendu**

B.Tech Student | Full Stack Developer | Competitive Programmer

---

⭐ If you find this project useful, consider giving it a star!
