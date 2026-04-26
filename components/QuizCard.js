"use client";

import { useState, useEffect } from "react";
import ChoiceButton from "./ChoiceButton";

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function QuizCard({ song, answered, selectedChoice, onAnswer }) {
  const [shuffledChoices] = useState(() => shuffleArray(song.choices));
  const [playing, setPlaying] = useState(false);

  /* Spotify Embed API から再生開始のメッセージを受信 */
  useEffect(() => {
    const handler = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "playback_update" && !data.payload?.isPaused) {
          setPlaying(true);
        }
      } catch (_) {}
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const handleChoiceClick = (choice) => {
    if (answered) return;
    onAnswer(choice);
  };

  const showGuide = !playing && !answered;

  return (
    <div className="pt-4 space-y-4">
      {/* Player container */}
      <div
        className="rounded-xl overflow-hidden border-2"
        style={{
          position: "relative",
          height: "80px",
          borderColor: "#3D0000",
          backgroundColor: "#1a0a0a",
        }}
      >
        {/* iframe — blur before answer, clear after */}
        <iframe
          id="spotify-iframe"
          src={`https://open.spotify.com/embed/track/${song.spotifyTrackId}?utm_source=generator&autoplay=0&theme=0`}
          width="100%"
          height="80"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "block",
            filter: answered ? "none" : "blur(6px)",
            transition: "filter 0.4s ease",
          }}
        />

        {/* Guide overlay — pointer-events: none so clicks reach iframe */}
        {showGuide && (
          <>
            <style>{`
              @keyframes bounce-x {
                0%, 100% { transform: translateX(0); }
                50% { transform: translateX(7px); }
              }
              .bounce-x { animation: bounce-x 0.9s ease-in-out infinite; }
            `}</style>
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(0,0,0,0.72)",
                  border: "1px solid rgba(201,168,76,0.4)",
                  borderRadius: "10px",
                  padding: "5px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    color: "#C9A84C",
                    fontSize: "12px",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                  }}
                >
                  👉 右端をタップして再生
                </span>
                <span
                  className="bounce-x"
                  style={{ color: "#C9A84C", fontSize: "14px", display: "inline-block" }}
                >
                  →
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Choices */}
      <div className="space-y-3">
        {shuffledChoices.map((choice) => (
          <ChoiceButton
            key={choice.title}
            choice={choice}
            isCorrect={answered && choice.title === song.title}
            isWrong={
              answered &&
              selectedChoice?.title === choice.title &&
              choice.title !== song.title
            }
            disabled={answered}
            onClick={() => handleChoiceClick(choice)}
          />
        ))}
      </div>
    </div>
  );
}
