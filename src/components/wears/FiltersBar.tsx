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

type FiltersBarProps = {
  value: {
    name?: string;
    nameCategory?: string;
    precoMin?: number;
    precoMax?: number;
  };
  onChange: (value: FiltersBarProps["value"]) => void;
};

type Category = {
  id: string;
  name: string;
};

const FiltersBar = ({ value, onChange }: FiltersBarProps) => {
  const { data: categories, isLoading, isError } = useCategories();

  const [search, setSearch] = useState(value.name ?? "");

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
  return (
    <>
      <input
        type="text"
        placeholder="Pesquisar..."
        className="bg-input/30 border-input border rounded-sm outline-none text-foreground px-3 py-2 w-full lg:w-md placeholder:text-muted-foreground text-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex items-center gap-2 lg:gap-4">
        <input
          type="number"
          inputMode="decimal"
          placeholder="Preço mín."
          className="bg-input/30 border-input border rounded-sm outline-none text-foreground px-3 py-2 w-full placeholder:text-muted-foreground text-sm"
          value={value.precoMin ?? ""}
          onChange={(e) => {
            onChange({
              ...value,
              precoMin: e.target.value ? Number(e.target.value) : undefined,
            });
          }}
        />
        <input
          type="number"
          inputMode="decimal"
          placeholder="Preço máx."
          className="bg-input/30 border-input border rounded-sm outline-none text-foreground px-3 py-2 w-full placeholder:text-muted-foreground text-sm"
          value={value.precoMax ?? ""}
          onChange={(e) => {
            onChange({
              ...value,
              precoMax: e.target.value ? Number(e.target.value) : undefined,
            });
          }}
        />
      </div>

      <Select value={value.nameCategory ?? ""} onValueChange={handleCategory}>
        <SelectTrigger className="w-full lg:w-[180px] capitalize cursor-pointer">
          <SelectValue placeholder="Categorias" />
        </SelectTrigger>
        <SelectContent side="bottom" position="popper" avoidCollisions={false}>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
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
                Nenhuma categoria encontrada
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        variant="secondary"
        className="w-full lg:w-fit"
        onClick={clearAll}
      >
        Limpar
      </Button>
    </>
  );
};

export default FiltersBar;
