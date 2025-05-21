import { useAllProductsOrByCategory } from "@/hooks/queries/useProducts";
import Cards from "./ProductCards";
import SelectType from "./SelectType";
import { LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Wears = () => {
  const [selected, setSelected] = useState("");
  const {
    data: products,
    isLoading,
    isError,
  } = useAllProductsOrByCategory(selected);
  const wearsRef = useRef<HTMLDivElement>(null);

  const handleSelectChange = (value: string) => {
    setSelected(value === "All" ? "All" : value);
  };

  useEffect(() => {
    if (!isLoading && selected !== "") {
      wearsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isLoading, selected]);

  return (
    <div
      className="scroll-mt-[100px] w-full px-2 lg:px-10 mb-4 mt-[-24vh] relative z-40"
      ref={wearsRef}
    >
      <div className="bg-background shadow-xl rounded-sm w-full h-auto p-4 relative">
        <div className="flex items-center justify-end mb-8 lg:max-w-[90%] mx-auto">
          <SelectType
            handleSelectChange={handleSelectChange}
            selected={selected}
          />
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-[300px]">
            <LoaderCircle size={30} className="animate-spin" />
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center w-full h-[300px]">
            <p className="text-red-500">
              Error loading products. Please try again later.
            </p>
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(380px,1fr))] justify-center gap-4 lg:max-w-[90%] mx-auto">
            {products?.map((product: React.ComponentProps<typeof Cards>) => (
              <Cards
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                image={product.image}
                category={product.category}
                rating={product.rating}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-[300px]">
            <p className="text-muted-foreground">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wears;
