import { Routes, Route } from 'react-router-dom';
import Navbar from './components/AppNavbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // Import the new page
import ProfilePage from './pages/ProfilePage';
import ExamPage from './pages/ExamPage';
import ResultsPage from './pages/ResultPage';
import ProtectedRoute from './components/ProtectedRoute';
import AiQuizGenerator from "./pages/AiQuizGenerator";
import InterviewPage from "./pages/InterviewPage";
import StudyAssistant from "./pages/StudyAssistance";
import CodingInterview from "./pages/CodingInterview";


function App() {
  return (
    <div className="app-shell flex min-h-screen flex-col">
      <Navbar />
      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> {/* Add the new route */}
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/quiz/:id" element={<ProtectedRoute><ExamPage /></ProtectedRoute>} />
          <Route path="/results/:id" element={<ProtectedRoute><ResultsPage /></ProtectedRoute>} />
         <Route
           path="/ai-quiz"
           element={
             <ProtectedRoute>
               <AiQuizGenerator />
             </ProtectedRoute>
           }
         />
<Route path="/interview" element={<InterviewPage />} />
<Route path="/study" element={<StudyAssistant />} />
<Route path="/coding" element={<CodingInterview />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
