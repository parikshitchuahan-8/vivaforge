import React, { useState } from "react";
import { BookOpenText, Send, Sparkles } from "lucide-react";
import api from "../services/api";

const StudyAssistant = () => {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    try {

      setLoading(true);

      const res = await api.post("/study/ask", {
        question
      });

      setAnswer(res.data);

    } catch (err) {
      console.error(err);
      alert("AI request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <section className="surface-panel hero-grid rise-in rounded-[2rem] p-8">
        <span className="eyebrow mb-5">
          <Sparkles size={14} />
          Study Assistant
        </span>
        <h1 className="section-title max-w-3xl text-5xl font-bold leading-none tracking-tight text-[var(--text)]">
          Ask for explanations, revisions, and concept support in one focused place.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)]">
          Use the assistant like a study partner when you need quick clarification, examples, or a simpler explanation of tough topics.
        </p>
      </section>

      <section className="surface-panel rise-in rounded-[2rem] p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-deep)] text-white">
            <BookOpenText size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-deep)]">Ask Anything</p>
            <h2 className="section-title text-3xl font-bold text-[var(--text)]">What do you want to understand better?</h2>
          </div>
        </div>

        <textarea
          className="w-full rounded-[1.5rem] border border-black/10 bg-white/75 px-4 py-4 outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]"
          rows="5"
          placeholder="Explain normalization in DBMS with an example..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          onClick={askAI}
          disabled={loading || !question}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-[var(--accent-deep)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Thinking..." : "Ask AI"}
          {!loading && <Send size={16} />}
        </button>
      </section>

      {answer && (
        <section className="surface-panel rise-in rounded-[2rem] p-6 sm:p-8">
          <h2 className="section-title text-3xl font-bold text-[var(--text)]">
            AI Response
          </h2>

          <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-[var(--muted)]">{answer}</p>
        </section>
      )}
    </div>
  );
};

export default StudyAssistant;
