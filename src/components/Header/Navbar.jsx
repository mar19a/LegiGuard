import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const NAV_LINKS = [
  { to: "#home", label: "Home" },
  { to: "#features", label: "Features" },
  { to: "#how-it-works", label: "How It Works" },
  { to: "#use-cases", label: "Use Cases" },
  { to: "#pricing", label: "Pricing" },
];

const Navbar = () => {
  const [showToast, setShowToast] = useState(false);
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef(null);

  // Scroll lock when mobile menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      setTimeout(() => closeBtnRef.current?.focus(), 0);
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <header className="sticky top-0 z-50 bg-transparent border-b border-transparent">
      <div className="myContainer">
        <div className="flex h-20 md:h-24 items-center justify-between gap-6">
          {/* Logo + Desktop Nav */}
          <div className="flex items-center gap-6 md:gap-10">
            <Link
              to="/"
              aria-label="LegiGuard Home"
              className="shrink-0 cursor-pointer"
            >
              <img
                src="/images/legiguard.png"
                alt="LegiGuard"
                className="h-14 w-auto md:h-16"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[15px] text-nav font-medium">
              {NAV_LINKS.map(({ to, label }) => (
                <HashLink
                  key={to}
                  smooth
                  to={to}
                  className="relative py-2 transition-colors hover:text-black focus:outline-none cursor-pointer"
                >
                  {label}
                  <span className="pointer-events-none absolute left-0 -bottom-0.5 h-[2px] w-full origin-left scale-x-0 bg-black/80 transition-transform duration-200 group-hover:scale-x-100 peer-focus:scale-x-100" />
                </HashLink>
              ))}
            </nav>
          </div>

          {/* Right: CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleClick}
              className="hidden sm:inline-flex items-center justify-center rounded-full border border-button px-6 md:px-7 py-3 md:py-3.5 text-sm md:text-[15px] font-semibold text-button bg-white/80 backdrop-blur hover:bg-button hover:text-white transition-colors cursor-pointer"
            >
              Get started
            </button>

            {/* Hamburger (mobile only) */}
            <button
              type="button"
              aria-label="Open menu"
              aria-controls="mobile-menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg ring-1 ring-gray-300/70 hover:ring-gray-400 transition bg-white/70 backdrop-blur cursor-pointer"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6h16M4 12h16M10 18h10"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <>
          {/* Backdrop */}
          <button
            aria-label="Close menu backdrop"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm cursor-pointer"
          />
          {/* Drawer */}
          <aside
            id="mobile-menu"
            className="fixed right-0 top-0 z-[70] h-full w-[88%] max-w-sm bg-white shadow-2xl ring-1 ring-black/5 translate-x-0 transition-transform duration-200 md:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <img
                src="/images/legiguard.png"
                alt="LegiGuard"
                className="h-10 w-auto"
              />
              <button
                ref={closeBtnRef}
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg ring-1 ring-gray-200 hover:ring-gray-300 transition bg-white cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <nav className="px-5 py-4">
              <ul className="space-y-2">
                {NAV_LINKS.map(({ to, label }) => (
                  <li key={to}>
                    <HashLink
                      smooth
                      to={to}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-3 text-[15px] text-gray-800 hover:bg-gray-50 cursor-pointer"
                    >
                      {label}
                    </HashLink>
                  </li>
                ))}
              </ul>

              <div className="mt-4 border-t border-gray-100 pt-4">
                <button
                  onClick={() => {
                    setOpen(false);
                    handleClick();
                  }}
                  className="w-full inline-flex items-center justify-center rounded-full border border-button px-5 py-3 text-sm font-semibold text-button bg-white hover:bg-button hover:text-white transition-colors cursor-pointer"
                >
                  Get started
                </button>
              </div>
            </nav>

            <div className="mt-auto px-5 py-5 text-xs text-gray-500">
              © {new Date().getFullYear()} LegiGuard
            </div>
          </aside>
        </>
      )}

      {/* Toast */}
      {showToast && (
        <div
          aria-live="polite"
          className="fixed top-6 left-1/2 -translate-x-1/2 transform rounded-full bg-gray-900 text-white text-sm px-4 py-2 shadow-xl transition-opacity duration-300 z-[80]"
        >
          🚧 Link not ready yet. Still work needs to be done.
        </div>
      )}
    </header>
  );
};

export default Navbar;
