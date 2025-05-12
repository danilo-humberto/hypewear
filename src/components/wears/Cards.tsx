import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import StarRating from "./StarRating";

const Cards = () => {
  return (
    <Card className="shadow-none">
      <CardContent className="w-full">
        <div className="w-full h-[300px]">
          <img
            src="https://images.pexels.com/photos/1311590/pexels-photo-1311590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="rounded-md object-cover w-full h-full"
          />
        </div>
        <div className="p-2 flex justify-between gap-4">
          <div className="overflow-hidden flex-auto">
            <p className="truncate">Title</p>
            <p className="truncate text-muted-foreground">description</p>
          </div>
          <span className="font-bold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(100)}
          </span>
        </div>
        <div className="p-2 flex justify-between">
          <Button variant={"outline"}>Add to Cart</Button>
          <StarRating />
        </div>
      </CardContent>
    </Card>
  );
};

export default Cards;
