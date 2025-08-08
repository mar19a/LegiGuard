import React, { useEffect, useRef, useState } from "react";
import RefreshIcon from "./SVG/RefreshIcon";
import ThumbUpIcon from "./SVG/ThumbUpIcon";
import ThumbDownIcon from "./SVG/ThumbDownIcon";
import ClipboardIcon from "./SVG/ClipboardIcon";
import VolumeIcon from "./SVG/VolumeIcon";
import Level from "./SVG/Level";
import Script from "./SVG/Script";
import Pitch from "./SVG/Pitch";
import CheckCircleIcon from "./SVG/CheckCircleIcon";

const suggestions = [
  "Generate GDPR policy",
  "List SOC 2 controls",
  "Find missing controls",
  "Summarize the AI Act",
];

const suggestionResponses = {
  "Generate GDPR policy": `Sure. Based on SafeStack AI’s data handling practices, here’s a GDPR-compliant privacy policy template including data retention, consent, and user access clauses.`,
  "List SOC 2 controls": `SafeStack AI is currently aligned with 18 out of 23 SOC 2 controls. These include Access Control, System Operations, and Change Management.`,
  "Find missing controls": `Analyzing audit logs... 3 controls are incomplete in SafeStack AI’s stack: (1) Vendor Due Diligence, (2) Disaster Recovery Testing, and (3) Data Classification.`,
  "Summarize the AI Act": `The EU AI Act categorizes AI systems by risk. SafeStack AI’s model falls under "limited risk" but may need transparency disclosures under Article 52.`,
};

