import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import StarRating from "./StarRating";

interface Rating {
  rate: number;
  count: number;
}
interface CardsProps {
  title: string;
  description: string;
  price: number;
  image: string;
  rating: Rating;
}

const Cards = ({ title, description, price, image, rating }: CardsProps) => {
  return (
    <Card className="shadow-none">
      <CardContent className="w-full">
        <div className="w-full h-[300px]">
          <img
            src={image}
            alt={title}
            className="rounded-md object-contain w-full h-full"
          />
        </div>
        <div className="p-2 flex justify-between gap-4">
          <div className="overflow-hidden flex-auto">
            <p className="truncate">{title}</p>
            <p className="truncate text-muted-foreground">{description}</p>
          </div>
          <span className="font-bold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(price)}
          </span>
        </div>
        <div className="p-2 flex justify-between items-center">
          <Button variant={"outline"}>Add to Cart</Button>
          <div className="flex items-center gap-2">
            <span>( {rating.count} )</span>
            <StarRating rating={rating.rate} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Cards;
