import React from "react";

const JoinNow = () => {
  return (
    <section className="py-20 text-center bg-gradient-to-r [background-image:linear-gradient(90deg,#0D2438_0%,#004FCE_100%)] text-white rounded-3xl mx-auto">
      <h2 className="text-4xl font-semibold mb-3">
        Ready to Build Smarter, Safer, Faster?
      </h2>
      <p className="text-md mb-12 text-subTitle2 max-w-2xl mx-auto">
        Get expert strategies on AI-driven code reviews, database audits, CRM
        automation, and compliance. Straight to your inbox.
      </p>
      <button className="bg-FoundationYellow hover:bg-yellow-500 text-foundationBlue px-8 py-4 rounded-full font-medium transition">
        Join the Newsletter
      </button>
    </section>
  );
};

export default JoinNow;
