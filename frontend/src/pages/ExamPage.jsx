import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardList } from 'lucide-react';
import { getQuizDetails, getQuizQuestions, submitQuiz } from '../services/quizService';
import Timer from '../components/Timer';

const ExamPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const handleSubmit = useCallback(async () => {
        try {
            const response = await submitQuiz(id, answers);
            localStorage.setItem('lastResult', JSON.stringify(response.data));
            navigate(`/results/${response.data.id}`);
        } catch (error) {
            console.error("Failed to submit quiz", error);
            alert("There was an error submitting your quiz.");
        }
    }, [id, answers, navigate]);

    const handleTimeUp = useCallback(() => {
        alert("Time's up! Your quiz will be submitted automatically.");
        handleSubmit();
    }, [handleSubmit]);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const quizDetailsRes = await getQuizDetails(id);
                const quizQuestionsRes = await getQuizQuestions(id);
                setQuiz(quizDetailsRes.data);
                setQuestions(quizQuestionsRes.data);
            } catch (error) {
                console.error("Failed to load quiz data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuizData();
    }, [id]);

    const handleAnswerSelect = (questionId, optionIndex) => setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    const goToNext = () => currentQuestionIndex < questions.length - 1 && setCurrentQuestionIndex(prev => prev + 1);
    const goToPrevious = () => currentQuestionIndex > 0 && setCurrentQuestionIndex(prev => prev - 1);

    if (loading) return <p className="mt-8 text-center text-lg text-[var(--muted)]">Loading quiz...</p>;
    if (!quiz) return <p className="mt-8 text-center text-[var(--danger)]">Quiz not found.</p>;

    const currentQuestion = questions[currentQuestionIndex];
    const answeredCount = Object.keys(answers).length;
    const progress = questions.length ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
            <div className="surface-panel rise-in rounded-[2rem] p-6 sm:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-2xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-deep)]">
                            <ClipboardList size={14} />
                            Live Assessment
                        </div>
                        <h1 className="section-title text-4xl font-bold text-[var(--text)]">{quiz.title}</h1>
                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                            Move through each question at your own pace, keep an eye on the timer, and submit when you are confident.
                        </p>
                    </div>

                    <div className="flex flex-col items-start gap-3 sm:items-end">
                        <Timer
                          initialMinutes={quiz.durationMinutes || 10}
                          onTimeUp={handleTimeUp}
                        />
                        <div className="rounded-full bg-white/75 px-4 py-2 text-sm text-slate-700">
                            {answeredCount} of {questions.length} answered
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="mb-2 flex items-center justify-between text-sm text-[var(--muted)]">
                        <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                        <span>{Math.round(progress)}% complete</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-white/75">
                        <div className="h-full rounded-full bg-[var(--accent)] transition-all duration-300" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            </div>

            {currentQuestion && (
                <div className="grid gap-6 lg:grid-cols-[0.9fr_2fr]">
                    <aside className="surface-panel rise-in rounded-[2rem] p-5" style={{ animationDelay: '100ms' }}>
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-deep)]">Question Map</p>
                        <div className="mt-4 grid grid-cols-5 gap-3 sm:grid-cols-6 lg:grid-cols-4">
                            {questions.map((question, index) => {
                                const active = index === currentQuestionIndex;
                                const answered = answers[question.id] !== undefined;

                                return (
                                    <button
                                        key={question.id}
                                        type="button"
                                        onClick={() => setCurrentQuestionIndex(index)}
                                        className={[
                                            'flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-semibold transition',
                                            active
                                                ? 'bg-[var(--surface-deep)] text-white'
                                                : answered
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : 'bg-white/75 text-slate-600 hover:bg-black/5',
                                        ].join(' ')}
                                    >
                                        {index + 1}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="mt-6 space-y-3 text-sm text-[var(--muted)]">
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-[var(--surface-deep)]" />
                                Current question
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                                Answered
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-slate-300" />
                                Pending
                            </div>
                        </div>
                    </aside>

                    <div className="surface-panel rise-in rounded-[2rem] p-6 sm:p-8" style={{ animationDelay: '160ms' }}>
                    <h2 className="section-title text-3xl font-bold text-[var(--text)]">{currentQuestionIndex + 1}. {currentQuestion.text}</h2>
                    <div className="mt-6 space-y-4">
                        {currentQuestion.options.map((option, index) => (
                            <label key={index} className={`flex cursor-pointer items-start gap-4 rounded-[1.5rem] border p-4 transition-all ${answers[currentQuestion.id] === index ? 'border-[var(--accent)] bg-[var(--accent-soft)] shadow-sm' : 'border-black/8 bg-white/70 hover:border-[var(--accent)]/40 hover:bg-white'}`}>
                                <input type="radio" name={`question-${currentQuestion.id}`} className="mt-1 h-4 w-4 accent-[var(--accent)]" checked={answers[currentQuestion.id] === index} onChange={() => handleAnswerSelect(currentQuestion.id, index)} />
                                <div className="flex-1">
                                    <p className="font-medium text-[var(--text)]">{option}</p>
                                </div>
                                {answers[currentQuestion.id] === index && <CheckCircle2 className="mt-0.5 text-[var(--accent-deep)]" size={18} />}
                            </label>
                        ))}
                    </div>
                </div>
                </div>
            )}

            <div className="flex items-center justify-between gap-3">
                <button onClick={goToPrevious} disabled={currentQuestionIndex === 0} className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/75 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50">
                    <ArrowLeft size={16} />
                    Previous
                </button>
                {currentQuestionIndex === questions.length - 1 ? (
                    <button onClick={handleSubmit} className="inline-flex items-center gap-2 rounded-full bg-[var(--success)] px-6 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:brightness-95">
                        Submit Quiz
                    </button>
                ) : (
                    <button onClick={goToNext} className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-deep)] px-6 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-black">
                        Next
                        <ArrowRight size={16} />
                    </button>
                )}
            </div>
        </div>
    );
};
export default ExamPage;
