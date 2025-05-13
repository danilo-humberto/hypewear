import { useState } from "react";
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

const SelectType = () => {
  const [selected, setSelected] = useState("");
  const handleSelectChange = (value: string) => {
    setSelected(value === "clear" ? "" : value);
  };

  const { data: categories } = useCategories();

  return (
    <Select value={selected} onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent side="left">
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {categories ? (
            categories?.map((category: string, index: number) => (
              <SelectItem key={index} value={category}>
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
