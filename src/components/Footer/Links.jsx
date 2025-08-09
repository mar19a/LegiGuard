import React from "react";

const Links = () => {
  return (
    <footer className="mt-0 bg-transparent">
      {/* Top section */}
      <div className="myContainer">
        <div className="pt-16 pb-10 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand column */}
          <div className="md:col-span-5">
            <img
              src="/images/legiguard.png"
              alt="LegiGuard"
              className="h-24 w-auto"
            />
            <p className="mt-6 text-base leading-7 text-foundationBlue400">
              LegiGuard delivers AI-powered solutions for automated compliance,
              audit readiness, and operational insight—helping teams reduce manual
              effort and scale with confidence.
            </p>

            {/* Social + Email */}
            <div className="mt-6 flex gap-3">
              {[
                { href: "https://facebook.com", icon: "facebook", label: "Facebook" },
                { href: "https://twitter.com", icon: "twitter", label: "Twitter" },
                { href: "https://linkedin.com", icon: "linkedin", label: "LinkedIn" },
                { href: "https://instagram.com", icon: "instagram", label: "Instagram" },
                { href: "mailto:contact@legiguard.com", icon: "email", label: "Email" },
              ].map(({ href, icon, label }) => (
                <a
                  key={icon}
                  href={href}
                  target={icon !== "email" ? "_blank" : undefined}
                  rel={icon !== "email" ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200 hover:ring-gray-300 transition"
                >
                  <img src={`/SVG/${icon}.svg`} alt={label} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column: Product */}
          <div className="md:col-span-2">
            <h4 className="text-foundationBlue text-sm font-semibold uppercase tracking-wider">
              Product
            </h4>
            <ul className="mt-5 space-y-3 text-foundationBlue400">
              <li><a href="/features" className="hover:text-foundationBlue transition">Features</a></li>
              <li><a href="/pricing" className="hover:text-foundationBlue transition">Pricing</a></li>
              <li><a href="/integrations" className="hover:text-foundationBlue transition">Integrations</a></li>
              <li><a href="/frameworks" className="hover:text-foundationBlue transition">Frameworks</a></li>
            </ul>
          </div>

          {/* Column: Company */}
          <div className="md:col-span-2">
            <h4 className="text-foundationBlue text-sm font-semibold uppercase tracking-wider">
              Company
            </h4>
            <ul className="mt-5 space-y-3 text-foundationBlue400">
              <li><a href="/about" className="hover:text-foundationBlue transition">About</a></li>
              <li><a href="/customers" className="hover:text-foundationBlue transition">Customers</a></li>
              <li><a href="/careers" className="hover:text-foundationBlue transition">Careers</a></li>
              <li><a href="/contact" className="hover:text-foundationBlue transition">Contact</a></li>
            </ul>
          </div>

          {/* Column: Resources */}
          <div className="md:col-span-3">
            <h4 className="text-foundationBlue text-sm font-semibold uppercase tracking-wider">
              Resources
            </h4>
            <ul className="mt-5 space-y-3 text-foundationBlue400">
              <li><a href="/blog" className="hover:text-foundationBlue transition">Blog</a></li>
              <li><a href="/docs" className="hover:text-foundationBlue transition">API Documentation</a></li>
              <li><a href="/help" className="hover:text-foundationBlue transition">Help Center</a></li>
              <li><a href="/guides" className="hover:text-foundationBlue transition">Compliance Guides</a></li>
              <li><a href="/status" className="hover:text-foundationBlue transition">Status</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Bottom bar */}
      <div className="myContainer">
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foundationBlue400">
            © {new Date().getFullYear()} LegiGuard. All rights reserved.
          </p>
          <nav className="flex items-center gap-5 text-xs text-foundationBlue400">
            <a href="/privacy" className="hover:text-foundationBlue transition">Privacy Policy</a>
            <span className="text-gray-300">•</span>
            <a href="/terms" className="hover:text-foundationBlue transition">Terms</a>
            <span className="text-gray-300">•</span>
            <a href="/security" className="hover:text-foundationBlue transition">Security</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Links;
