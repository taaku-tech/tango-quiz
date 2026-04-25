"use client";

export default function ScoreBar({ current, total, score, onBack }) {
  const handleBack = () => {
    if (window.confirm("クイズを終了してタイトルに戻りますか？")) {
      onBack();
    }
  };

  return (
    <div
      className="sticky top-0 z-10 border-b px-4 py-3 flex items-center justify-between gap-3"
      style={{ backgroundColor: "#8B0000", borderColor: "#3D0000" }}
    >
      <button
        onClick={handleBack}
        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-base transition-all duration-150 active:scale-90 border"
        style={{
          backgroundColor: "rgba(0,0,0,0.25)",
          borderColor: "rgba(201,168,76,0.4)",
          color: "#C9A84C",
        }}
        aria-label="タイトルに戻る"
      >
        ✕
      </button>

      <span className="text-sm flex-1 text-center" style={{ color: "#F5F0E8", opacity: 0.8 }}>
        問題{" "}
        <span className="font-bold text-base" style={{ color: "#F5F0E8", opacity: 1 }}>
          {current}/{total}
        </span>
      </span>

      <span
        className="flex-shrink-0 font-bold text-base"
        style={{ color: "#C9A84C", fontFamily: "var(--font-playfair)" }}
      >
        スコア {score}
      </span>
    </div>
  );
}
