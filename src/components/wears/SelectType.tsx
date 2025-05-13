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
  const { data: categories } = useCategories();

  return (
    <Select value={selected} onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px] capitalize">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent side="left">
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value="all" className="capitalize">
            all
          </SelectItem>
          {categories ? (
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
          <SelectItem value="clear">Clear</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectType;
