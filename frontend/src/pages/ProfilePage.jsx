import React, { useState, useEffect } from 'react';
import { KeyRound, Mail, Save, ShieldCheck, UserRound } from 'lucide-react';
import { getUserProfile, updateUserProfile, updateUserPassword } from '../services/userService';

const ProfilePage = () => {
    const [profile, setProfile] = useState({ firstName: '', lastName: '', email: '' });
    const [password, setPassword] = useState({ oldPassword: '', newPassword: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUserProfile();
                setProfile(response.data);
            } catch  {
                setError('Failed to load profile.');
            }
        };
        fetchProfile();
    }, []);

    const handleProfileChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
    const handlePasswordChange = (e) => setPassword({ ...password, [e.target.name]: e.target.value });

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            await updateUserProfile(profile);
            setMessage('Profile updated successfully!');
        } catch  {
            setError('Failed to update profile.');
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            await updateUserPassword(password);
            setMessage('Password updated successfully!');
            setPassword({ oldPassword: '', newPassword: '' });
        } catch (err) {
            setError(err.response?.data || 'Failed to update password.');
        }
    };

    return (
        <div className="flex w-full flex-col gap-6">
            <section className="surface-panel hero-grid rise-in rounded-[2rem] p-8">
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-deep)]">Profile Center</p>
                        <h1 className="section-title mt-3 text-5xl font-bold leading-none tracking-tight text-[var(--text)]">
                            Keep your account details and security settings up to date.
                        </h1>
                        <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)]">
                            Update your personal information, keep your email current, and refresh your password whenever you need a stronger layer of protection.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                        <div className="rounded-[1.6rem] bg-white/70 p-5">
                            <Mail className="mb-3 text-[var(--accent-deep)]" size={20} />
                            <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">Identity</p>
                            <p className="mt-2 text-lg font-semibold text-[var(--text)]">Manage your public account details</p>
                        </div>
                        <div className="rounded-[1.6rem] bg-white/70 p-5">
                            <ShieldCheck className="mb-3 text-emerald-700" size={20} />
                            <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">Security</p>
                            <p className="mt-2 text-lg font-semibold text-[var(--text)]">Update your password securely</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="surface-panel rise-in rounded-[2rem] p-6 sm:p-8">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-deep)] text-white">
                            <UserRound size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-deep)]">Personal Info</p>
                            <h2 className="section-title text-3xl font-bold text-[var(--text)]">Update profile</h2>
                        </div>
                    </div>
                    <form onSubmit={handleProfileSubmit} className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="firstName">First Name</label>
                            <input type="text" name="firstName" value={profile.firstName || ''} onChange={handleProfileChange} className="w-full rounded-2xl border border-black/10 bg-white/75 px-4 py-3 outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]" />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="lastName">Last Name</label>
                            <input type="text" name="lastName" value={profile.lastName || ''} onChange={handleProfileChange} className="w-full rounded-2xl border border-black/10 bg-white/75 px-4 py-3 outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]" />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">Email</label>
                            <input type="email" name="email" value={profile.email || ''} onChange={handleProfileChange} className="w-full rounded-2xl border border-black/10 bg-white/75 px-4 py-3 outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]" />
                        </div>
                        <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-[var(--accent-deep)]">
                            <Save size={16} />
                            Update Profile
                        </button>
                    </form>
                </div>

                <div className="surface-panel rise-in rounded-[2rem] p-6 sm:p-8">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-deep)] text-white">
                            <KeyRound size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-deep)]">Access Security</p>
                            <h2 className="section-title text-3xl font-bold text-[var(--text)]">Change password</h2>
                        </div>
                    </div>
                    <form onSubmit={handlePasswordSubmit} className="space-y-5">
                         <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="oldPassword">Old Password</label>
                            <input type="password" name="oldPassword" value={password.oldPassword} onChange={handlePasswordChange} className="w-full rounded-2xl border border-black/10 bg-white/75 px-4 py-3 outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]" required />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="newPassword">New Password</label>
                            <input type="password" name="newPassword" value={password.newPassword} onChange={handlePasswordChange} className="w-full rounded-2xl border border-black/10 bg-white/75 px-4 py-3 outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]" required />
                        </div>
                        <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--surface-deep)] px-5 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-black">
                            <ShieldCheck size={16} />
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
             {message && <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-center text-sm text-[var(--success)]">{message}</p>}
             {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-center text-sm text-[var(--danger)]">{error}</p>}
        </div>
    );
};
export default ProfilePage;
