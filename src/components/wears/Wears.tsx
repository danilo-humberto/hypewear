import Cards from "./Cards";
import SelectType from "./SelectType";

const Wears = () => {
  return (
    <div className="absolute top-[75%] w-full px-2 lg:px-10 mb-4 z-40">
      <div className="bg-background shadow-xl rounded-sm w-full h-auto p-4 relative">
        <div className="flex items-center justify-end mb-4">
          <SelectType />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <Cards />
        </div>
      </div>
    </div>
  );
};

export default Wears;
