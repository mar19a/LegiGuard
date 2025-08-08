import React, { useMemo, useState } from "react";
import { Check, Sparkles, Shield, Building2 } from "lucide-react";

const TIERS = [
  {
    key: "starter",
    name: "Starter",
    blurb: "For small teams validating the stack.",
    monthly: 49,
    annual: 39,
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
    highlight: true,
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

const Price = ({ amount }) => {
  if (amount == null) return <span className="text-lg text-gray-700">Custom</span>;
  return (
    <div className="flex items-end gap-1">
      <span className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight">
        ${amount}
      </span>
      <span className="text-gray-500 mb-1 text-sm">/mo</span>
    </div>
  );
};

const Pricing = () => {
  const [yearly, setYearly] = useState(true);

  const tiers = useMemo(() => {
    return TIERS.map((t) => {
      const price = yearly ? t.annual ?? t.monthly : t.monthly;
      return { ...t, displayPrice: price };
    });
  }, [yearly]);

  return (
    <section className="bg-white py-24">
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
          <div className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-2 py-2 shadow-sm">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer
                ${yearly ? "text-gray-700" : "bg-gray-900 text-white"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer
                ${yearly ? "bg-gray-900 text-white" : "text-gray-700"}`}
            >
              Annual <span className="ml-1 text-emerald-500">– Save 20%</span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((t) => {
            const FeaturedIcon =
              t.key === "growth" ? Sparkles : t.key === "enterprise" ? Building2 : Shield;
            const isFeatured = t.highlight;

            return (
              <div
                key={t.key}
                className={`relative rounded-2xl border bg-white shadow-lg overflow-hidden`}
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-400/60 via-blue-400/60 to-purple-500/60" />
                {t.badge && (
                  <div className="absolute right-3 top-3 z-10 rounded-full bg-gray-900 text-white text-xs px-3 py-1 shadow">
                    {t.badge}
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${
                        isFeatured ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <FeaturedIcon className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{t.name}</h3>
                      <p className="text-sm text-gray-600">{t.blurb}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Price amount={t.displayPrice} />
                    <div className="mt-1 text-xs text-gray-500">{t.limits}</div>
                  </div>

                  <a
                    href={t.cta.href}
                    className={`mt-5 inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 font-semibold transition
                      ${
                        isFeatured
                          ? "bg-gray-900 text-white hover:bg-gray-800"
                          : "bg-white text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50"
                      }`}
                  >
                    {t.cta.label}
                  </a>
                </div>

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
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Prices shown in USD. Taxes/VAT may apply. You can switch plans or cancel anytime.
        </p>
      </div>
    </section>
  );
};

export default Pricing;

