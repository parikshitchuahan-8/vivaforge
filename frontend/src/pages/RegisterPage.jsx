import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, BadgePlus, Sparkles } from 'lucide-react';
import { registerUser } from '../services/authService';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await registerUser({ username, email, password });
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="surface-panel rise-in rounded-[2rem] p-6 sm:p-8 lg:p-10">
                <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] text-white">
                        <BadgePlus size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-deep)]">Create Access</p>
                        <h2 className="section-title text-3xl font-bold text-[var(--text)]">Open a new account</h2>
                    </div>
                </div>

                {error && <p className="mb-5 rounded-2xl bg-red-50 px-4 py-3 text-center text-sm text-[var(--danger)]">{error}</p>}
                {success && <p className="mb-5 rounded-2xl bg-emerald-50 px-4 py-3 text-center text-sm text-[var(--success)]">{success}</p>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="username">Username</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-2xl border border-black/10 bg-white/75 px-4 py-3 outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]" placeholder="Choose a username" required />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-black/10 bg-white/75 px-4 py-3 outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]" placeholder="name@example.com" required />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-2xl border border-black/10 bg-white/75 px-4 py-3 outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]" placeholder="Create a secure password" required />
                    </div>
                    <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--surface-deep)] px-5 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-black">
                        Create Account
                        <ArrowRight size={16} />
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-[var(--muted)]">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-[var(--accent-deep)] hover:underline">
                        Login here
                    </Link>
                </p>
            </section>

            <section className="surface-panel hero-grid rise-in hidden rounded-[2rem] p-8 lg:flex lg:flex-col lg:justify-between">
                <div>
                    <span className="eyebrow mb-5">
                        <Sparkles size={14} />
                        Join the Platform
                    </span>
                    <h1 className="section-title max-w-lg text-5xl font-bold leading-none tracking-tight text-[var(--text)]">
                        Build a home base for exam practice that actually feels motivating.
                    </h1>
                    <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted)]">
                        Create an account to unlock quizzes, AI-generated practice sessions, interview prep, and instant score tracking inside one clean workspace.
                    </p>
                </div>

                <div className="grid gap-4">
                    <div className="rounded-[1.6rem] bg-white/70 p-5">
                        <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">1. Register</p>
                        <p className="mt-2 text-lg font-semibold text-[var(--text)]">Secure your student profile</p>
                    </div>
                    <div className="rounded-[1.6rem] bg-white/70 p-5">
                        <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">2. Practice</p>
                        <p className="mt-2 text-lg font-semibold text-[var(--text)]">Launch quizzes and AI coaching tools</p>
                    </div>
                    <div className="rounded-[1.6rem] bg-white/70 p-5">
                        <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">3. Improve</p>
                        <p className="mt-2 text-lg font-semibold text-[var(--text)]">Review results and keep iterating</p>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default RegisterPage;
