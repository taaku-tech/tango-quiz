import Link from "next/link";

function StepBadge({ number }) {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        backgroundColor: "#8B0000",
        border: "2px solid #C9A84C",
        color: "#C9A84C",
        fontSize: 13,
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {number}
    </div>
  );
}

function PlayerMockup() {
  return (
    <svg
      viewBox="0 0 300 90"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", display: "block" }}
    >
      {/* Label + arrow above play button */}
      <text x="240" y="11" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#FF4444">
        ここをタップ！
      </text>
      <text x="240" y="24" textAnchor="middle" fontSize="13" fill="#FF4444">↓</text>

      {/* Player background */}
      <rect x="0" y="28" width="300" height="60" rx="6" fill="#111111" stroke="#C9A84C" strokeWidth="1.5" />

      {/* Album art */}
      <rect x="5" y="33" width="50" height="50" rx="4" fill="#2a0a0a" />
      <text x="30" y="64" textAnchor="middle" fontSize="20" fill="#8B0000">♪</text>

      {/* Track info lines */}
      <rect x="63" y="41" width="100" height="7" rx="3" fill="#444" />
      <rect x="63" y="55" width="68" height="6" rx="3" fill="#333" />

      {/* Prev button */}
      <circle cx="196" cy="58" r="13" fill="#1a0a0a" stroke="#555" strokeWidth="1.5" />
      <text x="196" y="63" textAnchor="middle" fontSize="9" fill="#888">⏮</text>

      {/* Play button */}
      <circle cx="240" cy="58" r="17" fill="#8B0000" />
      <text x="241" y="64" textAnchor="middle" fontSize="13" fill="#C9A84C">▶</text>

      {/* Pulsing ring */}
      <circle cx="240" cy="58" r="21" fill="none" stroke="#FF4444" strokeWidth="2.5" opacity="0.9">
        <animate attributeName="r" values="21;27;21" dur="1.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0.15;0.9" dur="1.2s" repeatCount="indefinite" />
      </circle>

      {/* Next button */}
      <circle cx="280" cy="58" r="13" fill="#1a0a0a" stroke="#555" strokeWidth="1.5" />
      <text x="280" y="63" textAnchor="middle" fontSize="9" fill="#888">⏭</text>
    </svg>
  );
}

export default function TitleScreen({ onStart }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center px-6 py-10 relative overflow-x-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Tango dancer silhouette SVG */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <svg
          viewBox="0 0 260 360"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[70vw] max-w-sm opacity-10"
        >
          <g fill="#8B0000">
            <circle cx="88" cy="44" r="22" />
            <path d="M67 66 L109 66 L115 158 L61 158 Z" />
            <path d="M107 85 Q148 78 155 90 L150 100 Q143 90 104 97 Z" />
            <path d="M70 72 L38 50 L43 41 L74 63 Z" />
            <path d="M65 155 L56 290 L74 293 L82 158 Z" />
            <path d="M96 155 L110 285 L128 281 L115 151 Z" />
          </g>
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
        {/* Title */}
        <div className="space-y-2">
          <h1
            className="text-5xl leading-tight"
            style={{ fontFamily: "var(--font-playfair)", color: "#C9A84C" }}
          >
            Tango Quiz
          </h1>
          <p className="text-base tracking-wide" style={{ color: "#F5F0E8", opacity: 0.8 }}>
            アルゼンチンタンゴ
            <br />
            イントロ当てクイズ
          </p>
        </div>

        <div className="w-16 h-px mx-auto" style={{ backgroundColor: "#8B0000" }} />

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

        <Link
          href="/artists"
          className="block w-full py-3 rounded-xl text-sm font-semibold tracking-wider text-center transition-all duration-200 active:scale-[0.97] border-2"
          style={{
            backgroundColor: "transparent",
            borderColor: "#8B0000",
            color: "#C9A84C",
          }}
        >
          🎼 演奏家紹介
        </Link>

        <p className="text-xs" style={{ color: "#F5F0E8", opacity: 0.35 }}>
          全20曲からランダムに10問出題
        </p>

        {/* Operation guide */}
        <div
          className="text-left rounded-2xl p-5 space-y-5 border"
          style={{ backgroundColor: "#1a0a0a", borderColor: "#C9A84C" }}
        >
          <h2
            className="text-center font-bold text-base"
            style={{ color: "#C9A84C" }}
          >
            🎵 操作方法
          </h2>

          {/* STEP 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <StepBadge number="1" />
              <span className="font-semibold text-sm" style={{ color: "#C9A84C" }}>
                音楽を再生する
              </span>
            </div>
            <PlayerMockup />
            <p className="text-sm leading-relaxed" style={{ color: "#F5F0E8", opacity: 0.85, lineHeight: "1.8" }}>
              クイズ画面では、Spotifyの音楽再生画面が金色の枠で囲まれて表示されます。曲名がわからないようにぼかし処理がされています。
              <br /><br />
              <span style={{ color: "#C9A84C", fontWeight: "bold" }}>▶ 再生方法</span>
              <br />
              金色の枠内の右端あたりを何度かタップすると再生ボタンに当たり、音楽が流れ始めます。
              <br /><br />
              <span style={{ color: "#FFA500" }}>
                ⚠️ 30秒経過すると再生が自動停止します。停止後はプレイヤーの画面が変わり、再生ボタンが押せなくなります。その場合は音楽なしで選択肢から曲名を選び、「次へ」ボタンで次の問題に進んでください。
              </span>
            </p>
          </div>

          <div className="h-px" style={{ backgroundColor: "#3D0000" }} />

          {/* STEP 2 */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <StepBadge number="2" />
              <span className="font-semibold text-sm" style={{ color: "#C9A84C" }}>
                曲名を選ぶ
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#F5F0E8", opacity: 0.85 }}>
              音楽を聴いて、4つの選択肢の中から曲名を選んでください
            </p>
          </div>

          <div className="h-px" style={{ backgroundColor: "#3D0000" }} />

          {/* STEP 3 */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <StepBadge number="3" />
              <span className="font-semibold text-sm" style={{ color: "#C9A84C" }}>
                結果を確認する
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#F5F0E8", opacity: 0.85 }}>
              正解・不正解が表示されます。10問チャレンジしてスコアを競いましょう！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
