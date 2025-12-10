import { useCategories } from "@/hooks/queries/useCategories";
import { useEffect, useState } from "react";
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
import { Search } from "lucide-react";
import { getClientData } from "@/utils/storage";
import { Dialog, DialogTrigger } from "../ui/dialog";
import AddProductDialog from "./AddProductDialog";

type FiltersBarProps = {
  value: {
    name?: string;
    nameCategory?: string;
    precoMin?: number;
    precoMax?: number;
  };
  onChange: (value: FiltersBarProps["value"]) => void;
};

export type Category = {
  id: string;
  name: string;
};

const FiltersBar = ({ value, onChange }: FiltersBarProps) => {
  const {
    data: categories = [],
    isLoading,
    isError,
    refetch,
  } = useCategories();
  const user = getClientData("client");

  const [search, setSearch] = useState(value.name ?? "");
  const [openProductDialog, setOpenProductDialog] = useState(false);

  useEffect(() => {
    setSearch(value.name ?? "");
  }, [value.name]);

  useEffect(() => {
    const timeout = setTimeout(
      () => onChange({ ...value, name: search || undefined }),
      400
    );
    return () => clearTimeout(timeout);
  }, [search]);

  const handleCategory = (category: string) => {
    onChange({ ...value, nameCategory: category || undefined });
  };

  const clearAll = () => {
    setSearch("");
    onChange({
      name: undefined,
      nameCategory: undefined,
      precoMin: undefined,
      precoMax: undefined,
    });
  };

  const selectedCategoryValue = categories.find(
    (c: Category) => c.name.toLowerCase() === value.nameCategory?.toLowerCase()
  )?.name;

  return (
    <div className="flex flex-col lg:flex-row gap-3 w-full justify-between">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="relative w-full lg:w-md">
          <input
            type="text"
            placeholder="Pesquisar..."
            className="bg-input/30 border-input border rounded-md outline-none text-foreground pl-3 pr-8 py-2 w-full placeholder:text-muted-foreground text-sm transition-all focus:border-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground opacity-50" />
        </div>
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <input
            type="number"
            inputMode="decimal"
            placeholder="R$ Mín"
            className="bg-input/30 border-input border rounded-md outline-none text-foreground px-3 py-2 w-full lg:w-24 placeholder:text-muted-foreground text-sm focus:border-primary"
            value={value.precoMin ?? ""}
            onChange={(e) => {
              onChange({
                ...value,
                precoMin: e.target.value ? Number(e.target.value) : undefined,
              });
            }}
          />
          <span className="text-muted-foreground">-</span>
          <input
            type="number"
            inputMode="decimal"
            placeholder="R$ Máx"
            className="bg-input/30 border-input border rounded-md outline-none text-foreground px-3 py-2 w-full lg:w-24 placeholder:text-muted-foreground text-sm focus:border-primary"
            value={value.precoMax ?? ""}
            onChange={(e) => {
              onChange({
                ...value,
                precoMax: e.target.value ? Number(e.target.value) : undefined,
              });
            }}
          />
        </div>
        <Select
          value={selectedCategoryValue ?? ""}
          onValueChange={handleCategory}
        >
          <SelectTrigger className="w-full lg:w-[180px] capitalize cursor-pointer">
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
                    value={category.name}
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
        <Button
          variant="secondary"
          size="icon"
          className="w-full lg:w-fit px-3 text-muted-foreground"
          onClick={clearAll}
          title="Limpar filtros"
        >
          Limpar Filtros
        </Button>
      </div>

      {user?.client?.role === "ADMIN" && (
        <Dialog open={openProductDialog} onOpenChange={setOpenProductDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => setOpenProductDialog(true)}>
              Adicionar Produto
            </Button>
          </DialogTrigger>
          <AddProductDialog
            categories={categories}
            isLoading={isLoading}
            isError={isError}
            onCategoryCreated={refetch}
            onOpenChange={setOpenProductDialog}
          />
        </Dialog>
      )}
    </div>
  );
};

export default FiltersBar;
