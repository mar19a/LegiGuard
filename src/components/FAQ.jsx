import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is LegiGuard and what can it do?",
      answer:
        "LegiGuard is a unified AI platform that automates code reviews, performs database audits, self-deploys CRM systems, and keeps you compliant,without juggling multiple tools. One platform, multiple high-impact workflows.",
    },
    {
      question: "Who is LegiGuard built for?",
      answer:
        "We’re built for engineering teams, AI-native startups, and fast-growing SaaS companies that want faster code reviews, secure and optimized databases, automated CRM deployment, and integrated compliance from day one.",
    },
    {
      question: "How do AI-powered code reviews work?",
      answer:
        "LegiGuard analyzes pull requests and repositories using policy-aware rules and patterns learned from your codebase. It flags bugs, security risks, and schema drifts. Offering context-aware fixes that match your coding standards.",
    },
    {
      question: "What’s included in a database audit?",
      answer:
        "We check schema integrity, performance bottlenecks, security permissions, index health, and potential data leaks. You’ll get a full report with optimization recommendations and compliance evidence for audits.",
    },
    {
      question: "How do I get started?",
      answer:
        "Click 'Get Started with LegiGuard' or schedule a demo. In hours, we’ll connect to your repos, databases, and infrastructure, and activate the modules you need: code reviews, DB audits, CRM deployment, and compliance tracking.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-questrial text-gray-900 mb-16">
          Frequently Asked Questions
        </h2>

        {/* FAQ List */}
        <div className="space-y-10 text-left">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-8">
              <button
                className="flex items-start justify-between w-full text-left cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex flex-col gap-2 pr-4">
                  <span className="text-xl font-semibold text-gray-800">
                    {faq.question}
                  </span>
                  {openIndex === index && (
                    <p className="text-md font-inter text-gray-500 leading-6">
                      {faq.answer}
                    </p>
                  )}
                </div>

                <span className="text-3xl text-gray-500">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Embedded CTA */}
        <div className="mt-16">
          <p className="text-lg text-gray-700 mb-4">Still have questions?</p>
          <a
            href="/contact"
            className="inline-block bg-neutral-900 hover:bg-neutral-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-200"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
