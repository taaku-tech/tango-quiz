export default function ScoreBar({ current, total, score }) {
  return (
    <div className="sticky top-0 z-10 bg-gray-950/95 backdrop-blur border-b border-gray-800 px-4 py-3 flex items-center justify-between">
      <span className="text-gray-400 text-sm">
        問題{" "}
        <span className="text-white font-bold text-base">
          {current}/{total}
        </span>
      </span>
      <span className="text-amber-400 font-bold text-base">
        スコア {score}
      </span>
    </div>
  );
}
