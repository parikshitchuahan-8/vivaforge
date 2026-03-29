import React, { useState } from "react";
import { Braces, Code2, Send, Sparkles, Wand2 } from "lucide-react";
import api from "../services/api";

const CodingInterview = () => {

  const [topic,setTopic] = useState("");
  const [question,setQuestion] = useState("");
  const [code,setCode] = useState("");
  const [result,setResult] = useState("");
  const [loading,setLoading] = useState(false);

  const generateQuestion = async () => {

    const res = await api.get("/coding/question",{
      params:{topic}
    });

    setQuestion(res.data);
  };

  const submitCode = async () => {

    try{

      setLoading(true);

      const res = await api.post("/coding/evaluate",{
        question,
        code
      });

      setResult(res.data);

    }catch(err){

      console.error(err);
      alert("Evaluation failed");

    }finally{

      setLoading(false);

    }

  };

  return(

    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <section className="surface-panel hero-grid rise-in rounded-[2rem] p-8">
        <span className="eyebrow mb-5">
          <Sparkles size={14} />
          Coding Interview Lab
        </span>
        <h1 className="section-title max-w-3xl text-5xl font-bold leading-none tracking-tight text-[var(--text)]">
          Simulate coding rounds with generated prompts and structured feedback.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)]">
          Choose a topic, receive a coding problem, write your solution, and get AI review on your approach.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface-panel rise-in rounded-[2rem] p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-deep)] text-white">
              <Code2 size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-deep)]">Prompt Setup</p>
              <h2 className="section-title text-3xl font-bold text-[var(--text)]">Generate a coding challenge</h2>
            </div>
          </div>

          <input
            className="w-full rounded-2xl border border-black/10 bg-white/75 px-4 py-3 outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]"
            placeholder="Topic (DSA, Java, Arrays...)"
            value={topic}
            onChange={(e)=>setTopic(e.target.value)}
          />

          <button
            onClick={generateQuestion}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-[var(--accent-deep)]"
          >
            Generate Coding Question
            <Wand2 size={16} />
          </button>
        </div>

        <div className="space-y-6">
          {question && (

            <div className="surface-panel rise-in rounded-[2rem] p-6 sm:p-8">

              <h2 className="section-title text-3xl font-bold text-[var(--text)]">
                Question
              </h2>

              <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-[var(--muted)]">
                {question}
              </p>

              <label className="mt-6 mb-2 block text-sm font-medium text-slate-700">
                Your Solution
              </label>

              <textarea
                rows="12"
                className="w-full rounded-[1.5rem] border border-black/10 bg-[#1f2a24] px-4 py-4 font-mono text-sm leading-6 text-slate-100 outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]"
                placeholder="Write your code here..."
                value={code}
                onChange={(e)=>setCode(e.target.value)}
              />

              <button
                onClick={submitCode}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--success)] px-5 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:brightness-95"
              >
                Submit Code
                <Send size={16} />
              </button>

            </div>
          )}

          {result && (

            <div className="surface-panel rise-in rounded-[2rem] p-6 sm:p-8">

              <div className="mb-4 flex items-center gap-3">
                <Braces className="text-[var(--accent-deep)]" size={20} />
                <h2 className="section-title text-3xl font-bold text-[var(--text)]">
                  AI Evaluation
                </h2>
              </div>

              <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-[var(--muted)]">
                {result}
              </pre>

            </div>

          )}
        </div>
      </section>

    </div>

  );

};

export default CodingInterview;
