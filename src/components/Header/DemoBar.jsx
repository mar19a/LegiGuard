import React, { useEffect, useState } from "react";
import { ShieldCheck, Code2, Database, Rocket, Lock, CheckCircle } from "lucide-react";

const industries = ["Finance", "Healthcare", "SaaS", "E-commerce", "GovTech", "Biotech", "Tech"];

const Pill = ({ icon: Icon, children }) => (
  <li>
    <span
      className="
        group relative inline-flex items-center gap-2
        rounded-full bg-white border border-gray-200 px-3 py-1.5
        text-xs md:text-sm text-gray-700 shadow-sm transition
        hover:-translate-y-0.5 hover:shadow-md focus:outline-none
        focus-visible:ring-2 focus-visible:ring-blue-500/50
      "
      role="button"
      tabIndex={0}
    >
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span
          className="
            absolute -left-1/2 top-0 h-full w-1/2
            bg-gradient-to-r from-transparent via-white/50 to-transparent
            opacity-0 transition-all duration-700
            group-hover:left-full group-hover:opacity-100
            motion-reduce:transition-none
          "
        />
      </span>

      <span
        className="
          absolute inset-0 rounded-full ring-0 ring-blue-500/0
          transition group-hover:ring-4 group-hover:ring-blue-500/5
        "
      />
      <Icon className="h-3.5 w-3.5 relative z-10" aria-hidden="true" />
      <span className="relative z-10">{children}</span>
    </span>
  </li>
);

function useTypewriter(words, typing = 60, pause = 1200) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    const full = words[i % words.length];
    const next = isDeleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1);
    const baseSpeed = isDeleting ? typing / 2 : typing;

    const timer = setTimeout(() => {
      setText(next);

      if (!isDeleting && next === full) {
        setTimeout(() => setIsDeleting(true), pause);
      } else if (isDeleting && next === "") {
        setIsDeleting(false);
        setI((prev) => prev + 1);
      }
    }, baseSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, i, words, typing, pause]);

  return text;
}

const DemoBar = () => {
  const typed = useTypewriter(industries);

  return (
    <section className="w-full bg-transparent px-6 py-20 my-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600">
            Build boldly. We handle the rest.
          </span>
        </h1>

        {/* Subhead */}
        <p className="text-base md:text-lg text-gray-600 mt-3">
          AI-grade oversight for compliance, code, and data — so your team ships with confidence.
        </p>

        {/* Industries (typewriter) */}
        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
          <span className="uppercase tracking-wide">Trusted across industries</span>
          <span className="h-3 w-px bg-gray-200" />
          <div className="opacity-80 font-medium" aria-live="polite" aria-atomic="true">
            <span className="text-gray-400">{typed}</span>
            <span className="ml-1 inline-block w-[1px] h-4 bg-gray-400 align-middle animate-pulse" />
          </div>
        </div>

        {/* Feature pills */}
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Pill icon={ShieldCheck}>Compliance automation</Pill>
          <Pill icon={Code2}>Code reviews</Pill>
          <Pill icon={Database}>Database audits</Pill>
          <Pill icon={Rocket}>Self-deploying CRM</Pill>
        </ul>

        {/* Form */}
        <div className="mt-8 max-w-xl mx-auto rounded-2xl border border-gray-200 bg-white/80 backdrop-blur shadow-md">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row items-center gap-3 p-4"
            aria-label="Schedule a demo"
          >
            <label htmlFor="work-email" className="sr-only">
              Work email
            </label>
            <input
              id="work-email"
              type="email"
              required
              placeholder="Work email"
              className="bg-white px-4 py-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-button text-white px-5 py-3 rounded-md hover:bg-button/90 transition text-sm font-semibold whitespace-nowrap inline-flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Schedule demo
            </button>
          </form>
          <div className="flex items-center justify-center gap-2 pb-4 -mt-2">
            <Lock className="h-3.5 w-3.5 text-gray-400" />
            <p className="text-xs text-gray-500">Enterprise privacy • No spam</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoBar;
