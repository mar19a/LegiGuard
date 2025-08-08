import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, SearchCheck, LineChart, ArrowRight } from "lucide-react";

const RAW_STEPS = [
  {
    key: "connect",
    icon: ShieldCheck,
    title: "Connect Your Data",
    description:
      "Securely connect cloud, code repos, ticketing, and docs in minutes with OAuth & granular scopes.",
    badge: "Step 1",
    accent: "from-emerald-400 to-emerald-600",
  },
  {
    key: "scan",
    icon: SearchCheck,
    title: "AI Risk Scan",
    description:
      "Legi analyzes configs, policies, and logs to surface gaps, drift, and audit blockers in real time.",
    badge: "Step 2",
    accent: "from-blue-400 to-blue-600",
  },
  {
    key: "plan",
    icon: LineChart,
    title: "Action Plan Delivered",
    description:
      "Get a prioritized roadmap, auto-generated controls & policies, and track progress to done.",
    badge: "Step 3",
    accent: "from-purple-400 to-purple-600",
  },
];

const HowItWorks = () => {
  const [active, setActive] = useState("connect");
  const steps = useMemo(() => RAW_STEPS, []);

  const activeStep = steps.find((s) => s.key === active) || steps[0];

  return (
    <section className="relative py-28 bg-white">
      {/* Soft background texture (very subtle) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#111_1px,transparent_1px)] bg-[length:18px_18px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Headline */}
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            From first connection to a shipped audit plan. Built for speed, clarity, and control.
          </p>
        </div>

        {/* Layout */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Vertical Stepper */}
          <div className="lg:col-span-5">
            <ol className="relative border-s border-gray-200">
              {steps.map((step, idx) => {
                const isActive = active === step.key;
                return (
                  <li key={step.key} className="ms-6 pb-10 last:pb-0">
                    {/* Node */}
                    <span
                      className={[
                        "absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full ring-8 ring-white",
                        isActive ? "bg-gradient-to-r from-emerald-500 to-blue-600" : "bg-gray-200",
                      ].join(" ")}
                    />
                    {/* Card */}
                    <button
                      onMouseEnter={() => setActive(step.key)}
                      onFocus={() => setActive(step.key)}
                      onClick={() => setActive(step.key)}
                      className={[
                        "w-full text-left rounded-xl border transition shadow-sm",
                        "border-gray-200 hover:border-gray-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-300",
                        "bg-white",
                        isActive ? "ring-1 ring-emerald-300/60" : "",
                      ].join(" ")}
                    >
                      <div className="p-4 flex items-start gap-4">
                        <div
                          className={[
                            "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white",
                            "bg-gradient-to-br",
                            step.accent,
                          ].join(" ")}
                        >
                          <step.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] uppercase tracking-wide text-gray-500">
                              {step.badge}
                            </span>
                            {isActive && (
                              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                                Active <ArrowRight className="h-3 w-3" />
                              </span>
                            )}
                          </div>
                          <h3 className="mt-1 text-lg font-semibold text-gray-900">{step.title}</h3>
                          <p className="mt-1.5 text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Right: Sticky Preview Panel (changes by step) */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24">
              <div className="relative rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden">
                {/* Accent gradient frame */}
                <div className="pointer-events-none absolute -inset-px rounded-2xl border border-gray-200/80 bg-white/30 backdrop-blur-md" />


                {/* Window chrome */}
                <div className="relative z-10 border-b border-gray-200 bg-gray-50 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <div className="text-xs text-gray-500">Live preview</div>
                  <div className="w-16" />
                </div>

                {/* Animated content */}
                <div className="relative z-10 p-6 md:p-8">
                  <AnimatePresence mode="wait">
                    {activeStep.key === "connect" && (
                      <motion.div
                        key="connect"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6"
                      >
                        {/* Connect grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {[
                            { name: "Slack", color: "from-indigo-500 to-sky-500" },
                            { name: "AWS", color: "from-amber-500 to-orange-600" },
                            { name: "GitHub", color: "from-gray-700 to-gray-900" },
                            { name: "Google Drive", color: "from-green-500 to-emerald-600" },
                            { name: "Jira", color: "from-blue-500 to-blue-700" },
                            { name: "Okta", color: "from-purple-500 to-fuchsia-600" },
                          ].map((i) => (
                            <div
                              key={i.name}
                              className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 hover:shadow-sm transition"
                            >
                              <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${i.color}`} />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{i.name}</p>
                                <p className="text-xs text-gray-500">OAuth • Scoped</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Inline note */}
                        <div className="rounded-xl bg-emerald-50 text-emerald-900 text-sm px-4 py-3 border border-emerald-100">
                          Connections use read-only scopes by default. Write access is optional & auditable.
                        </div>
                      </motion.div>
                    )}

                    {activeStep.key === "scan" && (
                      <motion.div
                        key="scan"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6"
                      >
                        {/* Scan summary cards */}
                        <div className="grid sm:grid-cols-3 gap-4">
                          <div className="rounded-xl border border-gray-200 p-4">
                            <p className="text-xs text-gray-500">Policies</p>
                            <p className="mt-1 text-2xl font-semibold text-gray-900">85%</p>
                            <p className="text-xs text-gray-500">coverage</p>
                          </div>
                          <div className="rounded-xl border border-gray-200 p-4">
                            <p className="text-xs text-gray-500">Controls</p>
                            <p className="mt-1 text-2xl font-semibold text-gray-900">142</p>
                            <p className="text-xs text-gray-500">checked</p>
                          </div>
                          <div className="rounded-xl border border-gray-200 p-4">
                            <p className="text-xs text-gray-500">Findings</p>
                            <p className="mt-1 text-2xl font-semibold text-gray-900">7</p>
                            <p className="text-xs text-gray-500">need attention</p>
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div>
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                            <span>Environment Scan</span>
                            <span>62%</span>
                          </div>
                          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                            <motion.div
                              initial={{ width: "0%" }}
                              animate={{ width: "62%" }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500"
                            />
                          </div>
                        </div>

                        {/* Findings list */}
                        <ul className="mt-2 space-y-2">
                          {[
                            "MFA disabled for 2 admin users",
                            "Logging retention < 90 days",
                            "Missing vendor risk policy",
                          ].map((f) => (
                            <li key={f} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-blue-500" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}

                    {activeStep.key === "plan" && (
                      <motion.div
                        key="plan"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6"
                      >
                        {/* Roadmap */}
                        <div className="space-y-3">
                          {[
                            { t: "Enable MFA for admins", eta: "10 min", tag: "Security" },
                            { t: "Publish Vendor Risk Policy", eta: "Auto-generate", tag: "Policy" },
                            { t: "Increase log retention to 90d", eta: "15 min", tag: "Logging" },
                          ].map((task) => (
                            <div
                              key={task.t}
                              className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3"
                            >
                              <div className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-purple-500" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{task.t}</p>
                                  <p className="text-xs text-gray-500">{task.tag}</p>
                                </div>
                              </div>
                              <span className="text-xs text-gray-500">{task.eta}</span>
                            </div>
                          ))}
                        </div>

                        {/* CTA row */}
                        <div className="flex flex-wrap items-center gap-3">
                          <button className="inline-flex items-center gap-2 rounded-md bg-black px-4 py-2 text-sm text-white hover:opacity-90">
                            Generate Policies
                            <ArrowRight className="h-4 w-4" />
                          </button>
                          <button className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50">
                            Export Controls
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Microtrust strip */}
              <div className="mt-6 text-xs text-gray-500">
                SOC 2–ready templates • Audit trail on every change • Enterprise SSO
              </div>
            </div>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="lg:hidden mt-10 flex items-center justify-center gap-3">
          <a
            href="/signup"
            className="text-sm px-4 py-2 rounded-md bg-black text-white hover:opacity-90"
          >
            Start free
          </a>
          <a
            href="/demo"
            className="text-sm px-4 py-2 rounded-md bg-white ring-1 ring-gray-300 hover:bg-gray-50"
          >
            Book demo
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
