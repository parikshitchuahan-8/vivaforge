AI-Powered Online Examination System

AI-Powered Online Examination System is a full-stack web application designed to conduct online quizzes and automatically evaluate results. The platform allows users to register, log in securely, attempt quizzes, and view their scores instantly. It also includes an AI-based quiz generation feature that can generate questions dynamically based on the given topic and difficulty level.

The system is built using React for the frontend and Spring Boot for the backend, with PostgreSQL used as the database. Authentication is implemented using JWT to ensure secure access to APIs.

Key Features

User registration and login with JWT authentication
Secure REST APIs using Spring Security
Online quiz system with automatic evaluation
AI-based quiz generation using OpenAI
Real-time score calculation after quiz submission
PostgreSQL database integration for storing users, quizzes, and results
Responsive user interface built with React

Technology Stack:
Frontend:
React
Vite
Axios
Tailwind CSS

Backend:
Spring Boot
Spring Security
JWT Authentication
Spring AI

Database:
PostgreSQL (Neon)

Deployment:
Vercel – Frontend hosting
Render – Backend hosting

System Modules

Authentication Module
Handles user registration, login, and JWT-based authentication.

Quiz Management Module
Manages quiz creation, questions, and quiz retrieval.

Online Examination Module
Allows users to attempt quizzes and submit answers.

Result Evaluation Module
Calculates scores and stores results in the database.

AI Quiz Generation Module
Generates quiz questions dynamically using AI based on topic and difficulty.

Project Architecture

Frontend (React) communicates with the backend using REST APIs.
The backend (Spring Boot) handles business logic, authentication, and database operations.
PostgreSQL stores user information, quiz data, and results.
AI integration generates questions dynamically using OpenAI.

How to Run the Project

Clone the repository and navigate to the project folder.

Run the backend application using Maven.

Run the frontend using npm.

Configure environment variables such as database credentials and OpenAI API key before starting the application.

Backend environment variables:
`DB_URL`
`DB_USERNAME`
`DB_PASSWORD`
`JWT_SECRET`
`JWT_EXPIRATION`
`GROQ_API_KEY`
`GROQ_BASE_URL`
`GROQ_MODEL`
`GROQ_TEMPERATURE`
`APP_CORS_ALLOWED_ORIGIN_PATTERNS`
`APP_SEED_ENABLED`

Frontend environment variables:
`VITE_API_URL`

Deployment notes:
Set `APP_SEED_ENABLED=false` in production so the demo `student/password` account is not created.
Set `APP_CORS_ALLOWED_ORIGIN_PATTERNS` to include your deployed frontend origin.
For Vercel frontend deployments, set `VITE_API_URL` to your deployed backend URL with `/api`.
For Render backend deployments, set the env vars from `backend/.env.example`.

Future Enhancements

Admin dashboard for quiz and question management
Timer-based online examination system
Leaderboard and ranking system for users
AI-generated explanations for quiz answers
Anti-cheating monitoring system

Author

Parikshit Chauhan
B.Tech Computer Science Engineering
