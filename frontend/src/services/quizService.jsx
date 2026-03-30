import api from './api';
export const getAllQuizzes = () => api.get('/quizzes');
export const getQuizDetails = (id) => api.get(`/quizzes/${id}`);
export const getQuizQuestions = (id) => api.get(`/quizzes/${id}/questions`);
export const submitQuiz = (id, answers) => api.post(`/quizzes/${id}/submit`, { answers });
export const generateAIQuiz = (data) => api.post("/quizzes/ai/create", data);