const AiCoach = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "I’m Legi, your AI risk advisor. Ask me anything about controls, policies, or audit readiness.",
      sender: "bot",
    },
  ]);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [botTyping, setBotTyping] = useState(false);
  const listRef = useRef(null);

  // --- helpers ---
  const handleSend = (text) => {
    if (!text?.trim()) return;
    const userMsg = { text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setBotTyping(true);

    setTimeout(() => {
      const predefined = suggestionResponses[text];
      const botReply = {
        text: predefined
          ? predefined
          : `It looks like you're ready to take control of your risk and compliance workflows.\n\nClick here to sign up and start automating audits, generating policies, and scaling your business with confidence.`,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botReply]);
      setBotTyping(false);
    }, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend(input);
    setInput("");
  };

  const handleClearChat = () => {
    setMessages([
      {
        text: "I’m Legi, your AI risk advisor. Ask me anything about controls, policies, or audit readiness.",
        sender: "bot",
      },
    ]);
  };

  const handleCopyChat = async () => {
    const allText = messages
      .map((msg) => `${msg.sender.toUpperCase()}: ${msg.text}`)
      .join("\n\n");
    try {
      await navigator.clipboard.writeText(allText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      // ignore
    }
  };

  const handleLike = () => {
    setLiked(true);
    setTimeout(() => setLiked(false), 1200);
  };

  const handleDislike = () => {
    setDisliked(true);
    setTimeout(() => setDisliked(false), 1200);
  };

  const handleSpeak = () => {
    setSpeaking(true);
    setTimeout(() => setSpeaking(false), 1000);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    handleClearChat();
    setTimeout(() => setRefreshing(false), 700);
  };

  // auto-scroll to bottom
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, botTyping]);

  return (
    <section className="pt-10 pb-18 bg-gradient-to-r from-emerald-600 to-emerald-300 text-white">
      <div className="myContainer">
        <div className="text-center">
          <p className="text-FoundationYellow font-questrial text-2xl">
            Meet <span className="font-bold">Legi</span>, Your AI Risk Advisor
          </p>
          <h1 className="text-3xl md:text-5xl mt-3 font-questrial">
            Get Instant Answers on Risk, Policies, and Audit Readiness
          </h1>
        </div>

        <div className="mt-10 grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
          {/* Chat Card */}
          <div className="xl:col-span-2">
            <div className="relative rounded-2xl bg-white/90 backdrop-blur shadow-2xl ring-1 ring-black/5 overflow-hidden">
              {/* header / toolbar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50/60">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="text-sm font-semibold text-gray-900">
                    Chat with <span className="text-foundationBlue">Legi</span>
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <button
                    onClick={handleRefresh}
                    title="Reset chat"
                    className={`p-2 rounded-md hover:bg-gray-100 transition ${
                      refreshing ? "animate-spin" : ""
                    }`}
                  >
                    <RefreshIcon />
                  </button>
                  <button
                    onClick={handleLike}
                    title="Like"
                    className={`p-2 rounded-md transition ${
                      liked ? "bg-blue-100" : "hover:bg-gray-100"
                    }`}
                  >
                    <ThumbUpIcon className={liked ? "text-blue-600" : ""} />
                  </button>
                  <button
                    onClick={handleDislike}
                    title="Dislike"
                    className={`p-2 rounded-md transition ${
                      disliked ? "bg-red-100" : "hover:bg-gray-100"
                    }`}
                  >
                    <ThumbDownIcon className={disliked ? "text-red-600" : ""} />
                  </button>
                  <button
                    onClick={handleCopyChat}
                    title={copied ? "Copied" : "Copy chat"}
                    className={`p-2 rounded-md transition ${
                      copied ? "bg-emerald-100" : "hover:bg-gray-100"
                    }`}
                  >
                    <ClipboardIcon />
                  </button>
                  <button
                    onClick={handleSpeak}
                    title="Listen"
                    className={`p-2 rounded-md hover:bg-gray-100 transition ${
                      speaking ? "opacity-70" : ""
                    }`}
                  >
                    <VolumeIcon />
                  </button>
                </div>
              </div>

              {/* messages */}
              <div
                ref={listRef}
                className="max-h-[60vh] min-h-[420px] overflow-y-auto px-4 sm:px-6 py-6 bg-gradient-to-b from-white to-gray-50"
              >
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex items-end gap-3 ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {/* bot avatar */}
                      {msg.sender === "bot" && (
                        <div className="w-9 h-9 rounded-full bg-sky-100 ring-1 ring-gray-200 flex items-center justify-center overflow-hidden">
                          <img
                            src="/images/bot.png"
                            alt="Bot"
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                      )}

                      {/* bubble */}
                      <div
                        className={[
                          "rounded-2xl px-4 py-3 text-sm shadow-sm ring-1",
                          "prose prose-sm max-w-[70%] break-words whitespace-pre-wrap",
                          msg.sender === "user"
                            ? "bg-foundationBlue text-white ring-transparent"
                            : "bg-white text-gray-900 ring-gray-200",
                        ].join(" ")}
                      >
                        {/* linkify "Click here" */}
                        {msg.text.split("Click here").map((part, i, arr) =>
                          i < arr.length - 1 ? (
                            <React.Fragment key={i}>
                              {part}
                              <a
                                href="/signup"
                                className={`${
                                  msg.sender === "user"
                                    ? "underline decoration-white/60 hover:decoration-white"
                                    : "text-blue-600 underline hover:text-blue-800"
                                } ml-1`}
                              >
                                Click here
                              </a>
                            </React.Fragment>
                          ) : (
                            <span key={i}>{part}</span>
                          )
                        )}
                      </div>

                      {/* user avatar */}
                      {msg.sender === "user" && (
                        <div className="w-8 h-8 rounded-full bg-white ring-1 ring-gray-200 overflow-hidden">
                          <img
                            src="/user.png"
                            alt="You"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* typing indicator */}
                  {botTyping && (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-sky-100 ring-1 ring-gray-200 flex items-center justify-center overflow-hidden">
                        <img
                          src="/images/bot.png"
                          alt="Bot"
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                      <div className="bg-white ring-1 ring-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                        <span className="flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.2s]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" />
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]" />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* footer: suggestions + input */}
              <div className="border-t border-gray-200 bg-white/80 backdrop-blur px-4 sm:px-6 py-4">
                {/* Suggestions */}
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(s)}
                      className="rounded-full bg-gray-100 text-gray-800 text-xs px-3 py-1.5 hover:bg-gray-200 transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <form
                  onSubmit={handleSubmit}
                  className="mt-3 flex items-center gap-2"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything you need"
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 bg-white
                              text-gray-900 placeholder-gray-500 caret-emerald-600
                              focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  />

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-foundationBlue text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition"
                  >
                    Send
                    <img src="/SVG/ArrowUp.png" alt="Send" className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right column: snapshot + command center */}
          <div className="xl:col-span-1 space-y-6">
            {/* Readiness Snapshot */}
            <div className="rounded-2xl bg-white backdrop-blur p-6 shadow-xl ring-1 ring-black/5">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Readiness Snapshot
              </h2>

              {/* Meter */}
              <div className="rounded-xl border border-gray-200 p-4 shadow-sm">
                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" /> Audit
                  Readiness Score
                </h3>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
                      style={{ width: "70%" }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">70%</span>
                </div>
              </div>

              {/* Policy Coverage */}
              <div className="mt-4 rounded-xl border border-gray-200 p-4 shadow-sm">
                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  <Level className="w-4 h-4 text-blue-500" /> Policy Coverage
                  Insight
                </h3>
                <p className="mt-2 text-sm text-gray-700">
                  <span className="text-base font-semibold text-gray-900">85%</span>{" "}
                  of required policies are in place for your framework.
                </p>
              </div>
            </div>

            {/* Command Center */}
            <div className="rounded-2xl bg-white backdrop-blur p-6 shadow-xl ring-1 ring-black/5">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Compliance Command Center
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <Script className="w-4 h-4 text-blue-500" /> Generate Policies
                  </h3>
                  <p className="mt-1.5 text-sm text-gray-600">
                    Instantly create audit-ready templates for GDPR, SOC&nbsp;2, ISO&nbsp;27001.
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <Pitch className="w-4 h-4 text-green-500" /> Audit Readiness Check
                  </h3>
                  <p className="mt-1.5 text-sm text-gray-600">
                    Identify missing controls and documentation gaps before an audit.
                  </p>
                </div>
              </div>
            </div>

            {/* Side tool tray (optional): remove if redundant */}
            <div className="hidden xl:flex items-center justify-center gap-3">
              <span className="text-xs text-white/80">Shortcuts:</span>
              <button onClick={handleRefresh} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs">
                Reset
              </button>
              <button onClick={handleCopyChat} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs">
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiCoach;
