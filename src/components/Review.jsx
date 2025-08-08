import React, { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Quote } from "lucide-react";

// --- data (unchanged) ---
const testimonials = [
  {
    quote:
      "Before LegiGuard, our compliance efforts felt like a never-ending uphill battle. We were buried in spreadsheets and manual documentation. With their automated compliance system, we cut our SOC 2 audit prep time from 6 weeks to just 5 days.",
    name: "Isabella",
    title: "COO at a SaaS company",
  },
  {
    quote:
      "LegiGuard completely transformed our risk management workflow. Their team didn’t just plug in a solution. They studied our infrastructure, understood our challenges, and built a compliance engine tailored to our needs. We now close enterprise deals faster because security reviews are no longer a bottleneck.",
    name: "Daniel",
    title: "CEO at a tech company",
  },
  {
    quote:
      "As an AI company, compliance and model governance were critical for trust and scale. LegiGuard helped us define robust policies and translate them into code-level enforcement—all while staying agile. Their approach to policy-aware workflows has become a strategic asset for our GTM motion.",
    name: "Ava",
    title: "CTO at an AI startup",
  },
  {
    quote:
      "Launching in the fintech space comes with intense scrutiny. LegiGuard gave us the compliance backbone we needed to scale with confidence. We automated policy updates, reduced onboarding friction for enterprise clients, and passed our ISO 27001 audit with zero major findings.",
    name: "Liam",
    title: "Product Lead at a fintech company",
  },
  {
    quote:
      "I’ve worked with a dozen compliance vendors over the years, and LegiGuard is in a league of its own. Their AI-powered audit layer gave us full visibility and control, while their team guided us like true partners. We felt ready on day one of our audit—and we continue to use them.",
    name: "Sophia",
    title: "Founder at a health company",
  },
  {
    quote:
      "Security used to slow us down, until we integrated LegiGuard. Real-time alerts, documentation automation, and hands-on guidance turned compliance from a blocker into a competitive advantage. We went from chasing checklists to proactively owning our posture.",
    name: "Ethan",
    title: "Co-Founder at a compliance firm",
  },
];

// --- helpers ---
const getIndustryFromTitle = (title = "") => {
  const t = title.toLowerCase();
  if (t.includes("saas")) return "SaaS";
  if (t.includes("tech")) return "Tech";
  if (t.includes("ai")) return "AI";
  if (t.includes("fintech")) return "Fintech";
  if (t.includes("health")) return "Healthcare";
  if (t.includes("compliance")) return "Compliance";
  return "Enterprise";
};

const Avatar = ({ name }) => (
  <img
    src={`/${name?.toLowerCase?.()}.png`}
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = "/user.png";
    }}
    alt={name}
    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow"
  />
);

const QuoteText = ({ text, clamp = 4 }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`${expanded ? "" : `line-clamp-${clamp}`} text-gray-900`}>
        “{text}”
      </p>
    </div>
  );
};

// --- Featured Carousel (auto-rotating, minimal + premium) ---
const FeaturedSpotlight = ({ items }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 6000);
    return () => clearInterval(id);
  }, [items.length, paused]);

  const t = items[index];
  const industry = getIndustryFromTitle(t.title);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-live="polite"
    >
      {/* subtle top gradient keyline */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400" />

      <div className="p-6 md:p-8">
        {/* Top row: avatar + role (no name here), industry on right as caption */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar name={t.name} />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 ring-1 ring-emerald-200 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">{t.title}</p>
            </div>
          </div>

          <div className="shrink-0 text-[11px] text-gray-500 tracking-wide uppercase">
            {industry}
          </div>
        </div>

        {/* Pull-quote */}
        <div className="mt-5 relative">
          <Quote className="absolute -left-1 -top-1 w-6 h-6 text-gray-200" aria-hidden />
          <div className="pl-7">
            <p className="text-xl md:text-[1.35rem] leading-relaxed text-gray-900">
              “{t.quote}”
            </p>
            <div className="mt-4 text-[13px] text-gray-600">
              — {t.name}, <span className="text-gray-500">{t.title}</span>
            </div>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {items.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-gray-900" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Review = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // in-view reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // for staggered fade-in on grid cards
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!visible) return;
    const id = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(id);
  }, [visible]);

  const spotlightItems = useMemo(() => testimonials.slice(0, 3), []);
  const wallItems = useMemo(() => testimonials.slice(0), []);

  return (
    <section className="bg-white py-24" ref={sectionRef} id="reviews">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div
          className={`text-center max-w-3xl mx-auto transform transition-all duration-[900ms] ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: "60ms" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            What teams say about LegiGuard
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Proof it works. Across SaaS, Fintech, AI, Healthcare, and more.
          </p>
        </div>

        {/* Featured spotlight */}
        <div className="mt-12">
          <FeaturedSpotlight items={spotlightItems} />
        </div>

        {/* Testimonial wall */}
        <div className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {wallItems.map((t, i) => {
            const industry = getIndustryFromTitle(t.title);
            return (
              <div
                key={i}
                className={`break-inside-avoid mb-6 transform transition-all duration-700 ease-out ${
                  mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${120 + i * 70}ms` }}
              >
                <article className="relative rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition">
                  {/* subtle hover keyline */}
                  <span className="pointer-events-none absolute -inset-px rounded-xl opacity-0 hover:opacity-100 transition shadow-[0_0_0_1px_rgba(0,0,0,0.06)] bg-[linear-gradient(to_right,rgba(16,185,129,0.12),rgba(59,130,246,0.12),rgba(147,51,234,0.12))]" />

                  <div className="relative p-6">
                    {/* header: avatar + role (no name), industry as caption on right */}
                    <header className="flex items-center gap-3">
                      <Avatar name={t.name} />
                      <div className="min-w-0">
                        <div className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 ring-1 ring-emerald-200 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Verified
                        </div>
                        <p className="mt-1 text-sm text-gray-600 truncate">
                          {t.title}
                        </p>
                      </div>
                      <div className="ml-auto shrink-0 text-[11px] text-gray-500 tracking-wide uppercase">
                        {industry}
                      </div>
                    </header>

                    {/* quote */}
                    <div className="mt-4 text-sm leading-relaxed">
                      <QuoteText text={t.quote} clamp={5} />
                      <div className="mt-3 text-[12px] text-gray-600">
                        — {t.name},{" "}
                        <span className="text-gray-500">{t.title}</span>
                      </div>
                    </div>

                    {/* hairline divider for structure (no pills/badges) */}
                    <div className="mt-5 h-px bg-gray-100" aria-hidden />
                    <footer className="mt-3 text-[11px] text-gray-500">
                      Independently collected feedback
                    </footer>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        {/* Microtrust row */}
        <div className="mt-10 text-center text-xs text-gray-500">
          Names anonymized for privacy • Used by security-first teams
        </div>
      </div>
    </section>
  );
};

export default Review;
