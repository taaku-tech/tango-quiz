export default function ChoiceButton({ choice, isCorrect, isWrong, disabled, onClick }) {
  let classes =
    "w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-150 ";

  if (isCorrect) {
    classes += "bg-green-900/50 border-green-500 text-green-200";
  } else if (isWrong) {
    classes += "bg-red-900/50 border-red-500 text-red-200";
  } else if (disabled) {
    classes += "bg-gray-800/30 border-gray-800 text-gray-600 cursor-default";
  } else {
    classes +=
      "bg-gray-800 border-gray-700 text-white active:scale-[0.98] active:bg-gray-700 cursor-pointer";
  }

  return (
    <button
      className={classes}
      onClick={!disabled ? onClick : undefined}
    >
      <p className="font-semibold text-sm leading-snug">{choice.title}</p>
      <p className="text-xs mt-1 opacity-70 leading-snug">{choice.artist}</p>
      <p className="text-xs mt-0.5 opacity-50">{choice.year}年</p>
    </button>
  );
}
