"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

// ── Command map ────────────────────────────────────────────────────
const COMMANDS = {
  "help": `How can I help you? Choose from the following options:\n\n• list customers\n• add customer\n• show invoices\n• generate invoice\n• hello\n• status`,
  "hello": "Hello! I'm Orbit-CRM Assistant 🤖, your CRM assistant. Type **help** to see what I can do.",
  "hi": "Hey there! 👋 Type **help** for more information.",
  "status": "CRM System is running normally and all services are operational.",
  "list customers":    "__SHOW_CUSTOMERS__",
  "add customer":      "__NAVIGATE_ADD__",
  "generate invoice":  "__NAVIGATE_INVOICE__",      // opens Generate Invoice modal
  "invoice":           "__NAVIGATE_INVOICE__",      // alias
  "show invoices":     "__NAVIGATE_SAVED_INVOICE__", // opens Invoices list page
  "saved invoice":     "__NAVIGATE_SAVED_INVOICE__", // alias
};

// ── Icons ──────────────────────────────────────────────────────────

const SendIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const BotIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M12 11V5"/>
    <circle cx="12" cy="4" r="1"/>
    <line x1="8" y1="16" x2="8" y2="16" strokeWidth="2.5"/>
    <line x1="16" y1="16" x2="16" y2="16" strokeWidth="2.5"/>
    <path d="M8 20h8"/>
  </svg>
);

// ── Centralised command resolver ───────────────────────────────────
// Single source of truth — used by both sendMessage() and handleQuickCommand()
// so the logic is never duplicated or inconsistent between the two.
function resolveCommand(trimmed, customers, router) {
  const cmd = COMMANDS[trimmed];

  if (cmd === "__SHOW_CUSTOMERS__") {
    return customers.length > 0
      ? `All Customers (${customers.length}):\n${customers.map((c, i) => `${i + 1}. ${c.name} — ${c.status}`).join("\n")}`
      : "No customers found. Add some first!";
  }

  if (cmd === "__NAVIGATE_ADD__") {
    setTimeout(() => router.push("/dashboard/add-customer"), 800);
    return "Navigating to Add Customer...";
  }

  if (cmd === "__NAVIGATE_INVOICE__") {
    // Navigate to invoices page with ?generate=true so the modal auto-opens
    setTimeout(() => router.push("/dashboard/invoices?generate=true"), 800);
    return "Navigating to Generate Invoice...";
  }

  if (cmd === "__NAVIGATE_SAVED_INVOICE__") {
    // Navigate to plain invoices page — no modal, just the list
    setTimeout(() => router.push("/dashboard/invoices"), 800);
    return "Navigating to Invoices...";
  }

  if (cmd) {
    // Plain text responses: help, hello, hi, status
    return cmd;
  }

  return "I don't understand that command. Type **help** for available commands.";
}

