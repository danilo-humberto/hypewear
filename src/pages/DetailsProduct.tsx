import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

const DetailsProduct = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="mt-20 mx-auto md:w-[60%] lg:w-[90%] p-4">
      <div className="flex gap-2 text-sm text-muted-foreground pb-4">
        <span>Home</span>
        <span>&gt;</span>
        <span>Produto 1</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="px-6 max-w-full max-h-[550px]">
          <img
            src="https://rlv.zcache.com.br/camisa_preta-r9f347889c63b4f90bf692b056beaf6e2_k2gm8_644.webp"
            alt="imagem de camisa"
            className="rounded-sm brightness-75 w-full h-full object-cover object-center shadow-sm"
          ></img>
        </div>
        <div className="py-2 flex flex-col gap-3">
          <span className="text-sm text-muted-foreground">Categoria</span>
          <h2 className="font-bold text-3xl lg:text-4xl">
            Camisa Preta Básica
          </h2>
          <div className="text-justify leading-relaxed tracking-wider text-sm">
            <p
              className={`${
                expanded ? "" : "line-clamp-3"
              } transition-all duration-300 ease-in-out`}
            >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta
              laboriosam aut inventore sunt blanditiis dignissimos quaerat
              repellendus, fuga accusamus quod mollitia, unde ducimus reiciendis
              non? Totam, reiciendis? Neque, sunt voluptate! Alias, distinctio
              labore. Maiores voluptatibus molestias quidem a, deleniti incidunt
              numquam nobis aliquam minima? Provident quos tempora repudiandae
              eum delectus odit, voluptate sequi in necessitatibus suscipit rem!
              Ducimus, voluptates debitis!
            </p>
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-yellow-600 font-medium hover:underline cursor-pointer"
            >
              {expanded ? "Ler menos ..." : "Ler mais ..."}
            </button>
          </div>
          <Separator />
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="font-bold text-2xl">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(99)}
              </span>
              <span className="text-sm text-muted-foreground">/un</span>
            </div>
            <Button>
              <ShoppingCart />
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsProduct;
