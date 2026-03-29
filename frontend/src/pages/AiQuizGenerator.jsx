import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BrainCircuit, ListChecks, Sparkles } from "lucide-react";
import { generateAIQuiz } from "../services/quizService";

const AiQuizGenerator = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    topic: "",
    difficulty: "EASY",
    count: 5,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const res = await generateAIQuiz(form);
    navigate(`/quiz/${res.data.id}`);

    } catch (err) {
      alert("Failed to generate AI quiz");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="surface-panel hero-grid rise-in rounded-[2rem] p-8">
        <span className="eyebrow mb-5">
          <Sparkles size={14} />
          AI Quiz Builder
        </span>
        <h1 className="section-title max-w-xl text-5xl font-bold leading-none tracking-tight text-[var(--text)]">
          Turn any topic into a ready-to-run practice session.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted)]">
          Pick a topic, tune the difficulty, and generate a fresh quiz you can start immediately inside the exam flow.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[1.6rem] bg-white/70 p-5">
            <BrainCircuit className="mb-3 text-[var(--accent-deep)]" size={20} />
            <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">Custom Topic</p>
            <p className="mt-2 text-lg font-semibold text-[var(--text)]">Generate around any concept</p>
          </div>
          <div className="rounded-[1.6rem] bg-white/70 p-5">
            <Sparkles className="mb-3 text-emerald-700" size={20} />
            <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">Difficulty</p>
            <p className="mt-2 text-lg font-semibold text-[var(--text)]">Easy to hard pacing</p>
          </div>
          <div className="rounded-[1.6rem] bg-white/70 p-5">
            <ListChecks className="mb-3 text-sky-700" size={20} />
            <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">Instant Start</p>
            <p className="mt-2 text-lg font-semibold text-[var(--text)]">Launch the quiz right after creation</p>
          </div>
        </div>
      </section>

      <section className="surface-panel rise-in rounded-[2rem] p-6 sm:p-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-deep)]">Generator Settings</p>
          <h2 className="section-title mt-2 text-3xl font-bold text-[var(--text)]">Create your next quiz</h2>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Quiz Title</label>
            <input
              type="text"
              name="title"
              placeholder="Frontend Fundamentals Sprint"
              className="w-full rounded-2xl border border-black/10 bg-white/75 px-4 py-3 outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Topic</label>
            <input
              type="text"
              name="topic"
              placeholder="Java OOP, DBMS joins, React hooks..."
              className="w-full rounded-2xl border border-black/10 bg-white/75 px-4 py-3 outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Difficulty</label>
            <select
              name="difficulty"
              className="w-full rounded-2xl border border-black/10 bg-white/75 px-4 py-3 outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]"
              onChange={handleChange}
            >
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Question Count</label>
            <input
              type="number"
              name="count"
              min="1"
              max="20"
              className="w-full rounded-2xl border border-black/10 bg-white/75 px-4 py-3 outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]"
              onChange={handleChange}
              value={form.count}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-[var(--accent-deep)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Generating..." : "Generate AI Quiz"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </div>
      </section>
    </div>
  );
};

export default AiQuizGenerator;
