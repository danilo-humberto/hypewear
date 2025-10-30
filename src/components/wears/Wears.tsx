import { useProducts } from "@/hooks/queries/useProducts";
import Cards from "./ProductCards";
import { LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FiltersBar from "./FiltersBar";
import type { ProductFilters } from "@/types/productFilters";

const Wears = () => {
  const [filters, setFilters] = useState<ProductFilters>({});
  const { data: products, isLoading, isError } = useProducts(filters);
  const wearsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && filters.nameCategory !== "") {
      wearsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isLoading, filters.nameCategory]);

  return (
    <div
      className="scroll-mt-[100px] w-full px-2 lg:px-10 mb-4 mt-[-24vh] relative z-40"
      ref={wearsRef}
    >
      <div className="bg-background shadow-xl rounded-sm w-full h-auto p-4 relative">
        <div className="flex flex-col lg:flex-row items-center mt-4 mb-6 lg:max-w-[90%] mx-auto gap-4">
          <FiltersBar value={filters} onChange={setFilters} />
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-[300px]">
            <LoaderCircle size={30} className="animate-spin" />
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center w-full h-[300px]">
            <p className="text-red-500">
              Erro ao carregar os produtos. Tente novamente mais tarde!
            </p>
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(380px,1fr))] justify-center gap-4 lg:max-w-[90%] mx-auto">
            {products?.map((product: React.ComponentProps<typeof Cards>) => (
              <Cards
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                imagem={product.imagem}
                category={product.category}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-[300px]">
            <p className="text-muted-foreground">Nenhum Produto Encontrado!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wears;
