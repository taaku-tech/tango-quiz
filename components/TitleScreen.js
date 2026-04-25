export default function TitleScreen({ onStart }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Tango dancer silhouette SVG */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <svg
          viewBox="0 0 260 360"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[70vw] max-w-sm opacity-15"
        >
          {/* Male dancer — upright, left */}
          <g fill="#8B0000">
            <circle cx="88" cy="44" r="22" />
            <path d="M67 66 L109 66 L115 158 L61 158 Z" />
            <path d="M107 85 Q148 78 155 90 L150 100 Q143 90 104 97 Z" />
            <path d="M70 72 L38 50 L43 41 L74 63 Z" />
            <path d="M65 155 L56 290 L74 293 L82 158 Z" />
            <path d="M96 155 L110 285 L128 281 L115 151 Z" />
          </g>
          {/* Female dancer — leaning back, right */}
          <g fill="#C9A84C">
            <circle cx="172" cy="60" r="19" />
            <path d="M153 79 L191 71 L200 158 L162 166 Z" />
            <path d="M155 88 Q110 72 100 82 L103 94 Q113 85 153 101 Z" />
            <path d="M189 82 L222 58 L227 67 L196 93 Z" />
            <path d="M163 163 L132 300 L150 305 L178 168 Z" />
            <path d="M194 156 L214 235 L232 230 L213 150 Z" />
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-5 max-w-sm w-full">
        <div className="space-y-2">
          <h1
            className="text-5xl leading-tight"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "#C9A84C",
            }}
          >
            Tango Quiz
          </h1>
          <p
            className="text-base tracking-wide"
            style={{ color: "#F5F0E8", opacity: 0.8 }}
          >
            アルゼンチンタンゴ
            <br />
            イントロ当てクイズ
          </p>
        </div>

        <div
          className="w-16 h-px mx-auto"
          style={{ backgroundColor: "#8B0000" }}
        />

        <button
          onClick={onStart}
          className="w-full py-4 rounded-xl text-base font-semibold tracking-wider transition-all duration-200 active:scale-[0.97] border-2"
          style={{
            backgroundColor: "#8B0000",
            borderColor: "#C9A84C",
            color: "#C9A84C",
            fontFamily: "var(--font-playfair)",
          }}
        >
          ♪ クイズを始める
        </button>

        <p className="text-xs" style={{ color: "#F5F0E8", opacity: 0.35 }}>
          全20曲からランダムに10問出題
        </p>
      </div>
    </div>
  );
}
