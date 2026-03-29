import React, { useState } from "react";
import { BrainCircuit, MessageSquareQuote, Send, Sparkles, Wand2 } from "lucide-react";
import api from "../services/api";

const InterviewPage = () => {

  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQuestion = async () => {
    try {
      setLoading(true);

      const res = await api.get("/interview/question", {
        params: { topic }
      });

      setQuestion(res.data);
      setEvaluation("");
      setAnswer("");

    } catch (error) {
      console.error(error);
      alert("Failed to generate question");
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    try {
      setLoading(true);

      const res = await api.post("/interview/evaluate", {
        question,
        answer
      });

      setEvaluation(res.data);

    } catch (error) {
      console.error(error);
      alert("Evaluation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <section className="surface-panel hero-grid rise-in rounded-[2rem] p-8">
        <span className="eyebrow mb-5">
          <Sparkles size={14} />
          Interview Studio
        </span>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="section-title max-w-2xl text-5xl font-bold leading-none tracking-tight text-[var(--text)]">
              Practice speaking through interviews before the real round begins.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)]">
              Generate topic-based questions, write your response, and get AI feedback on clarity, depth, and structure.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-[1.6rem] bg-white/70 p-5">
              <Wand2 className="mb-3 text-[var(--accent-deep)]" size={20} />
              <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">Prompted Questions</p>
              <p className="mt-2 text-lg font-semibold text-[var(--text)]">Fresh questions on demand</p>
            </div>
            <div className="rounded-[1.6rem] bg-white/70 p-5">
              <MessageSquareQuote className="mb-3 text-emerald-700" size={20} />
              <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">Answer Practice</p>
              <p className="mt-2 text-lg font-semibold text-[var(--text)]">Refine delivery and reasoning</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="surface-panel rise-in rounded-[2rem] p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-deep)] text-white">
              <BrainCircuit size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-deep)]">Setup</p>
              <h2 className="section-title text-3xl font-bold text-[var(--text)]">Choose an interview topic</h2>
            </div>
          </div>

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Interview Topic
          </label>

          <input
            type="text"
            placeholder="Spring Boot, Java, React, SQL..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full rounded-2xl border border-black/10 bg-white/75 px-4 py-3 outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]"
          />

          <button
            onClick={generateQuestion}
            disabled={loading || !topic}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-[var(--accent-deep)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Generating..." : "Generate Question"}
            {!loading && <Wand2 size={16} />}
          </button>
        </div>

        <div className="space-y-6">
          {question && (
            <div className="surface-panel rise-in rounded-[2rem] p-6 sm:p-8">
              <h2 className="section-title text-3xl font-bold text-[var(--text)]">
                Interview Question
              </h2>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">{question}</p>
            </div>
          )}

          {question && (
            <div className="surface-panel rise-in rounded-[2rem] p-6 sm:p-8">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Your Answer
              </label>

              <textarea
                rows="7"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full rounded-[1.5rem] border border-black/10 bg-white/75 px-4 py-4 outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]"
                placeholder="Type your answer here..."
              />

              <button
                onClick={submitAnswer}
                disabled={loading || !answer}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--success)] px-5 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Evaluating..." : "Submit Answer"}
                {!loading && <Send size={16} />}
              </button>
            </div>
          )}

          {evaluation && (
            <div className="surface-panel rise-in rounded-[2rem] p-6 sm:p-8">
              <h2 className="section-title text-3xl font-bold text-[var(--text)]">
                AI Evaluation
              </h2>

              <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-7 text-[var(--muted)]">
                {evaluation}
              </pre>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default InterviewPage;
