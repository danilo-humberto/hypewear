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

interface SelectTypeProps {
  selected: string;
  handleSelectChange: (value: string) => void;
}

const SelectType = ({ selected, handleSelectChange }: SelectTypeProps) => {
  const { data: categories, isLoading, isError } = useCategories();

  return (
    <Select value={selected} onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px] capitalize cursor-pointer">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent side="bottom" position="popper" avoidCollisions={false}>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {isLoading ? (
            <SelectItem disabled value="loading">
              Loading...
            </SelectItem>
          ) : isError ? (
            <SelectItem disabled value="error">
              Error loading categories
            </SelectItem>
          ) : categories ? (
            categories?.map((category: string, index: number) => (
              <SelectItem key={index} value={category} className="capitalize">
                {category}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="No categories">No categories</SelectItem>
          )}
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectItem value="All" className="capitalize">
            All
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectType;
