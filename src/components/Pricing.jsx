import React, { useMemo, useState } from "react";
import { Check, Sparkles, Shield, Building2 } from "lucide-react";

const TIERS = [
  {
    key: "starter",
    name: "Starter",
    blurb: "For small teams validating the stack.",
    monthly: 49,
    annual: 39, // per month, billed yearly
    highlight: false,
    cta: { label: "Start Free Trial", href: "/signup" },
    features: [
      "AI code review on PRs (light)",
      "DB baseline audit (1 database)",
      "Self-deploying CRM (starter templates)",
      "Basic policy mapping",
      "Email support",
    ],
    limits: "Up to 5 seats · 3 repos",
  },
  {
    key: "growth",
    name: "Growth",
    blurb: "For scaling teams that ship fast.",
    monthly: 149,
    annual: 119,
    highlight: true, // featured
    badge: "Most Popular",
    cta: { label: "Choose Growth", href: "/signup?plan=growth" },
    features: [
      "AI code review (security + performance)",
      "Continuous DB audits (3 databases)",
      "Self-deploying CRM (custom blueprints)",
      "Policy-aware guardrails in CI",
      "Slack/Jira/Linear integration",
      "Priority support",
    ],
    limits: "Up to 25 seats · 20 repos",
  },
  {
    key: "enterprise",
    name: "Enterprise",
    blurb: "For security-first organizations.",
    monthly: null,
    annual: null,
    highlight: false,
    badge: "Custom",
    cta: { label: "Talk to Sales", href: "/contact" },
    features: [
      "Private/VPC or on-prem inference",
      "Unlimited repos & databases",
      "Advanced RBAC & SSO/SAML",
      "Custom policy packs & SLAs",
      "Dedicated solutions architect",
      "Security & legal review support",
    ],
    limits: "Unlimited seats",
  },
];

const Price = ({ amount, yearly }) => {
  if (amount == null) return <span className="text-lg text-gray-700">Custom</span>;
  return (
    <div className="flex items-end gap-1">
      <span className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight">
        ${yearly ? amount : amount}
      </span>
      <span className="text-gray-500 mb-1 text-sm">/mo</span>
    </div>
  );
};

const Pricing = () => {
  const [yearly, setYearly] = useState(true);

  // map prices based on toggle (yearly uses `annual`, monthly uses `monthly`)
  const tiers = useMemo(() => {
    return TIERS.map((t) => {
      const price = yearly ? t.annual ?? t.monthly : t.monthly;
      return { ...t, displayPrice: price };
    });
  }, [yearly]);

  return (
    <section id="pricing" className="bg-white py-28">
      {/* Prestige backdrop (contained) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FBFDFF] to-white" />
        <div className="absolute left-1/2 -top-24 -translate-x-1/2 w-[70vw] max-w-[1100px] h-[60vw] max-h-[900px] rounded-full blur-3xl opacity-30 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.28),rgba(59,130,246,0.20),transparent_70%)]" />
        <div className="absolute left-1/2 -bottom-40 -translate-x-1/2 w-[80vw] max-w-[1200px] h-[70vw] max-h-[1000px] rounded-full blur-[100px] opacity-25 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.25),rgba(59,130,246,0.18),transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-questrial text-gray-900 tracking-tight">
            Pricing that scales with you
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            One control plane for AI code reviews, database audits, and self-deploying CRMs.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="mt-8 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/70 backdrop-blur px-2 py-2 shadow-sm">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                yearly ? "text-gray-600" : "bg-gray-900 text-white"
              }`}
              aria-pressed={!yearly}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                yearly ? "bg-gray-900 text-white" : "text-gray-600"
              }`}
              aria-pressed={yearly}
            >
              Annual <span className="ml-1 text-emerald-400">– Save 20%</span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((t) => {
            const FeaturedIcon = t.key === "growth" ? Sparkles : t.key === "enterprise" ? Building2 : Shield;
            const isFeatured = t.highlight;

            return (
              <div
                key={t.key}
                className={`relative rounded-2xl border bg-white shadow-[0_10px_40px_rgba(2,6,23,0.08)] overflow-hidden
                  ${isFeatured ? "border-gray-200" : "border-gray-200/90"}`}
              >
                {/* top keyline */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-400/60 via-blue-400/60 to-purple-500/60" />

                {/* badge */}
                {t.badge && (
                  <div className="absolute right-3 top-3 z-10 rounded-full bg-gray-900 text-white text-xs px-3 py-1 shadow">
                    {t.badge}
                  </div>
                )}

                {/* header */}
                <div className={`p-6 ${isFeatured ? "bg-white/60 backdrop-blur" : ""}`}>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${isFeatured ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
                      <FeaturedIcon className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{t.name}</h3>
                      <p className="text-sm text-gray-600">{t.blurb}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Price amount={t.displayPrice} yearly={yearly} />
                    <div className="mt-1 text-xs text-gray-500">{t.limits}</div>
                  </div>

                  <a
                    href={t.cta.href}
                    className={`mt-5 inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 font-semibold transition
                      ${isFeatured ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-white text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50"}`}
                  >
                    {t.cta.label}
                  </a>
                </div>

                {/* features */}
                <div className="p-6 pt-0">
                  <ul className="mt-4 space-y-2.5">
                    {t.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                        <span className="text-sm text-gray-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* footer */}
                {t.key === "enterprise" && (
                  <div className="px-6 pb-6 pt-2 text-xs text-gray-500">
                    Includes migration assistance, security review support, and tailored onboarding.
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Comparison strip */}
        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-semibold text-gray-900">AI Code Reviews</div>
              <div className="text-gray-600 mt-1">Security + performance checks, policy-aware guardrails, repo conventions.</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">Database Audits</div>
              <div className="text-gray-600 mt-1">Schema drift, query hotspots, access diffs, exportable evidence.</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">Self-Deploying CRM</div>
              <div className="text-gray-600 mt-1">Entities, pipelines, automations from a spec—ready in minutes.</div>
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="mt-6 text-center text-xs text-gray-500">
          Prices shown in USD. Taxes/VAT may apply. You can switch plans or cancel anytime.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
