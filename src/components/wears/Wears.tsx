import { useAllProductsOrByCategory } from "@/hooks/queries/useProducts";
import Cards from "./Cards";
import SelectType from "./SelectType";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const Wears = () => {
  const [selected, setSelected] = useState("all");
  const { data: products, isLoading } = useAllProductsOrByCategory(selected);

  const handleSelectChange = (value: string) => {
    setSelected(value === "clear" ? "" : value);
  };

  return (
    <div className="w-full px-2 lg:px-10 mb-4 z-40 mt-[-13rem]">
      <div className="bg-background shadow-xl rounded-sm w-full h-auto p-4 relative">
        <div className="flex items-center justify-end mb-8 lg:max-w-[90%] mx-auto">
          <SelectType
            key={selected}
            handleSelectChange={handleSelectChange}
            selected={selected}
          />
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <LoaderCircle size={30} className="animate-spin" />
          </div>
        ) : products ? (
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
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-muted-foreground">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wears;
