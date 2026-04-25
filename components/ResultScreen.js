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
      <div className="text-center py-6 bg-gray-900/60 rounded-2xl border border-gray-800 mb-6">
        <p className="text-gray-400 text-sm mb-2">最終スコア</p>
        <div className="text-6xl font-bold text-amber-400">
          {score}
          <span className="text-3xl text-gray-500">/{total}</span>
        </div>
        <p className="text-gray-300 mt-3 text-sm">{message}</p>
      </div>

      <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-3">
        出題された曲
      </h3>
      <div className="space-y-2 mb-6">
        {questions.map((song) => (
          <button
            key={song.id}
            onClick={() => onShowSong(song)}
            className="w-full text-left bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 active:bg-gray-700 transition-colors"
          >
            <p className="font-semibold text-sm text-amber-300 leading-snug">
              {song.title}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {song.artist} · {song.year}年
            </p>
            <p className="text-xs text-amber-600/70 mt-1">タップで解説を見る →</p>
          </button>
        ))}
      </div>

      <button
        onClick={onRestart}
        className="w-full py-4 rounded-2xl bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold text-lg transition-colors"
      >
        もう一度挑戦する
      </button>
    </div>
  );
}
