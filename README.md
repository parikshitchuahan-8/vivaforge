AI-Powered Online Examination System

AI-Powered Online Examination System is a full-stack web application designed to conduct online quizzes and automatically evaluate results. The platform allows users to register, log in securely, attempt quizzes, and view their scores instantly. It also includes an AI-based quiz generation feature that can generate questions dynamically based on the given topic and difficulty level.

The system is built using React for the frontend and Spring Boot for the backend, with PostgreSQL used as the database. Authentication is implemented using JWT to ensure secure access to APIs.

Key Features

User registration and login with JWT authentication
Secure REST APIs using Spring Security
Online quiz system with automatic evaluation
AI-based quiz generation using Groq
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
AI integration generates questions dynamically using Groq.

How to Run the Project

Clone the repository and navigate to the project folder.

Run the backend application using Maven.

Run the frontend using npm.

Configure environment variables such as database credentials and Groq API key before starting the application.

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

Deployment setup for Vercel + Render + Neon

1. Neon PostgreSQL
Create a Neon project and database.
Copy the connection details into the backend environment variables.
Recommended JDBC format:
`jdbc:postgresql://<host>/<database>?sslmode=require`

2. Render backend
Create a new Render Web Service from this repository.
Use the included [render.yaml](/C:/XboxGames/GameSave/java%20fullstack/onlineexamination/render.yaml) blueprint or the root [Dockerfile](/C:/XboxGames/GameSave/java%20fullstack/onlineexamination/Dockerfile).

Set these Render environment variables:
`PORT=8080`
`DB_URL=<your-neon-jdbc-url>`
`DB_USERNAME=<your-neon-username>`
`DB_PASSWORD=<your-neon-password>`
`JWT_SECRET=<long-random-secret>`
`JWT_EXPIRATION=86400000`
`GROQ_API_KEY=<your-groq-api-key>`
`GROQ_BASE_URL=https://api.groq.com/openai`
`GROQ_MODEL=llama-3.1-8b-instant`
`GROQ_TEMPERATURE=0.2`
`APP_SEED_ENABLED=false`
`APP_CORS_ALLOWED_ORIGIN_PATTERNS=https://your-frontend.vercel.app,https://*.vercel.app`

Use `/api/quizzes` as the backend health check.

3. Vercel frontend
Import the `frontend` folder as the Vercel project root.
Framework preset: Vite
Build command: `npm run build`
Output directory: `dist`

Set this Vercel environment variable:
`VITE_API_URL=https://your-backend.onrender.com/api`

The repo includes [vercel.json](/C:/XboxGames/GameSave/java%20fullstack/onlineexamination/vercel.json) so React Router routes rewrite to `index.html`.

4. Recommended launch order
Deploy Render first.
Copy the Render backend URL into Vercel as `VITE_API_URL`.
Deploy Vercel.
Update Render `APP_CORS_ALLOWED_ORIGIN_PATTERNS` with your final Vercel production domain if needed.

Future Enhancements

Admin dashboard for quiz and question management
Timer-based online examination system
Leaderboard and ranking system for users
AI-generated explanations for quiz answers
Anti-cheating monitoring system

Author

Parikshit Chauhan
B.Tech Computer Science Engineering
