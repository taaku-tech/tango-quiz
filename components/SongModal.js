export default function SongModal({ song, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl p-6 space-y-4 border-2"
        style={{
          backgroundColor: "#1a0a0a",
          borderColor: "#3D0000",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2
              className="text-xl font-bold leading-tight"
              style={{
                color: "#C9A84C",
                fontFamily: "var(--font-playfair)",
              }}
            >
              {song.title}
            </h2>
            <p className="text-sm mt-1 leading-snug" style={{ color: "#F5F0E8", opacity: 0.8 }}>
              {song.artist}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#F5F0E8", opacity: 0.5 }}>
              {song.year}年
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-xl leading-none flex-shrink-0 p-1 rounded-lg transition-colors"
            style={{ color: "#8B0000" }}
            aria-label="閉じる"
          >
            ✕
          </button>
        </div>

        <div className="pt-4 border-t" style={{ borderColor: "#3D0000" }}>
          <p className="text-sm leading-relaxed" style={{ color: "#F5F0E8", opacity: 0.85 }}>
            {song.description}
          </p>
        </div>
      </div>
    </div>
  );
}
