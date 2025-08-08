import React, { useState } from "react";
import { motion } from "framer-motion";
import outlookLogo from "/integrations/outlook.png";
import slackLogo from "/integrations/slack.png";
import teamsLogo from "/integrations/teams.png";
import driveLogo from "/integrations/drive.png";
import dropboxLogo from "/integrations/dropbox.png";
import "./Integrations.css"; // spinSlow/spinSlower keyframes, etc.

const apps = [
  {
    name: "Outlook",
    icon: outlookLogo,
    pos: { top: "-10%", left: "47%" },
    link: "/integrations/outlook",
  },
  {
    name: "Slack",
    icon: slackLogo,
    pos: { top: "15%", left: "75%" },
    link: "/integrations/slack",
  },
  {
    name: "Teams",
    icon: teamsLogo,
    pos: { top: "62%", left: "70%" },
    link: "/integrations/teams",
  },
  {
    name: "Google Drive",
    icon: driveLogo,
    pos: { top: "65%", left: "35%" },
    link: "/integrations/drive",
  },
  {
    name: "Dropbox",
    icon: dropboxLogo,
    pos: { top: "25%", left: "15%" },
    link: "/integrations/dropbox",
  },
];


const Integrations = () => {
  const [active, setActive] = useState(null);

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* soft grid bg */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.15]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.05)_1px,_transparent_1px)] bg-[length:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Works With Your Favorite Tools
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Plug Legi into Outlook, Slack, Drive, and more! Keep your workflow, gain AI oversight.
        </p>

        {/* Hub */}
        <div className="relative mt-20 flex justify-center">
          {/* glow */}
          <div className="absolute w-[28rem] h-[28rem] rounded-full bg-gradient-to-r from-emerald-400/30 via-blue-500/20 to-purple-500/30 blur-3xl" />

          {/* orbits */}
          <div className="relative z-0 w-[28rem] h-[28rem] group/orbits">
            <div className="absolute inset-0 rounded-full border border-dashed border-gray-200 animate-spin-slower group-hover/orbits:animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-6 rounded-full border border-dashed border-gray-200 animate-spin-slow reverse opacity-80 group-hover/orbits:animate-[spin_14s_linear_infinite_reverse]" />
            <div className="absolute inset-12 rounded-full border border-dashed border-gray-200 opacity-60" />
          </div>

          {/* center core */}
          <div className="absolute z-10 flex items-center justify-center w-40 h-40 rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200 translate-y-[60%] transition-shadow">
            <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600">
              Legi&nbsp;AI
            </div>

            {/* active label */}
            <div
              className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-700 bg-white/85 backdrop-blur px-2 py-0.5 rounded-full ring-1 ring-gray-200 shadow-sm transition-opacity ${
                active !== null ? "opacity-100" : "opacity-0"
              }`}
            >
              {active !== null ? apps[active].name : ""}
            </div>

            {/* halo */}
            <div
              className={`pointer-events-none absolute inset-0 rounded-2xl transition ${
                active !== null ? "shadow-[0_20px_60px_rgba(16,185,129,0.25)]" : ""
              }`}
            />
          </div>

          {/* floating apps */}
          {apps.map((app, i) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.08 * i, duration: 0.45, ease: "easeOut" }}
              className="absolute z-20"
              style={app.pos}
            >
            <a
              href={app.link}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="block"
            >
              <motion.div
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.98 }}
                whileFocus={{ scale: 1.04 }}
                className="group relative w-20 h-20 rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 flex items-center justify-center cursor-pointer outline-none focus:ring-2 focus:ring-emerald-300"
                title={app.name}
              >
                {/* sheen */}
                <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                  <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />
                </span>

                <img
                  src={app.icon}
                  alt={app.name}
                  loading="lazy"
                  decoding="async"
                  className="w-10 h-10 object-contain"
                />

                {/* label */}
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-gray-600 bg-white/80 backdrop-blur px-2 py-0.5 rounded-full ring-1 ring-gray-200 shadow-sm">
                  {app.name}
                </span>

                {/* hover ring */}
                <span className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-transparent group-hover:ring-2 group-hover:ring-emerald-300/40 transition" />
              </motion.div>
            </a>



            </motion.div>
          ))}
        </div>

        {/* badges row */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
          {["Secure APIs", "SSO", "Webhooks", "Granular Scopes", "SCIM"].map((b) => (
            <span
              key={b}
              className="text-xs md:text-sm text-gray-700 bg-white shadow-sm ring-1 ring-gray-200 rounded-full px-3 py-1"
            >
              {b}
            </span>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <a
            href="/integrations"
            className="text-sm px-4 py-2 rounded-md bg-black text-white hover:opacity-90"
          >
            Browse integrations
          </a>
          <a
            href="/contact?type=integration"
            className="text-sm px-4 py-2 rounded-md bg-white ring-1 ring-gray-300 hover:bg-gray-50"
          >
            Request an integration
          </a>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
