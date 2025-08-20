# SkillLink - Micro-Internship Platform

A MERN stack application connecting students with startup micro-internship opportunities.

## Quick Start

1. Install dependencies:
```bash
npm run install-deps
```

2. Set up environment variables:
- Backend: Create `backend/.env` with MongoDB URI and JWT secret
- Frontend: Create `frontend/.env` with backend API URL

3. Run the application:
```bash
npm run dev
```

- Backend: http://localhost:5000
- Frontend: http://localhost:5173

## Features

- JWT Authentication with role-based access
- Student dashboard for browsing and applying to gigs
- Startup dashboard for posting gigs and managing applicants
- Real-time notifications
- Responsive design with TailwindCSS

## Tech Stack

- Frontend: React, Vite, TailwindCSS, Axios
- Backend: Node.js, Express, MongoDB, JWT
- Database: MongoDB Atlas