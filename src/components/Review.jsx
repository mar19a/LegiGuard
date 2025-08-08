import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2, Quote } from "lucide-react";

// --- data (updated focus) ---
const testimonials = [
  { quote: "Before LegiGuard, our code reviews were a bottleneck. Now, AI-assisted reviews catch issues early, suggest optimizations, and keep the codebase clean. We cut review time by 60% and shipped faster.", name: "Isabella", title: "COO at a SaaS company" },
  { quote: "LegiGuard transformed our database audits. We get instant reports on schema drift, query hotspots, and access risks. It turned a weekly chore into a 10-minute check.", name: "Daniel", title: "CEO at a tech company" },
  { quote: "As an AI startup, speed is everything. LegiGuard’s self-deploying CRM built our full sales pipeline in under an hour—integrations, workflows, the lot. We started closing the same day.", name: "Ava", title: "CTO at an AI startup" },
  { quote: "Automated DB health checks and query optimization gave us the performance headroom to onboard enterprise clients with zero downtime.", name: "Liam", title: "Product Lead at a fintech company" },
  { quote: "We caught a critical performance bug in review that would’ve cost thousands in infra. That single save paid for the product.", name: "Sophia", title: "Founder at a health company" },
  { quote: "Spinning new sales teams used to take days. Now the CRM stands itself up—contacts, pipelines, automations—in minutes.", name: "Ethan", title: "Co-Founder at a software firm" },
];

// --- helpers ---
const Avatar = ({ name }) => (
  <img
    src={`/${name?.toLowerCase?.()}.png`}
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = "/user.png";
    }}
    alt={name}
    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover ring-2 ring-white shadow"
  />
);

const Review = () => {
  const trackRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const scrollDebounceRef = useRef(null);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const len = testimonials.length;

  // Programmatic center scroll
  const scrollToIndex = (idx, behavior = "smooth") => {
    const track = trackRef.current;
    if (!track) return;
    const el = track.querySelector(`[data-index="${idx}"]`);
    if (!el) return;

    const left = el.offsetLeft - (track.clientWidth - el.clientWidth) / 2;
    isAnimatingRef.current = true;
    track.scrollTo({ left, behavior });

    window.clearTimeout(scrollDebounceRef.current);
    scrollDebounceRef.current = window.setTimeout(() => {
      isAnimatingRef.current = false;
    }, behavior === "smooth" ? 420 : 0);
  };

  // Autoplay (pause on hover/touch)
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % len;
        scrollToIndex(next);
        return next;
      });
    }, 6000);
    return () => clearInterval(id);
  }, [paused, len]);

  const goTo = (idx) => {
    setActive(idx);
    scrollToIndex(idx);
  };
  const next = () =>
    setActive((prev) => {
      const n = (prev + 1) % len;
      scrollToIndex(n);
      return n;
    });
  const prev = () =>
    setActive((prev) => {
      const n = (prev - 1 + len) % len;
      scrollToIndex(n);
      return n;
    });

  // Debounced manual scroll -> update dots ONLY
  const handleScroll = () => {
    if (isAnimatingRef.current) return;
    const track = trackRef.current;
    if (!track) return;

    window.clearTimeout(scrollDebounceRef.current);
    scrollDebounceRef.current = window.setTimeout(() => {
      const cards = Array.from(track.children);
      const center = track.scrollLeft + track.clientWidth / 2;

      let best = 0;
      let bestDist = Infinity;
      cards.forEach((c, i) => {
        const cardCenter = c.offsetLeft + c.clientWidth / 2;
        const d = Math.abs(cardCenter - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });

      setActive(best);
    }, 80);
  };

  return (
    <section
      id="reviews"
      className="relative isolate overflow-hidden py-28"  // <-- contain visuals; prevent page shift
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setTimeout(() => setPaused(false), 800)}
    >
      {/* DISTINCT, PRESTIGE BACKDROP (contained; no layout push) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Porcelain base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFEFB] via-white to-[#FBFCFF]" />
        {/* Aurora accents (transform offsets, not negative positioning) */}
        <div className="absolute left-1/2 top-[-18%] -translate-x-[60%] w-[55vw] max-w-[900px] aspect-square rounded-full blur-3xl opacity-30 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.35),rgba(59,130,246,0.25),transparent_70%)]" />
        <div className="absolute left-1/2 bottom-[-22%] translate-x-[42%] w-[60vw] max-w-[1000px] aspect-square rounded-full blur-[90px] opacity-30 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.30),rgba(59,130,246,0.18),transparent_70%)]" />
        {/* Vertical sheen */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-black/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-questrial text-gray-900 tracking-tight">
            What teams say about LegiGuard
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Real outcomes with AI code reviews, database audits, and self-deploying CRMs.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mt-12">
          {/* arrows */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full bg-white text-gray-900 shadow ring-1 ring-gray-200 hover:bg-gray-50 transition cursor-pointer"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full bg-white text-gray-900 shadow ring-1 ring-gray-200 hover:bg-gray-50 transition cursor-pointer"
          >
            ›
          </button>

          {/* track */}
          <style>{`.hide-scroll::-webkit-scrollbar{display:none}`}</style>
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="hide-scroll flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory scroll-px-6 pb-2 [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {testimonials.map((t, i) => {
              const isActive = i === active;
              return (
                <article
                  key={i}
                  data-index={i}
                  className={`snap-center shrink-0 w-[70%] sm:w-[54%] md:w-[42%] xl:w-[30%] transition-transform duration-300 ${
                    isActive ? "scale-[1.01]" : "scale-100"
                  }`}
                  style={{ scrollSnapStop: "always" }}
                >
                  <div
                    className={`group relative overflow-hidden rounded-2xl bg-white border shadow-sm transition-shadow duration-300
                    ${isActive ? "border-gray-200 shadow-[0_16px_44px_rgba(2,6,23,0.10)]" : "border-gray-200/90 shadow-[0_10px_32px_rgba(2,6,23,0.06)]"}`}
                  >
                    {/* gradient keyline */}
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-400/60 via-blue-400/60 to-purple-500/60" />
                    {/* hover glow ring */}
                    <span className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[linear-gradient(to_right,rgba(16,185,129,0.12),rgba(59,130,246,0.12),rgba(147,51,234,0.12))]" />
                    <div className="relative p-5 md:p-6">
                      <div className="flex items-center gap-3">
                        <Avatar name={t.name} />
                        <div className="min-w-0">
                          <div className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 ring-1 ring-emerald-200 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified
                          </div>
                          <p className="mt-1 text-sm text-gray-600 truncate">{t.title}</p>
                        </div>
                      </div>

                      <div className="mt-4 relative">
                        <Quote className="absolute -left-1 -top-1 w-5 h-5 text-gray-200" aria-hidden />
                        <p className="pl-6 text-[17px] md:text-[18px] leading-relaxed text-gray-900">
                          “{t.quote}”
                        </p>
                        <div className="mt-3 pl-6 text-[12px] text-gray-600">
                          — {t.name}, <span className="text-gray-500">{t.title}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-1.5">
            {testimonials.map((_, i) => (
              <span
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  i === active ? "w-6 bg-gray-900" : "w-2 bg-gray-400/60"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Microtrust row */}
        <div className="mt-12 text-center text-xs text-gray-500">
          Names anonymized for privacy • Used by security-first teams
        </div>
      </div>
    </section>
  );
};

export default Review;
