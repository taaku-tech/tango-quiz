export default function ScoreBar({ current, total, score }) {
  return (
    <div
      className="sticky top-0 z-10 border-b px-4 py-3 flex items-center justify-between"
      style={{ backgroundColor: "#8B0000", borderColor: "#3D0000" }}
    >
      <span className="text-sm" style={{ color: "#F5F0E8", opacity: 0.8 }}>
        問題{" "}
        <span
          className="font-bold text-base"
          style={{ color: "#F5F0E8", opacity: 1 }}
        >
          {current}/{total}
        </span>
      </span>
      <span
        className="font-bold text-base"
        style={{
          color: "#C9A84C",
          fontFamily: "var(--font-playfair)",
        }}
      >
        スコア {score}
      </span>
    </div>
  );
}
