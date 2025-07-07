"use client";
import { useState } from "react";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 10000,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "#4e73df",
          color: "#fff",
          border: "none",
          fontSize: 32,
          boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
          cursor: "pointer",
        }}
        aria-label={open ? "Close Chatbot" : "Open Chatbot"}
      >
        💬
      </button>
      {open && (
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/BFljDhUUUpuOPnjmRtMyQ"
          width="400"
          height="600"
          style={{
            position: "fixed",
            bottom: 100,
            right: 32,
            border: "none",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
            zIndex: 9999,
            background: "white",
          }}
          frameBorder="0"
        ></iframe>
      )}
    </>
  );
}