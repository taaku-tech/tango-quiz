export default function ResultScreen({ questions, score, onRestart, onShowSong }) {
  const total = questions.length;
  const percentage = Math.round((score / total) * 100);

  let message;
  if (percentage === 100) message = "完璧！タンゴの達人ですね！";
  else if (percentage >= 70) message = "すばらしい！よく知っていますね！";
  else if (percentage >= 40) message = "なかなかです！もう少しで達人！";
  else message = "まだまだこれから！練習あるのみ！";

  return (
    <div className="max-w-lg mx-auto px-4 pb-10 pt-6">
      {/* Score card */}
      <div
        className="text-center py-8 rounded-2xl border-2 mb-6"
        style={{ backgroundColor: "#1a0a0a", borderColor: "#3D0000" }}
      >
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#F5F0E8", opacity: 0.5 }}>
          最終スコア
        </p>
        <div
          className="text-6xl font-bold"
          style={{ color: "#C9A84C", fontFamily: "var(--font-playfair)" }}
        >
          {score}
          <span className="text-3xl" style={{ color: "#F5F0E8", opacity: 0.4 }}>
            /{total}
          </span>
        </div>
        <div className="w-12 h-px mx-auto my-4" style={{ backgroundColor: "#8B0000" }} />
        <p className="text-sm" style={{ color: "#F5F0E8", opacity: 0.75 }}>
          {message}
        </p>
      </div>

      {/* Song list */}
      <h3
        className="text-xs uppercase tracking-widest mb-3"
        style={{ color: "#C9A84C", opacity: 0.7 }}
      >
        出題された曲
      </h3>
      <div className="space-y-2 mb-6">
        {questions.map((song) => (
          <button
            key={song.id}
            onClick={() => onShowSong(song)}
            className="w-full text-left rounded-xl px-4 py-3 border transition-all duration-150 active:scale-[0.98] border-l-4"
            style={{
              backgroundColor: "#1a0a0a",
              borderColor: "#3D0000",
              borderLeftColor: "#8B0000",
            }}
          >
            <p
              className="font-semibold text-sm leading-snug"
              style={{ color: "#C9A84C" }}
            >
              {song.title}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#F5F0E8", opacity: 0.6 }}>
              {song.artist} · {song.year}年
            </p>
            <p className="text-xs mt-1" style={{ color: "#8B0000" }}>
              タップで解説を見る →
            </p>
          </button>
        ))}
      </div>

      {/* Restart button */}
      <button
        onClick={onRestart}
        className="w-full py-4 rounded-xl text-base font-semibold border-2 transition-all duration-200 active:scale-[0.97]"
        style={{
          backgroundColor: "#8B0000",
          borderColor: "#C9A84C",
          color: "#C9A84C",
          fontFamily: "var(--font-playfair)",
        }}
      >
        ♪ もう一度挑戦する
      </button>
    </div>
  );
}
