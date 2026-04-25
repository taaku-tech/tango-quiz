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
  const [started, setStarted] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleChoiceClick = (choice) => {
    if (answered) return;
    onAnswer(choice);
  };

  return (
    <div className="pt-4 space-y-4">
      {/* iframe - off-screen while playing, visible after reveal */}
      {(started || revealed) && (
        <div
          className={
            revealed
              ? "rounded-2xl overflow-hidden bg-gray-900 border border-gray-800"
              : ""
          }
          style={!revealed ? { position: "absolute", left: "-9999px" } : {}}
        >
          <iframe
            src={`https://open.spotify.com/embed/track/${song.spotifyTrackId}?utm_source=generator`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      )}

      {/* Placeholder - shown until player is revealed */}
      {!revealed && (
        <div className="rounded-2xl bg-gray-900 border border-gray-800 h-[152px] flex items-center justify-center">
          {!answered ? (
            <button
              onClick={() => setStarted(true)}
              disabled={started}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-colors ${
                started
                  ? "bg-gray-700 text-gray-400 cursor-default"
                  : "bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white"
              }`}
            >
              {started ? "⏸ 再生中..." : "▶ イントロを再生する"}
            </button>
          ) : (
            <button
              onClick={() => setRevealed(true)}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-sm transition-colors"
            >
              🎵 答えを確認する
            </button>
          )}
        </div>
      )}

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
