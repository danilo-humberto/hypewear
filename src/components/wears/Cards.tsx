const Cards = () => {
  return (
    <div>
      <img
        src="https://images.pexels.com/photos/1261422/pexels-photo-1261422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        className="rounded-sm object-cover object-center w-full h-auto sm:h-[400px] lg:h-[500px]"
      />
      <div className="p-1">
        <p className="text-ellipsis w-full overflow-hidden capitalize">
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </p>
        <span className="font-bold">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(10)}
        </span>
      </div>
    </div>
  );
};

export default Cards;
