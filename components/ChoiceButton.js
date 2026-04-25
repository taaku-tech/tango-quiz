export default function ChoiceButton({ choice, isCorrect, isWrong, disabled, onClick }) {
  let style = {};
  let extraClass = "w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-150 ";

  if (isCorrect) {
    style = {
      backgroundColor: "#1a4a1a",
      borderColor: "#C9A84C",
      color: "#C9A84C",
    };
  } else if (isWrong) {
    style = {
      backgroundColor: "#3a0000",
      borderColor: "#8B0000",
      color: "#F5F0E8",
      opacity: 0.7,
    };
  } else if (disabled) {
    style = {
      backgroundColor: "#120606",
      borderColor: "#3D0000",
      color: "#F5F0E8",
      opacity: 0.4,
      cursor: "default",
    };
  } else {
    style = {
      backgroundColor: "#1a0a0a",
      borderColor: "#3D0000",
      color: "#F5F0E8",
      cursor: "pointer",
    };
    extraClass += "active:scale-[0.98]";
  }

  return (
    <button
      className={extraClass}
      style={style}
      onClick={!disabled ? onClick : undefined}
    >
      <p className="font-semibold text-sm leading-snug">
        {isCorrect && <span className="mr-1">✓</span>}
        {choice.title}
      </p>
      <p className="text-xs mt-1 leading-snug" style={{ opacity: 0.7 }}>
        {choice.artist}
      </p>
      <p className="text-xs mt-0.5" style={{ opacity: 0.5 }}>
        {choice.year}年
      </p>
    </button>
  );
}
