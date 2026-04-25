"use client";

import { useState, useEffect, useCallback } from "react";
import songsData from "@/data/songs.json";
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

export default function Home() {
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
    setQuestions(shuffled.slice(0, Math.min(10, shuffled.length)));
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedChoice(null);
    setShowModal(false);
    setModalSong(null);
    setQuizDone(false);
  }, []);

  useEffect(() => {
    initQuiz();
  }, [initQuiz]);

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

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">
        読み込み中...
      </div>
    );
  }

  const currentSong = questions[currentIndex];
  const isCorrect =
    answered && selectedChoice?.title === currentSong.title;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {!quizDone && (
        <ScoreBar
          current={currentIndex + 1}
          total={questions.length}
          score={score}
        />
      )}

      {quizDone ? (
        <ResultScreen
          questions={questions}
          score={score}
          onRestart={initQuiz}
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
                className={`text-center text-xl font-bold ${
                  isCorrect ? "text-green-400" : "text-red-400"
                }`}
              >
                {isCorrect ? "正解！🎵" : "不正解…"}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => openModal(currentSong)}
                  className="flex-1 py-3 rounded-xl bg-amber-700 hover:bg-amber-600 active:bg-amber-800 text-white font-semibold text-sm transition-colors"
                >
                  この曲について
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-800 text-white font-semibold text-sm transition-colors"
                >
                  {currentIndex + 1 >= questions.length
                    ? "結果を見る →"
                    : "次へ →"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {showModal && modalSong && (
        <SongModal song={modalSong} onClose={closeModal} />
      )}
    </div>
  );
}
