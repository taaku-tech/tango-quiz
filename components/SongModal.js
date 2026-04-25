export default function SongModal({ song, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-lg p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-amber-400 leading-tight">
              {song.title}
            </h2>
            <p className="text-gray-300 text-sm mt-1 leading-snug">
              {song.artist}
            </p>
            <p className="text-gray-500 text-xs mt-0.5">{song.year}年</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white text-xl leading-none flex-shrink-0 p-1"
            aria-label="閉じる"
          >
            ✕
          </button>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <p className="text-gray-300 text-sm leading-relaxed">
            {song.description}
          </p>
        </div>
      </div>
    </div>
  );
}
