"use client";

import { useState } from "react";

export default function ChoiceButton({ choice, isCorrect, isWrong, disabled, onClick }) {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = (e) => {
    e.stopPropagation();
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    if (speaking) return;

    window.speechSynthesis.cancel();

    const make = (text, lang) => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      return u;
    };

    const u1 = make(choice.title, "es-ES");
    const u2 = make(choice.titleJa || "", "ja-JP");
    const u3 = make(choice.artist, "es-ES");
    const u4 = make(`${choice.year}年`, "ja-JP");

    u1.onstart = () => setSpeaking(true);
    u1.onend = () => window.speechSynthesis.speak(u2);
    u2.onend = () => window.speechSynthesis.speak(u3);
    u3.onend = () => window.speechSynthesis.speak(u4);
    u4.onend = () => setSpeaking(false);

    u1.onerror = () => setSpeaking(false);
    u2.onerror = () => setSpeaking(false);
    u3.onerror = () => setSpeaking(false);
    u4.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(u1);
  };

  let choiceStyle = {};
  let choiceClass =
    "flex-1 text-left px-4 py-3 rounded-xl border-2 transition-all duration-150 min-w-0 ";

  if (isCorrect) {
    choiceStyle = { backgroundColor: "#1a4a1a", borderColor: "#C9A84C", color: "#C9A84C" };
  } else if (isWrong) {
    choiceStyle = { backgroundColor: "#3a0000", borderColor: "#8B0000", color: "#F5F0E8", opacity: 0.7 };
  } else if (disabled) {
    choiceStyle = { backgroundColor: "#120606", borderColor: "#3D0000", color: "#F5F0E8", opacity: 0.4, cursor: "default" };
  } else {
    choiceStyle = { backgroundColor: "#1a0a0a", borderColor: "#3D0000", color: "#F5F0E8", cursor: "pointer" };
    choiceClass += "active:scale-[0.98]";
  }

  return (
    <div className="flex gap-2 items-stretch">
      {/* Choice selection button */}
      <button
        className={choiceClass}
        style={choiceStyle}
        onClick={!disabled ? onClick : undefined}
      >
        <p className="font-semibold text-sm leading-snug">
          {isCorrect && <span className="mr-1">✓</span>}
          {choice.title}
        </p>
        {choice.titleJa && (
          <p className="text-xs mt-0.5 leading-snug" style={{ color: "#C9A84C" }}>
            {choice.titleJa}
          </p>
        )}
        <p className="text-xs mt-1 leading-snug" style={{ opacity: 0.7 }}>
          {choice.artist}
        </p>
        <p className="text-xs mt-0.5" style={{ opacity: 0.5 }}>
          {choice.year}年
        </p>
      </button>

      {/* Text-to-speech button */}
      <button
        onClick={handleSpeak}
        disabled={speaking}
        className="flex-shrink-0 w-11 rounded-xl border-2 flex items-center justify-center text-base transition-all duration-150 active:scale-95"
        style={{
          backgroundColor: "#1a0a0a",
          borderColor: "#3D0000",
          color: speaking ? "#3D0000" : "#C9A84C",
          opacity: speaking ? 0.5 : 1,
          cursor: speaking ? "default" : "pointer",
        }}
        aria-label="読み上げ"
        title="読み上げ"
      >
        🔊
      </button>
    </div>
  );
}
