import React, { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowRight, LockKeyhole, Sparkles } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/authService';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await loginUser({ username, password });
            login(response.data.token);
            navigate(from, { replace: true });
        } catch  {
            setError('Invalid username or password.');
        }
    };

    return (
        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="surface-panel hero-grid rise-in hidden rounded-[2rem] p-8 lg:flex lg:flex-col lg:justify-between">
                <div>
                    <span className="eyebrow mb-5">
                        <Sparkles size={14} />
                        Student Access
                    </span>
                    <h1 className="section-title max-w-lg text-5xl font-bold leading-none tracking-tight text-[var(--text)]">
                        Step back into your preparation cockpit.
                    </h1>
                    <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted)]">
                        Log in to continue timed quizzes, refine your interview practice, and keep all your preparation in one focused workspace.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                    <div className="rounded-[1.6rem] bg-white/70 p-5">
                        <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">Focused sessions</p>
                        <p className="mt-2 text-lg font-semibold text-[var(--text)]">Timer-backed exam flow</p>
                    </div>
                    <div className="rounded-[1.6rem] bg-white/70 p-5">
                        <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">AI support</p>
                        <p className="mt-2 text-lg font-semibold text-[var(--text)]">Quiz, study, and interview tools</p>
                    </div>
                    <div className="rounded-[1.6rem] bg-white/70 p-5">
                        <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">Results</p>
                        <p className="mt-2 text-lg font-semibold text-[var(--text)]">Immediate feedback after submission</p>
                    </div>
                </div>
            </section>

            <section className="surface-panel rise-in rounded-[2rem] p-6 sm:p-8 lg:p-10">
                <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-deep)] text-white">
                        <LockKeyhole size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-deep)]">Welcome Back</p>
                        <h2 className="section-title text-3xl font-bold text-[var(--text)]">Login to your account</h2>
                    </div>
                </div>

                {error && <p className="mb-5 rounded-2xl bg-red-50 px-4 py-3 text-center text-sm text-[var(--danger)]">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="username">Username</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-2xl border border-black/10 bg-white/75 px-4 py-3 outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]" placeholder="Enter your username" required />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-2xl border border-black/10 bg-white/75 px-4 py-3 outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]" placeholder="Enter your password" required />
                    </div>
                    <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-[var(--accent-deep)]">
                        Login
                        <ArrowRight size={16} />
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-[var(--muted)]">
                    Don&apos;t have an account?{' '}
                    <Link to="/register" className="font-semibold text-[var(--accent-deep)] hover:underline">
                        Register here
                    </Link>
                </p>
            </section>
        </div>
    );
};
export default LoginPage;
