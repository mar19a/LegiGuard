import React from "react";

const JoinNow = () => {
  return (
    <section className="py-20 text-center bg-gradient-to-r [background-image:linear-gradient(90deg,#FF6A3D_0%,#FFD93D_100%)] text-white rounded-3xl mx-auto shadow-lg">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight drop-shadow-sm">
        Ready to Build Smarter, Safer, Faster?
      </h2>
      <p className="text-md md:text-lg mb-12 text-white/90 max-w-2xl mx-auto leading-relaxed">
        Get expert strategies on AI-driven code reviews, database audits, CRM
        automation, and next-gen engineering workflows — straight to your inbox.
      </p>
      <button
        className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-base shadow-md transition transform hover:scale-105 hover:shadow-lg cursor-pointer"
      >
        Join the Newsletter
      </button>
    </section>
  );
};

export default JoinNow;

