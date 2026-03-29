import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BrainCircuit, Code2, Menu, Sparkles, UserRound, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const navItems = [
  { to: "/ai-quiz", label: "AI Quiz", icon: Sparkles },
  { to: "/interview", label: "AI Interview", icon: UserRound },
  { to: "/coding", label: "AI Coding", icon: Code2 },
  { to: "/study", label: "AI Study", icon: BrainCircuit },
];

const AppNavbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  const desktopLinkClass = ({ isActive }) =>
    [
      "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
      isActive
        ? "bg-[var(--surface-strong)] text-[var(--accent-deep)] shadow-sm"
        : "text-slate-700 hover:bg-white/60 hover:text-[var(--accent-deep)]",
    ].join(" ");

  const mobileLinkClass = ({ isActive }) =>
    [
      "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
      isActive
        ? "bg-[var(--accent-soft)] text-[var(--accent-deep)]"
        : "text-slate-700 hover:bg-black/5",
    ].join(" ");

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="surface-panel relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between rounded-[2rem] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4 lg:gap-8">
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/5 bg-white/70 text-slate-700 md:hidden"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={() => setMenuOpen(false)}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface-deep)] text-white shadow-lg shadow-black/10">
              <BrainCircuit size={20} />
            </span>
            <span className="section-title text-2xl font-bold tracking-tight text-[var(--text)]">
              VivaForge
            </span>
          </Link>

          {auth.user && (
            <div className="hidden items-center gap-2 md:flex">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink key={to} to={to} className={desktopLinkClass}>
                  <Icon size={16} />
                  {label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {auth.user ? (
            <>
              <div className="hidden rounded-full bg-white/70 px-4 py-2 text-sm text-slate-700 lg:block">
                Signed in as <span className="font-semibold">{auth.user.username}</span>
              </div>

              <NavLink
                to="/profile"
                className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-[var(--accent-deep)]"
              >
                <UserRound size={16} />
                Profile
              </NavLink>

              <button
                onClick={handleLogout}
                className="inline-flex items-center rounded-full bg-[var(--surface-deep)] px-4 py-2 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-black"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-[var(--accent-deep)]"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {menuOpen && auth.user && (
        <div className="relative z-10 mx-auto mt-3 flex w-full max-w-7xl flex-col gap-2 rounded-[1.75rem] border border-black/5 bg-[var(--surface-strong)]/95 p-3 shadow-xl backdrop-blur md:hidden">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={mobileLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/profile"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-black/5"
            onClick={() => setMenuOpen(false)}
          >
            <UserRound size={18} />
            Profile
          </NavLink>
          <button
            onClick={handleLogout}
            className="rounded-2xl bg-[var(--surface-deep)] px-4 py-3 text-left text-sm font-semibold text-white"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default AppNavbar;
