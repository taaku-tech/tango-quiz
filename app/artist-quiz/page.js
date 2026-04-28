"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
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

function generateArtistChoices(currentSong, artistSongs, allSongs) {
  const toChoice = (s) => ({ title: s.title, titleJa: s.titleJa, artist: s.artist, year: s.year });
  const usedTitles = new Set([currentSong.title]);

  const sameArtistPool = shuffleArray(artistSongs.filter((s) => !usedTitles.has(s.title)));
  const sameArtistPicks = sameArtistPool.slice(0, 3);
  sameArtistPicks.forEach((s) => usedTitles.add(s.title));

  const needed = 3 - sameArtistPicks.length;
  const diffPool = shuffleArray(
    allSongs.filter((s) => s.artist !== currentSong.artist && !usedTitles.has(s.title))
  );
  const others = diffPool.slice(0, needed);

  return shuffleArray([toChoice(currentSong), ...sameArtistPicks.map(toChoice), ...others.map(toChoice)]);
}

function ArtistQuiz() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const artistName = searchParams.get("artist") || "";

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalSong, setModalSong] = useState(null);
  const [quizDone, setQuizDone] = useState(false);

  const initQuiz = useCallback(() => {
    const artistSongs = songsData.filter((s) => s.artist === artistName);
    const shuffled = shuffleArray(artistSongs);
    const withChoices = shuffled.map((song) => ({
      ...song,
      choices: generateArtistChoices(song, artistSongs, songsData),
    }));
    setQuestions(withChoices);
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedChoice(null);
    setShowModal(false);
    setModalSong(null);
    setQuizDone(false);
  }, [artistName]);

  useEffect(() => {
    if (artistName) initQuiz();
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

  const handleBack = () => {
    router.push("/artists");
  };

  const openModal = (song) => {
    setModalSong(song);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalSong(null);
  };

  const artistSongs = songsData.filter((s) => s.artist === artistName);

  if (!artistName || artistSongs.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ backgroundColor: "#0a0a0a", color: "#F5F0E8" }}
      >
        <p style={{ opacity: 0.5 }}>演奏家が見つかりません</p>
        <Link
          href="/artists"
          className="text-sm font-semibold"
          style={{ color: "#C9A84C" }}
        >
          ← 演奏家紹介に戻る
        </Link>
      </div>
    );
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
          onBack={handleBack}
        />
      )}

      {quizDone ? (
        <>
          <div className="max-w-lg mx-auto px-4 pt-4 pb-2">
            <Link
              href="/artists"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ color: "#C9A84C" }}
            >
              ← 演奏家紹介に戻る
            </Link>
          </div>
          <ResultScreen
            questions={questions}
            score={score}
            onRestart={initQuiz}
            onShowSong={openModal}
          />
        </>
      ) : (
        <div className="max-w-lg mx-auto px-4 pb-10">
          <div className="pt-4 pb-1 text-center">
            <p
              className="text-xs uppercase tracking-widest mb-1"
              style={{ color: "#8B0000" }}
            >
              演奏家別クイズ
            </p>
            <p
              className="text-sm font-semibold leading-snug"
              style={{ color: "#C9A84C", fontFamily: "var(--font-playfair)" }}
            >
              {artistName}
            </p>
          </div>

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

      {showModal && modalSong && (
        <SongModal song={modalSong} onClose={closeModal} />
      )}
    </div>
  );
}

export default function ArtistQuizPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center text-sm"
          style={{ backgroundColor: "#0a0a0a", color: "#F5F0E8", opacity: 0.5 }}
        >
          読み込み中...
        </div>
      }
    >
      <ArtistQuiz />
    </Suspense>
  );
}
