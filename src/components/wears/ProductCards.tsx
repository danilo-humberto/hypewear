import { Card, CardContent } from "../ui/card";
import { Link } from "react-router-dom";

interface CardsProps {
  id: number;
  name: string;
  description: string;
  price: number;
  imagem: string;
  category: {
    name: string;
  };
}

const Cards = ({ name, description, price, imagem, id }: CardsProps) => {
  return (
    <Card className="shadow-none">
      <CardContent className="w-full px-2">
        <div className="w-full h-[300px]">
          <img
            src={imagem}
            alt={name}
            className="rounded-md object-contain w-full h-full"
          />
        </div>
        <div className="p-2 flex justify-between gap-4">
          <div className="overflow-hidden flex-auto">
            <p className="truncate">{name}</p>
            <p className="truncate text-muted-foreground pt-2">{description}</p>
          </div>
          <span className="font-bold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "BRL",
            }).format(price)}
          </span>
        </div>
        <div className="px-2 flex justify-between items-center">
          <Link
            to={`/product/${id}`}
            className="w-full bg-accent p-2 text-center rounded-sm text-foreground hover:bg-accent/80 transition-all duration-300"
          >
            Saber mais
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default Cards;