// ── Main Chatbot component ─────────────────────────────────────────
export default function Chatbot({ customers = [] }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm Orbit-CRM Assistant 🤖. Type **help** to get started." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const router = useRouter();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to the latest message whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  // ── Shared send logic (used by text input AND quick chips) ────────
  const processInput = (rawText) => {
    const trimmed = rawText.trim().toLowerCase();
    if (!trimmed) return;

    // Add user message immediately
    setMessages((prev) => [...prev, { from: "user", text: rawText.trim() }]);
    setInput("");
    setIsTyping(true);

    // Resolve reply after short delay for natural feel
    setTimeout(() => {
      const reply = resolveCommand(trimmed, customers, router);
      setIsTyping(false);
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    }, 420);
  };

  const sendMessage = () => processInput(input);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ── Quick-command chips ────────────────────────────────────────
  // Updated: "show invoices" and "generate invoice" are now separate chips
  const quickCommands = ["help", "list customers", "add customer", "show invoices", "generate invoice", "status"];

  const handleQuickCommand = (cmd) => processInput(cmd);

  // ── Render ─────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes chatPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(245,158,11,0); }
          50%       { transform: scale(1.06); box-shadow: 0 0 0 8px rgba(245,158,11,0.12); }
        }
        @keyframes typingBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%           { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes msgFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .chat-msg { animation: msgFadeIn 0.22s ease both; }
        .chat-toggle-idle { animation: chatPulse 3s ease-in-out infinite; }
        .typing-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--clr-primary);
          animation: typingBounce 1.2s ease-in-out infinite;
          display: inline-block;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        .quick-chip {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.08);
          color: var(--clr-text-muted);
          padding: 4px 11px;
          border-radius: 999px;
          font-size: 11.5px;
          font-weight: 600;
          font-family: var(--font-body);
          cursor: pointer;
          transition: all 0.15s ease;
          white-space: nowrap;
        }
        .quick-chip:hover {
          border-color: rgba(245,158,11,0.45);
          color: var(--clr-primary-light);
          background: rgba(245,158,11,0.07);
        }
        .chat-input-send {
          width: 36px; height: 36px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all 0.18s ease;
          background: linear-gradient(135deg, #D97706 0%, #F59E0B 55%, #FCD34D 100%);
          color: #0A0A0A;
        }
        .chat-input-send:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(245,158,11,0.35);
        }
        .chat-input-send:active { transform: translateY(0); }
        .chat-scroll::-webkit-scrollbar { width: 3px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(245,158,11,0.2); border-radius: 99px; }
      `}</style>

      <div style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 1000,
        fontFamily: "var(--font-body)", display: "flex",
        flexDirection: "column", alignItems: "flex-end", gap: 10,
      }}>

        {/* ── Chat window ─────────────────────────────────────── */}
        {open && (
          <div style={{
            width: 336, height: 490,
            display: "flex", flexDirection: "column", overflow: "hidden",
            borderRadius: "var(--radius-xl)",
            border: "1px solid rgba(245,158,11,0.18)",
            background: "linear-gradient(160deg, rgba(18,18,18,0.98) 0%, rgba(10,10,10,0.99) 100%)",
            boxShadow: "0 24px 56px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 40px rgba(245,158,11,0.06)",
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            animation: "chatSlideUp 0.25s cubic-bezier(0.16,1,0.3,1) both",
          }}>

            {/* ── Header ────────────────────────────────────── */}
            <div style={{
              padding: "14px 16px", display: "flex", alignItems: "center",
              justifyContent: "space-between", flexShrink: 0,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 10,
                  background: "linear-gradient(135deg, #D97706 0%, #F59E0B 60%, #FCD34D 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#0A0A0A", flexShrink: 0,
                  boxShadow: "0 4px 12px rgba(245,158,11,0.35)",
                }}>
                  <BotIcon />
                </div>
                <div>
                  <div style={{
                    fontWeight: 700, fontSize: 13.5, color: "var(--clr-text)",
                    letterSpacing: "-0.01em", fontFamily: "var(--font-body)", lineHeight: 1.2,
                  }}>
                    Orbit-CRM Assistant
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                    <div style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: "#22C55E", boxShadow: "0 0 6px rgba(34,197,94,0.7)",
                    }} />
                    <span style={{ fontSize: 10.5, color: "var(--clr-text-muted)", fontWeight: 500, fontFamily: "var(--font-body)" }}>
                      Online · CRM AI Helper
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)",
                  color: "var(--clr-text-muted)", cursor: "pointer",
                  width: 28, height: 28, borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.15s ease", flexShrink: 0,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(245,158,11,0.1)"; e.currentTarget.style.borderColor = "rgba(245,158,11,0.3)"; e.currentTarget.style.color = "var(--clr-primary)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "var(--clr-text-muted)"; }}
                aria-label="Close chat"
              >
                <CloseIcon />
              </button>
            </div>

            {/* ── Messages ──────────────────────────────────── */}
            <div className="chat-scroll" style={{
              flex: 1, overflowY: "auto", padding: "14px 14px 8px",
              display: "flex", flexDirection: "column", gap: 10,
            }}>
              {messages.map((msg, i) => (
                <div key={i} className="chat-msg" style={{
                  display: "flex",
                  justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                  alignItems: "flex-end", gap: 7,
                }}>
                  {msg.from === "bot" && (
                    <div style={{
                      width: 24, height: 24, borderRadius: 7,
                      background: "linear-gradient(135deg, #D97706, #F59E0B)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginBottom: 1,
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2"/>
                        <path d="M12 11V6"/>
                        <circle cx="12" cy="4.5" r="1.5" fill="#0A0A0A" stroke="none"/>
                      </svg>
                    </div>
                  )}
                  <div style={{
                    maxWidth: "78%", padding: "9px 13px",
                    borderRadius: msg.from === "user" ? "14px 14px 4px 14px" : "4px 14px 14px 14px",
                    fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap",
                    fontFamily: "var(--font-body)", fontWeight: 400, wordBreak: "break-word",
                    ...(msg.from === "user"
                      ? { background: "linear-gradient(135deg, #D97706 0%, #F59E0B 55%, #FCD34D 100%)", color: "#0A0A0A", fontWeight: 600 }
                      : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "var(--clr-text-sub)" }),
                  }}>
                    {msg.text.replace(/\*\*(.*?)\*\*/g, "$1")}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="chat-msg" style={{ display: "flex", alignItems: "flex-end", gap: 7 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: 7,
                    background: "linear-gradient(135deg, #D97706, #F59E0B)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginBottom: 1,
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2"/>
                      <path d="M12 11V6"/>
                      <circle cx="12" cy="4.5" r="1.5" fill="#0A0A0A" stroke="none"/>
                    </svg>
                  </div>
                  <div style={{
                    padding: "10px 14px", borderRadius: "4px 14px 14px 14px",
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                    display: "flex", alignItems: "center", gap: 5,
                  }}>
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* ── Quick command chips ────────────────────────── */}
            <div style={{
              padding: "8px 14px 0",
              display: "flex", gap: 6, flexWrap: "wrap",
              borderTop: "1px solid rgba(255,255,255,0.04)",
            }}>
              {quickCommands.map((cmd) => (
                <button key={cmd} className="quick-chip" onClick={() => handleQuickCommand(cmd)}>
                  {cmd}
                </button>
              ))}
            </div>

            {/* ── Input row ─────────────────────────────────── */}
            <div style={{ padding: "10px 14px 14px", display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command…"
                style={{
                  flex: 1, background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10,
                  padding: "9px 13px", color: "var(--clr-text)", fontSize: 13,
                  fontFamily: "var(--font-body)", outline: "none",
                  transition: "border-color 0.15s ease, box-shadow 0.15s ease", lineHeight: 1,
                }}
                onFocus={(e) => { e.target.style.borderColor = "rgba(245,158,11,0.45)"; e.target.style.boxShadow = "0 0 0 3px rgba(245,158,11,0.1)"; }}
                onBlur={(e)  => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
              />
              <button className="chat-input-send" onClick={sendMessage} aria-label="Send message">
                <SendIcon />
              </button>
            </div>
          </div>
        )}

        {/* ── Toggle button ──────────────────────────────────────── */}
        <button
          onClick={() => setOpen(!open)}
          className={!open ? "chat-toggle-idle" : ""}
          style={{
            width: 52, height: 52, borderRadius: "50%",
            background: open
              ? "linear-gradient(135deg, #D97706, #F59E0B)"
              : "linear-gradient(135deg, #D97706 0%, #F59E0B 55%, #FCD34D 100%)",
            border: "1.5px solid rgba(245,158,11,0.4)", cursor: "pointer",
            fontSize: 20, color: "#0A0A0A", display: "flex",
            alignItems: "center", justifyContent: "center",
            transition: "all 0.22s cubic-bezier(0.16,1,0.3,1)",
            transform: open ? "scale(0.92) rotate(90deg)" : "scale(1) rotate(0deg)",
          }}
          aria-label={open ? "Close chat" : "Open Orbit-CRM Assistant"}
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M12 11V5"/>
              <circle cx="12" cy="4" r="1" fill="currentColor"/>
              <line x1="8" y1="16" x2="8" y2="16" strokeWidth="2.5"/>
              <line x1="16" y1="16" x2="16" y2="16" strokeWidth="2.5"/>
              <path d="M8 20h8"/>
            </svg>
          )}
        </button>
      </div>
    </>
  );
}