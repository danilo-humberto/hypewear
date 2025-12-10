import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import type { Category } from "./FiltersBar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { getClientData } from "@/utils/storage";
import type { Product } from "@/types/product";
import { toast } from "sonner";
import { addCategory } from "@/api/categories.endpoint";
import { useAddProduct } from "@/hooks/queries/useProducts";

interface AddProductDialogProps {
  isLoading: boolean;
  isError: boolean;
  categories: Category[];
  onCategoryCreated?: () => void;
  onOpenChange: (open: boolean) => void;
}

const AddProductDialog = ({
  isLoading,
  isError,
  categories,
  onCategoryCreated,
  onOpenChange,
}: AddProductDialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [estoque, setEstoque] = useState("");
  const [image, setImage] = useState("");
  const [nameCategory, setNameCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);

  const { mutateAsync: createProduct, isPending } = useAddProduct();

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !description.trim() ||
      !price.trim() ||
      !estoque.trim() ||
      !image.trim() ||
      !categoryId.trim()
    ) {
      setErrorMessage("Preencha todos os campos!");
      return;
    }

    const priceNumber = Number(price.replace(",", "."));
    const estoqueNumber = Number(estoque);

    if (isNaN(priceNumber) || isNaN(estoqueNumber)) {
      setErrorMessage("Preço e estoque devem ser numéricos!");
      return;
    }

    if (priceNumber <= 0 || estoqueNumber <= 0) {
      setErrorMessage("Preço e estoque devem ser maiores que zero!");
      return;
    }

    const token = getClientData("client")?.access_token;
    if (!token) throw new Error("Login necesario.");

    const payload: Product = {
      name,
      description,
      price: priceNumber,
      estoque: estoqueNumber,
      status: isActive ? "ATIVO" : "INATIVO",
      imagem: image,
      categoryId,
    };

    try {
      await createProduct(payload);
      setName("");
      setDescription("");
      setPrice("");
      setEstoque("");
      setImage("");
      setNameCategory("");
      setCategoryId("");
      setIsActive(true);
      onOpenChange(false);
      toast.success("Produto adicionado com sucesso!");
    } catch (err: any) {
      console.error(err);
      toast.error("Erro ao adicionar produto.");
    }
  };

  return (
    <DialogContent>
      <DialogHeader>Adicionar Produto</DialogHeader>
      <DialogDescription>
        Preencha os campos abaixo para adicionar um novo produto!
      </DialogDescription>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-base md:text-sm">
          Nome
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="border-input border rounded-sm p-3 text-sm outline-border bg-background/30"
          value={name.toLocaleLowerCase()}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-base md:text-sm">
          Descrição
        </label>
        <textarea
          name="description"
          id="description"
          className="border-input border rounded-sm p-3 text-sm outline-border bg-background/30"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="price" className="text-base md:text-sm">
            Preço
          </label>
          <input
            type="text"
            name="price"
            id="price"
            className="border-input border rounded-sm p-3 text-sm outline-border bg-background/30"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="estoque" className="text-base md:text-sm">
            Quantidade em Estoque
          </label>
          <input
            type="text"
            name="estoque"
            id="estoque"
            className="border-input border rounded-sm p-3 text-sm outline-border bg-background/30"
            value={estoque}
            onChange={(e) => setEstoque(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label>Categoria</label>
        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger
            className="w-full capitalize cursor-pointer bg-transparent dark:hover:bg-transparent"
            size="lg"
          >
            <SelectValue placeholder="Categorias" />
          </SelectTrigger>
          <SelectContent
            side="bottom"
            position="popper"
            avoidCollisions={false}
          >
            <SelectGroup>
              <SelectLabel>Categorias</SelectLabel>
              {isLoading && (
                <SelectItem disabled value="loading">
                  Carregando...
                </SelectItem>
              )}
              {!isLoading && !isError && categories.length > 0 ? (
                categories.map((category: Category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                    className="capitalize"
                  >
                    {category.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled value="empty">
                  {!isLoading ? "Nenhuma categoria" : "..."}
                </SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Checkbox
            id="checkbox"
            checked={isActive}
            onCheckedChange={(checked) => {
              setIsActive(checked === true);
            }}
          />
          <Label htmlFor="checkbox">Ativo</Label>
        </div>
        <Dialog open={openCategoryDialog} onOpenChange={setOpenCategoryDialog}>
          <DialogTrigger asChild>
            <Button size={"sm"} onClick={() => setOpenCategoryDialog(true)}>
              Adicionar Categoria
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Adicionar Categoria</DialogHeader>
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                if (!nameCategory.trim()) {
                  toast.error("Preencha o nome da categoria!");
                  return;
                }

                const token = getClientData("client")?.access_token;
                if (!token) throw new Error("Login necesario.");

                try {
                  await addCategory(nameCategory, token);
                  setNameCategory("");
                  setOpenCategoryDialog(false);
                  onCategoryCreated?.();
                  toast.success("Categoria adicionada com sucesso!");
                } catch (err: any) {
                  console.error(err);
                  toast.error("Erro ao adicionar categoria.");
                }
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="nameCategory">Nome</label>
                <input
                  type="text"
                  name="nameCategory"
                  id="nameCategory"
                  className="border-input border rounded-sm p-3 text-sm outline-border bg-background/30 w-full"
                  value={nameCategory.toLocaleLowerCase()}
                  onChange={(e) => setNameCategory(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Adicionar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="image" className="text-base md:text-sm">
          URL da Imagem
        </label>
        <input
          type="text"
          name="image"
          id="image"
          className="border-input border rounded-sm p-3 text-sm outline-border bg-background/30"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}
      <DialogFooter>
        <Button type="button" onClick={handleSubmitProduct}>
          {isPending ? "Adicionando..." : "Adicionar"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AddProductDialog;
