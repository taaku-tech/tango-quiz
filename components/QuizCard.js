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
  const [showPlayer, setShowPlayer] = useState(true);
  const [shuffledChoices] = useState(() => shuffleArray(song.choices));

  const handleChoiceClick = (choice) => {
    if (answered) return;
    setShowPlayer(false);
    onAnswer(choice);
  };

  return (
    <div className="pt-4 space-y-4">
      <div className="rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
        {showPlayer ? (
          <iframe
            src={`https://open.spotify.com/embed/track/${song.spotifyTrackId}?utm_source=generator`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        ) : (
          <div className="h-[152px] flex items-center justify-center text-gray-600 text-sm gap-2">
            <span>♪</span>
            <span>再生停止</span>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-amber-300/80 bg-amber-950/50 border border-amber-900/60 rounded-xl px-3 py-2">
        ⚠️ プレイヤーの曲名を見ないで答えてください
      </p>

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
