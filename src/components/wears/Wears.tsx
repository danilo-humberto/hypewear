import Cards from "./Cards";

const Wears = () => {
  return (
    <div className="absolute top-[85%] w-full px-2 lg:px-10 mb-4">
      <div className="bg-background shadow-xl rounded-sm w-full h-auto p-4 relative grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </div>
    </div>
  );
};

export default Wears;
