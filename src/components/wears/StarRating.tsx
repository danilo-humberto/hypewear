import { useState } from "react";
import { Star } from "lucide-react"; // Ou use ícones como Heroicons ou SVGs

const StarRating = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex space-x-0.5">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = hover >= starValue || rating >= starValue;

        return (
          <button
            key={starValue}
            type="button"
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            className="text-foreground transition-transform duration-200"
          >
            <Star
              className={`w-6 h-6 ${
                isFilled ? "fill-foreground" : "fill-none stroke-current"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
