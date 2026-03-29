import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Award, CircleAlert, Trophy } from 'lucide-react';

const ResultsPage = () => {
    const { id } = useParams();
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const lastResultData = localStorage.getItem('lastResult');
        if (lastResultData) {
            const parsedResult = JSON.parse(lastResultData);
            if (parsedResult.id == id) {
                setResult(parsedResult);
            }
        }
        setLoading(false);
    }, [id]);

    if (loading) return <p className="mt-8 text-center text-lg text-[var(--muted)]">Loading results...</p>;
    if (!result) return (
        <div className="surface-panel mx-auto mt-8 max-w-xl rounded-[2rem] p-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[var(--danger)]">
                <CircleAlert size={22} />
            </div>
            <h1 className="section-title mb-4 text-3xl font-bold text-[var(--danger)]">Result not found</h1>
            <p className="mb-6 text-[var(--muted)]">We couldn&apos;t load your result. This can happen if you refresh the page. Please return to the dashboard.</p>
            <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-deep)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black">
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>
        </div>
    );
    
    const percentage = ((result.score / result.totalQuestions) * 100).toFixed(2);
    const pass = percentage >= 50;

    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 text-center">
            <div className="surface-panel rise-in rounded-[2rem] p-8 sm:p-10">
                <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl ${pass ? 'bg-emerald-100 text-emerald-700' : 'bg-red-50 text-[var(--danger)]'}`}>
                    {pass ? <Trophy size={28} /> : <Award size={28} />}
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-deep)]">Assessment Summary</p>
                <h1 className="section-title mt-3 text-4xl font-bold text-[var(--text)]">Quiz Results</h1>
                <h2 className="mt-3 text-lg font-medium text-[var(--muted)]">{result.quiz.title}</h2>

                <div className={`mt-8 rounded-[1.75rem] p-8 ${pass ? 'bg-emerald-50' : 'bg-red-50'}`}>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">Your Score</p>
                    <p className={`my-3 text-6xl font-bold ${pass ? 'text-emerald-700' : 'text-[var(--danger)]'}`}>
                        {result.score} / {result.totalQuestions}
                    </p>
                    <p className="text-2xl font-semibold text-[var(--text)]">({percentage}%)</p>
                </div>

                <p className={`mt-8 text-2xl font-bold ${pass ? 'text-emerald-700' : 'text-[var(--danger)]'}`}>
                    {pass ? "Congratulations, you passed!" : "Keep going, you’re still building momentum."}
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                    {pass
                        ? 'Strong work. Your pace and accuracy were enough to clear this round.'
                        : 'Review the questions you missed, revisit the topic, and try another round with a calmer pace.'}
                </p>

                <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--surface-deep)] px-8 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-black">
                    <ArrowLeft size={16} />
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};
export default ResultsPage;
