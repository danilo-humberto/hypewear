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

const SelectType = () => {
  const [selected, setSelected] = useState("");
  const handleSelectChange = (value: string) => {
    setSelected(value === "clear" ? "" : value);
  };
  return (
    <Select value={selected} onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a type" />
      </SelectTrigger>
      <SelectContent side="left">
        <SelectGroup>
          <SelectLabel>Types</SelectLabel>
          <SelectItem value="Shirt">Shirt</SelectItem>
          <SelectItem value="Legs">Legs</SelectItem>
          <SelectItem value="Men">Men</SelectItem>
          <SelectItem value="Woman">Woman</SelectItem>
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
