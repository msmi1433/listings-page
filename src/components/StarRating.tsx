import StarIcon from "./StarIcon";

type StarRatingProps = {
  score: number;
};

function StarRating({ score }: StarRatingProps) {
  const fillPercentage = Math.round(score * 10);

  return (
    <div className="relative inline-flex">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          /* Accepting index key use as these arrays are static */
          <StarIcon key={`gray-${i}`} className="w-5 h-5 fill-gray-300" />
        ))}
      </div>
      <div
        className="absolute top-0 left-0 h-full overflow-hidden flex gap-1"
        style={{ width: `${fillPercentage}%` }}
      >
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={`yellow-${i}`}
            className="w-5 h-5 fill-yellow-400 shrink-0"
          />
        ))}
      </div>
    </div>
  );
}

export default StarRating;
