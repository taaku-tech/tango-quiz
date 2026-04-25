"use client";

import { useState } from "react";
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
  const [revealed, setRevealed] = useState(false);

  const handlePlay = () => {
    if (playing) return;
    const iframe = document.querySelector("#spotify-iframe");
    if (iframe) {
      iframe.contentWindow.postMessage(
        JSON.stringify({ command: "toggle" }),
        "https://open.spotify.com"
      );
    }
    setPlaying(true);
  };

  const handleChoiceClick = (choice) => {
    if (answered) return;
    onAnswer(choice);
  };

  return (
    <div className="pt-4 space-y-4">
      {/* Player container — iframe + overlay stacked */}
      <div
        className="rounded-xl overflow-hidden border-2"
        style={{
          position: "relative",
          height: "80px",
          borderColor: "#3D0000",
          backgroundColor: "#1a0a0a",
        }}
      >
        {/* iframe — always in DOM, loads in background */}
        <iframe
          id="spotify-iframe"
          src={`https://open.spotify.com/embed/track/${song.spotifyTrackId}?utm_source=generator&theme=0`}
          width="100%"
          height="80"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{ position: "absolute", top: 0, left: 0, display: "block" }}
        />

        {/* Overlay — covers iframe until revealed */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#0a0a0a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            opacity: revealed ? 0 : 1,
            pointerEvents: revealed ? "none" : "auto",
            transition: "opacity 0.4s ease",
          }}
        >
          {!answered ? (
            <button
              onClick={handlePlay}
              disabled={playing}
              style={{
                backgroundColor: playing ? "transparent" : "#8B0000",
                border: "2px solid #C9A84C",
                borderRadius: "12px",
                padding: "8px 24px",
                color: "#C9A84C",
                fontSize: "14px",
                fontWeight: "600",
                cursor: playing ? "default" : "pointer",
                opacity: playing ? 0.6 : 1,
                transition: "opacity 0.2s",
              }}
            >
              {playing ? "⏸ 再生中..." : "▶ 再生する"}
            </button>
          ) : (
            <button
              onClick={() => setRevealed(true)}
              style={{
                backgroundColor: "#8B0000",
                border: "2px solid #C9A84C",
                borderRadius: "12px",
                padding: "8px 24px",
                color: "#C9A84C",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              🎵 答えを確認する
            </button>
          )}
        </div>
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
