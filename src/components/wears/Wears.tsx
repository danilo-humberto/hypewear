import { useProducts } from "@/hooks/queries/useProducts";
import Cards from "./Cards";
import SelectType from "./SelectType";

const Wears = () => {
  const { data: products } = useProducts();

  return (
    <div className="absolute top-[75%] w-full px-2 lg:px-10 mb-4 z-40">
      <div className="bg-background shadow-xl rounded-sm w-full h-auto p-4 relative">
        <div className="flex items-center justify-end mb-8 lg:max-w-[90%] mx-auto">
          <SelectType />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(380px,1fr))] justify-center gap-4 lg:max-w-[90%] mx-auto">
          {products?.map((product: React.ComponentProps<typeof Cards>) => (
            <Cards
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              image={product.image}
              rating={product.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wears;
