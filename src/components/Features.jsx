import React, { useMemo, useState } from "react";
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  FileDown,
  BookOpenCheck,
  ArrowRight,
  Filter,
  Search as SearchIcon,
  Sparkles
} from "lucide-react";

const iconMap = {
  "Policy Generator": FileText,
  "Audit Tracker": ShieldCheck,
  "Risk Alerts": AlertTriangle,
  "Export Reports": FileDown,
  "Compliance Wiki": BookOpenCheck,
};

const FEATURES = [
  {
    title: "Policy Generator",
    description: "Generate GDPR, SOC 2, and HIPAA templates instantly.",
    bullets: ["Pre-vetted clauses", "Multi-framework mapping", "Version history"],
    href: "/features/policy-generator",
    category: "Automation",
    tags: ["SOC2", "GDPR", "HIPAA"],
    kpi: "Setup 2 min",
  },
  {
    title: "Audit Tracker",
    description: "Track readiness and detect missing compliance controls.",
    bullets: ["Real-time score", "Control gap detection", "Evidence checklist"],
    href: "/features/audit-tracker",
    category: "Monitoring",
    tags: ["SOC2", "ISO27001"],
    kpi: "142 checks",
  },
  {
    title: "Risk Alerts",
    description: "AI-based risk detection for audit and data gaps.",
    bullets: ["Anomaly flags", "Drift detection", "Severity triage"],
    href: "/features/risk-alerts",
    category: "Monitoring",
    tags: ["GDPR", "SOC2"],
    kpi: "Live",
  },
  {
    title: "Export Reports",
    description: "Summarize compliance efforts in sharable PDF reports.",
    bullets: ["Branded PDFs", "Exec summaries", "Audit-ready exports"],
    href: "/features/export-reports",
    category: "Reporting",
    tags: ["SOC2", "ISO27001"],
    kpi: "1-click",
  },
  {
    title: "Compliance Wiki",
    description: "Centralized glossary of terms, acronyms, and controls.",
    bullets: ["Org-wide terms", "Linked controls", "Search & filters"],
    href: "/features/compliance-wiki",
    category: "Knowledge",
    tags: ["GDPR", "SOC2"],
    kpi: "New",
    comingSoon: true,
  },
];

const CATEGORIES = ["All", "Automation", "Monitoring", "Reporting", "Knowledge"];

const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const features = useMemo(() => FEATURES, []);
  const active = features[activeIndex];
  const ActiveIcon = iconMap[active.title];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return features.filter((f) => {
      const matchesCat = cat === "All" || f.category === cat;
      const matchesQ =
        !q ||
        f.title.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.tags.join(" ").toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [features, query, cat]);

  // If current active is filtered out, move spotlight to first visible
  React.useEffect(() => {
    const i = filtered.findIndex((f) => f.title === active.title);
    if (i === -1 && filtered.length) {
      const next = features.findIndex((f) => f.title === filtered[0].title);
      if (next !== -1) setActiveIndex(next);
    }
  }, [filtered, active.title, features]);

  return (
    <section className="relative bg-white" id="features">
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Sticky Spotlight */}
        <aside className="lg:col-span-5 lg:sticky lg:top-28 self-start">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50/60">
              <h2 className="text-3xl font-bold font-questrial text-gray-900">
                Compliance Made Effortless
              </h2>
              <p className="mt-2 text-gray-600">
                Automate audits, close gaps, and stay ready. Without the busywork.
              </p>
            </div>

            {/* Active feature detail */}
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 text-white shadow-sm">
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{active.title}</h3>
                  <p className="mt-1.5 text-gray-700">{active.description}</p>

                  {/* Tag row */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {active.tags?.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] rounded-full bg-gray-100 text-gray-700 px-2 py-0.5 ring-1 ring-gray-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bullets */}
              <ul className="mt-5 space-y-2">
                {active.bullets?.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {b}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-6">
                <a
                  href={active.href}
                  className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* Right: Controls + Interactive Grid */}
        <div className="lg:col-span-7">
          {/* Controls */}
          <div className="mb-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search */}
            <div className="relative w-full sm:max-w-xs">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search features, tags, frameworks…"
                className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white"
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1 text-xs text-gray-500">
                <Filter className="w-3.5 h-3.5" /> Filter
              </span>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={[
                    "text-xs px-3 py-1.5 rounded-full border transition",
                    c === cat
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50",
                  ].join(" ")}
                  aria-pressed={c === cat}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {filtered.map((f) => {
              const idx = features.findIndex((x) => x.title === f.title);
              const Icon = iconMap[f.title];
              const isActive = idx === activeIndex;
              return (
                <button
                  key={f.title}
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={[
                    "relative text-left rounded-2xl border p-5 transition-all bg-white",
                    "hover:shadow-md focus:outline-none",
                    isActive
                      ? "border-emerald-300 ring-2 ring-emerald-200"
                      : "border-gray-200 hover:border-gray-300",
                  ].join(" ")}
                  aria-pressed={isActive}
                >
                  {/* Coming soon ribbon */}
                  {f.comingSoon && (
                    <span className="absolute -top-2 -right-2 inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-800 ring-1 ring-amber-200 px-2 py-1 text-[10px] font-medium">
                      <Sparkles className="w-3 h-3" />
                      Coming soon
                    </span>
                  )}

                  <div className="flex items-start gap-4">
                    <div
                      className={[
                        "inline-flex h-11 w-11 items-center justify-center rounded-xl",
                        "bg-white shadow-sm border",
                        isActive ? "border-emerald-200" : "border-gray-200",
                      ].join(" ")}
                    >
                      <Icon
                        className={[
                          "w-6 h-6",
                          isActive ? "text-emerald-600" : "text-neutral-800",
                        ].join(" ")}
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-lg font-semibold text-gray-900">{f.title}</h4>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {f.description}
                      </p>

                      {/* Tags + KPI */}
                      <div className="mt-3 flex items-center gap-2 flex-wrap">
                        {f.tags?.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] rounded-full bg-gray-100 text-gray-700 px-2 py-0.5 ring-1 ring-gray-200"
                          >
                            {t}
                          </span>
                        ))}
                        {f.kpi && (
                          <span className="ml-auto text-[10px] rounded-full bg-emerald-50 text-emerald-800 px-2 py-0.5 ring-1 ring-emerald-200">
                            {f.kpi}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* micro footer */}
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-gray-900">
                    Explore
                    <ArrowRight
                      className={[
                        "w-4 h-4 transition-transform",
                        isActive ? "translate-x-0.5" : "",
                      ].join(" ")}
                    />
                  </div>
                </button>
              );
            })}
          </div>


        </div>
      </div>
    </section>
  );
};

export default Features;
