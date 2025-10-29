import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCategories } from "@/hooks/queries/useCategories";

type Category = {
  id: string;
  name: string;
};

interface SelectTypeProps {
  selected: string;
  handleSelectChange: (value: string) => void;
}

const SelectType = ({ selected, handleSelectChange }: SelectTypeProps) => {
  const { data: categories, isLoading, isError } = useCategories();

  return (
    <Select value={selected} onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px] capitalize cursor-pointer">
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
        {categories.length === 0 && (
          <>
            <SelectSeparator />
            <SelectGroup>
              <SelectItem value="All" className="capitalize">
                All
              </SelectItem>
            </SelectGroup>
          </>
        )}
      </SelectContent>
    </Select>
  );
};

export default SelectType;
