import React, { useMemo, useState, useEffect } from "react";
import { GitPullRequest, Database, KanbanSquare, Copy, Check } from "lucide-react";

const TABS = [
  {
    key: "code",
    label: "Code Reviews",
    icon: GitPullRequest,
    headline: "AI code reviews that understand your repo, not just your diff.",
    points: [
      "Policy-aware checks for security, performance, and data flows",
      "Learns conventions; flags schema/API drift across services",
      "Inline, actionable suggestions mapped to owners and context",
    ],
    cta: { href: "/contact", label: "Try Code Reviews" },
    code: `# Example: enforce policy in CI
legiguard review \\
  --repo org/app \\
  --policy security,performance \\
  --block-on high`,
  },
  {
    key: "db",
    label: "Database Audits",
    icon: Database,
    headline: "Continuous audits for posture, performance, and privacy.",
    points: [
      "PII discovery + column lineage; permission and role diffs",
      "Index health, query plan hotspots, and storage anomalies",
      "Exportable evidence packs for SOC 2 / ISO 27001",
    ],
    cta: { href: "/contact", label: "Run a DB Baseline" },
    code: `# Example: baseline a Postgres cluster
legiguard db audit \\
  --conn $POSTGRES_URL \\
  --export evidence.zip`,
  },
  {
    key: "crm",
    label: "Self-Deploying CRM",
    icon: KanbanSquare,
    headline: "Turn a spec into a running CRM in hours, not weeks.",
    points: [
      "Infer entities, roles, and pipelines from text or PDFs",
      "Spin up a ready-to-use stack with sensible defaults",
      "Iterate via prompts or Git; infra handled for you",
    ],
    cta: { href: "/contact", label: "Generate a CRM" },
    code: `# Example: generate from a process doc
legiguard crm deploy \\
  --spec ./sales-process.pdf \\
  --env prod`,
  },
];

const Animated = ({ deps, children }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(false);
    const id = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(id);
  }, [deps]);
  return (
    <div
      className={`transition-all duration-300 ease-out ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      {children}
    </div>
  );
};

const Capabilities = () => {
  const [active, setActive] = useState("code");
  const [copiedKey, setCopiedKey] = useState(null);

  const tab = useMemo(
    () => TABS.find((t) => t.key === active) ?? TABS[0],
    [active]
  );
  const Icon = tab.icon;

  const copyCode = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1200);
    } catch {}
  };

  // Simple inline syntax highlighter for the demo block
  const renderCode = (code) => {
    return code.split("\n").map((line, idx) => {
      if (line.trim().startsWith("#")) {
        return (
          <div key={idx} className="text-emerald-400">
            {line}
          </div>
        );
      }
      const parts = line.split(" ").filter((p) => p.length > 0);
      return (
        <div key={idx}>
          {parts.map((tok, i) => {
            let cls = "text-gray-100";
            if (tok === "legiguard") cls = "text-purple-400";
            else if (tok.startsWith("--")) cls = "text-sky-300";
            return (
              <span key={i} className={cls}>
                {tok}
                {i < parts.length - 1 ? " " : ""}
              </span>
            );
          })}
        </div>
      );
    });
  };

  return (
    <section id="capabilities" className="py-28 relative">
      {/* Prestige backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(0,79,206,0.25),transparent_60%),linear-gradient(180deg,#0B1020_0%,#0B1020_40%,#0E1428_100%)]" />
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] rounded-full blur-3xl opacity-20 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-500" />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-questrial text-white tracking-tight leading-tight">
            The LegiGuard Capabilities
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            One control plane for AI code reviews, database audits, and
            self-deploying CRMs — compliance built-in.
          </p>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="LegiGuard Capabilities"
          className="relative mx-auto grid grid-cols-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-1 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] max-w-3xl"
        >
          {/* animated indicator with glow */}
          <div
            className={`absolute top-1 bottom-1 w-1/3 rounded-xl bg-white/10 backdrop-blur-sm transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.18)] ring-1 ring-white/20`}
            style={{
              transform:
                active === "code"
                  ? "translateX(0%)"
                  : active === "db"
                  ? "translateX(100%)"
                  : "translateX(200%)",
            }}
            aria-hidden
          />
          {TABS.map(({ key, label, icon: TabIcon }) => {
            const isActive = key === active;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${key}`}
                id={`tab-${key}`}
                onClick={() => setActive(key)}
                className={`relative z-10 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition cursor-pointer
                  ${isActive ? "text-white" : "text-gray-300 hover:text-white/90 hover:ring-1 hover:ring-white/20"}`}
              >
                <TabIcon className="w-4 h-4" />
                {label}
                {/* subtle underline on active for extra polish */}
                {isActive && (
                  <span className="absolute -bottom-0.5 h-[2px] w-6 rounded-full bg-white/70"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div
          role="tabpanel"
          id={`panel-${tab.key}`}
          aria-labelledby={`tab-${tab.key}`}
          className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
        >
          {/* Left: text card */}
          <Animated deps={tab.key}>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center rounded-xl bg-white/10 text-white w-10 h-10 ring-1 ring-white/15">
                  <Icon className="w-5 h-5" />
                </span>
                <h3 className="text-2xl font-semibold text-white leading-snug">
                  {tab.label}
                </h3>
              </div>
              <p className="text-gray-200 mb-6">{tab.headline}</p>
              <ul className="space-y-3">
                {tab.points.map((p, i) => (
                  <li key={i} className="text-gray-300 leading-relaxed flex gap-2">
                    <Check className="w-4 h-4 mt-[2px] text-emerald-300 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <a
                href={tab.cta.href}
                className="mt-8 inline-block rounded-lg px-6 py-3 font-semibold tracking-wide transition-all duration-200
                           bg-white text-[#0B1020] hover:bg-gray-100 hover:-translate-y-0.5 shadow-[0_8px_30px_rgba(255,255,255,0.15)]"
              >
                {tab.cta.label}
              </a>
            </div>
          </Animated>

          {/* Right: code card */}
          <Animated deps={tab.key}>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="text-xs uppercase tracking-wide text-gray-300">
                  Example
                </div>
                <button
                  onClick={() => copyCode(tab.code, tab.key)}
                  className="inline-flex items-center gap-2 text-xs text-gray-200 hover:text-white transition cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  {copiedKey === tab.key ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="text-sm leading-7 overflow-auto p-5 bg-[#0b1020] text-gray-100">
                {renderCode(tab.code)}
              </pre>
              <div className="px-5 py-4 border-t border-white/10 text-sm text-gray-300">
                Works with GitHub/GitLab/Bitbucket, Postgres/MySQL/Snowflake, and
                AWS/GCP/Azure.
              </div>
            </div>
          </Animated>
        </div>

        <div className="mt-8 text-center text-xs text-gray-400">
          Built for security-first teams. Enterprise options include SSO, private
          inference, and advanced RBAC.
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
