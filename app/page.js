"use client";

import { useState, useEffect, useCallback } from "react";
import songsData from "@/data/songs.json";
import TitleScreen from "@/components/TitleScreen";
import ScoreBar from "@/components/ScoreBar";
import QuizCard from "@/components/QuizCard";
import SongModal from "@/components/SongModal";
import ResultScreen from "@/components/ResultScreen";

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateChoices(currentSong, allSongs) {
  const toChoice = (s) => ({ title: s.title, titleJa: s.titleJa, artist: s.artist, year: s.year });
  const usedTitles = new Set([currentSong.title]);

  // 1. Same artist, different title (fallback: any different-artist song)
  const sameArtistPool = allSongs.filter(
    (s) => s.artist === currentSong.artist && !usedTitles.has(s.title)
  );
  const sameArtistPick =
    sameArtistPool.length > 0
      ? shuffleArray(sameArtistPool)[0]
      : shuffleArray(allSongs.filter((s) => s.artist !== currentSong.artist && !usedTitles.has(s.title)))[0];
  usedTitles.add(sameArtistPick.title);

  // 2. Two different-artist songs not already used
  const diffPool = shuffleArray(
    allSongs.filter((s) => s.artist !== currentSong.artist && !usedTitles.has(s.title))
  );
  const others = diffPool.slice(0, 2);

  return shuffleArray([toChoice(currentSong), toChoice(sameArtistPick), ...others.map(toChoice)]);
}

export default function Home() {
  const [showTitle, setShowTitle] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalSong, setModalSong] = useState(null);
  const [quizDone, setQuizDone] = useState(false);

  const initQuiz = useCallback(() => {
    const shuffled = shuffleArray(songsData);
    const withChoices = shuffled.slice(0, Math.min(10, shuffled.length)).map((song) => ({
      ...song,
      choices: generateChoices(song, songsData),
    }));
    setQuestions(withChoices);
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedChoice(null);
    setShowModal(false);
    setModalSong(null);
    setQuizDone(false);
  }, []);

  const handleStart = () => {
    initQuiz();
    setShowTitle(false);
  };

  const handleRestart = () => {
    initQuiz();
    setShowTitle(true);
  };

  const handleBackToTitle = () => {
    initQuiz();
    setShowTitle(true);
  };

  const handleAnswer = (choice) => {
    if (answered) return;
    const isCorrect = choice.title === questions[currentIndex].title;
    setSelectedChoice(choice);
    setAnswered(true);
    if (isCorrect) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setQuizDone(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setAnswered(false);
      setSelectedChoice(null);
    }
  };

  const openModal = (song) => {
    setModalSong(song);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalSong(null);
  };

  if (showTitle) {
    return <TitleScreen onStart={handleStart} />;
  }

  if (questions.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-sm"
        style={{ backgroundColor: "#0a0a0a", color: "#F5F0E8", opacity: 0.5 }}
      >
        読み込み中...
      </div>
    );
  }

  const currentSong = questions[currentIndex];
  const isCorrect = answered && selectedChoice?.title === currentSong.title;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0a", color: "#F5F0E8" }}>
      {!quizDone && (
        <ScoreBar
          current={currentIndex + 1}
          total={questions.length}
          score={score}
          onBack={handleBackToTitle}
        />
      )}

      {quizDone ? (
        <ResultScreen
          questions={questions}
          score={score}
          onRestart={handleRestart}
          onShowSong={openModal}
        />
      ) : (
        <div className="max-w-lg mx-auto px-4 pb-10">
          <QuizCard
            key={currentIndex}
            song={currentSong}
            answered={answered}
            selectedChoice={selectedChoice}
            onAnswer={handleAnswer}
          />

          {answered && (
            <div className="mt-5 space-y-3">
              <p
                className="text-center text-xl font-bold"
                style={{
                  color: isCorrect ? "#C9A84C" : "#F5F0E8",
                  fontFamily: "var(--font-playfair)",
                }}
              >
                {isCorrect ? "✓ 正解！" : "✗ 不正解…"}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => openModal(currentSong)}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold border transition-all duration-150 active:scale-[0.97]"
                  style={{
                    backgroundColor: "#1a0a0a",
                    borderColor: "#C9A84C",
                    color: "#C9A84C",
                  }}
                >
                  この曲について
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold border transition-all duration-150 active:scale-[0.97]"
                  style={{
                    backgroundColor: "#8B0000",
                    borderColor: "#C9A84C",
                    color: "#C9A84C",
                  }}
                >
                  {currentIndex + 1 >= questions.length ? "結果を見る →" : "次へ →"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Playback notice */}
      <div
        className="max-w-lg mx-auto px-4 pb-6"
        style={{ borderTop: "1px solid #2a2a2a", marginTop: "16px" }}
      >
        <p
          style={{
            color: "#888888",
            fontSize: "12px",
            textAlign: "center",
            lineHeight: "1.8",
            paddingTop: "12px",
          }}
        >
          ※ 再生時間について
          <br />
          Spotifyにログインしていない場合は30秒で自動停止します。
          <br />
          ログイン済みの場合はフル再生されます。
        </p>
      </div>

      {showModal && modalSong && (
        <SongModal song={modalSong} onClose={closeModal} />
      )}
    </div>
  );
}
