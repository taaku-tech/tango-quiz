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

  return (
    <div className="pt-4 space-y-3">
      {/* Player container */}
      <div
        style={{
          position: "relative",
          height: "80px",
          border: "3px solid #C9A84C",
          borderRadius: "8px",
          overflow: "hidden",
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

        {/* Gold pulsing highlight — bottom-right corner */}
        {!answered && (
          <div
            className="animate-pulse"
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "60px",
              height: "60px",
              border: "3px solid #C9A84C",
              backgroundColor: "rgba(201,168,76,0.2)",
              pointerEvents: "none",
              zIndex: 20,
            }}
          />
        )}
      </div>

      {/* Guide text below player */}
      {!answered && (
        <p
          style={{
            color: "#C9A84C",
            fontSize: "14px",
            textAlign: "center",
            lineHeight: "1.7",
          }}
        >
          Spotifyの音楽再生画面です。
          <br />
          右下の金色に光っている部分をタップすると再生が始まります🎵
        </p>
      )}

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
