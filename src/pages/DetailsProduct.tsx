import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useProductById } from "@/hooks/queries/useProducts";
import { useCart } from "@/hooks/useCart";
import { Loader2, ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailsProduct = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const { data, isLoading, isError } = useProductById(id!);

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="mt-20 mx-auto md:w-[60%] lg:w-[90%] p-4">
      {isLoading && (
        <div className="w-full flex justify-center mt-4">
          <Loader2 className="animate-spin" />
        </div>
      )}

      {isError && (
        <div className="w-full flex justify-center mt-4">
          <p className="text-red-400">Erro ao carregar o produto</p>
        </div>
      )}

      {!isLoading && !isError && data && (
        <>
          <div className="flex gap-2 text-sm text-muted-foreground pb-4">
            <span>Home</span>
            <span>&gt;</span>
            <span>{data?.name}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div className="px-6 max-w-full max-h-[550px]">
              <img
                src={data?.imagem}
                alt={data?.name}
                className="rounded-sm brightness-90 w-full h-full object-cover object-center shadow-sm"
              ></img>
            </div>
            <div className="py-2 flex flex-col gap-3">
              <span className="text-sm text-muted-foreground">
                {data?.category?.name}
              </span>
              <h2 className="font-bold text-3xl lg:text-4xl">{data?.name}</h2>
              <p className="text-justify leading-relaxed tracking-wider text-sm">
                {data?.description}
              </p>
              <Separator />
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="font-bold text-2xl">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(data?.price!)}
                  </span>
                  <span className="text-sm text-muted-foreground">/un</span>
                </div>
                <Button onClick={() => addToCart(id!)}>
                  <ShoppingCart />
                  Adicionar ao Carrinho
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailsProduct;
