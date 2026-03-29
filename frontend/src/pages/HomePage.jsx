import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpenText, Clock3, Layers3, Sparkles } from 'lucide-react';
import { getAllQuizzes } from '../services/quizService';

const HomePage = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await getAllQuizzes();
                setQuizzes(response.data);
            } catch  {
                setError('Failed to fetch quizzes.');
            } finally {
                setLoading(false);
            }
        };
        fetchQuizzes();
    }, []);

    if (loading) return <p className="mt-8 text-center text-lg text-[var(--muted)]">Loading quizzes...</p>;
    if (error) return <p className="mt-8 text-center text-[var(--danger)]">{error}</p>;

    return (
        <div className="flex w-full flex-col gap-8 lg:gap-10">
            <section className="surface-panel hero-grid rise-in relative overflow-hidden rounded-[2rem] px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
                <div className="relative z-10 grid gap-10 lg:grid-cols-[1.35fr_0.95fr] lg:items-end">
                    <div className="max-w-3xl">
                        <span className="eyebrow mb-5">
                            <Sparkles size={14} />
                            Smart Practice Studio
                        </span>
                        <h1 className="section-title max-w-2xl text-5xl font-bold leading-none tracking-tight text-[var(--text)] sm:text-6xl">
                            Train for exams with a calmer, sharper workflow.
                        </h1>
                        <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
                            Browse curated quizzes, launch timed assessments, and build confidence with AI-powered preparation tools in one focused space.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <div className="rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-slate-700">Live quiz attempts</div>
                            <div className="rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-slate-700">Instant score feedback</div>
                            <div className="rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-slate-700">Interview and study tools</div>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                        <div className="rounded-[1.75rem] bg-[var(--surface-strong)] p-5 shadow-sm">
                            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent-deep)]">
                                <Layers3 size={20} />
                            </div>
                            <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">Quiz Library</p>
                            <p className="mt-2 text-3xl font-bold text-[var(--text)]">{quizzes.length}</p>
                        </div>
                        <div className="rounded-[1.75rem] bg-[var(--surface-strong)] p-5 shadow-sm">
                            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                                <Clock3 size={20} />
                            </div>
                            <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">Timed Sessions</p>
                            <p className="mt-2 text-lg font-semibold text-[var(--text)]">Built in</p>
                        </div>
                        <div className="rounded-[1.75rem] bg-[var(--surface-strong)] p-5 shadow-sm">
                            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                                <BookOpenText size={20} />
                            </div>
                            <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">Mode</p>
                            <p className="mt-2 text-lg font-semibold text-[var(--text)]">Practice + Assessment</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="rise-in" style={{ animationDelay: '120ms' }}>
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-deep)]">Available Quizzes</p>
                        <h2 className="section-title text-3xl font-bold text-[var(--text)]">Pick your next session</h2>
                    </div>
                    <p className="max-w-xl text-sm leading-6 text-[var(--muted)]">
                        Each quiz opens in a focused view with timer support and instant scoring once you submit.
                    </p>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                    {quizzes.map((quiz, index) => (
                        <div
                            key={quiz.id}
                            className="surface-panel rise-in flex flex-col justify-between rounded-[1.8rem] p-6"
                            style={{ animationDelay: `${index * 80}ms` }}
                        >
                            <div>
                                <div className="mb-4 flex flex-wrap gap-2">
                                    <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-deep)]">
                                        Exam Track
                                    </span>
                                    <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-slate-600">
                                        {quiz.questions.length} questions
                                    </span>
                                </div>
                                <h3 className="section-title text-3xl font-bold text-[var(--text)]">{quiz.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                                    {quiz.description || 'Sharpen recall, pacing, and exam confidence with a structured attempt.'}
                                </p>
                            </div>

                            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="rounded-2xl bg-white/70 px-4 py-3">
                                        <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">Questions</p>
                                        <p className="mt-1 text-lg font-semibold text-[var(--text)]">{quiz.questions.length}</p>
                                    </div>
                                    <div className="rounded-2xl bg-white/70 px-4 py-3">
                                        <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">Duration</p>
                                        <p className="mt-1 text-lg font-semibold text-[var(--text)]">{quiz.durationMinutes} min</p>
                                    </div>
                                </div>

                                <Link
                                    to={`/quiz/${quiz.id}`}
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--surface-deep)] px-5 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-black"
                                >
                                    Start Quiz
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {quizzes.length === 0 && (
                <div className="surface-panel rounded-[1.8rem] px-6 py-10 text-center text-[var(--muted)]">
                    No quizzes are available yet.
                </div>
            )}
        </div>
    );
};
export default HomePage;
