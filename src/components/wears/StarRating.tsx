import { Star } from "lucide-react";

interface StarRatingProps {
  totalStars?: number;
  rating?: number;
}

const StarRating = ({ totalStars = 5, rating = 0 }: StarRatingProps) => {
  return (
    <div className="flex space-x-0.5">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;

        let icon;
        if (rating >= starValue) {
          icon = <Star className="w-5 h-5 fill-foreground" />;
        } else {
          icon = <Star className="w-5 h-5 fill-none stroke-current" />;
        }

        return <div key={starValue}>{icon}</div>;
      })}
    </div>
  );
};

export default StarRating;
