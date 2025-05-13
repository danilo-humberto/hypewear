import FlashSaleSwiper from "../FlashSaleSwiper";

const FashionShowCase = () => {
  return (
    <div className="w-full">
      <FlashSaleSwiper
        absolute={false}
        background={"bg-foreground"}
        textColor={"text-background"}
      />
    </div>
  );
};

export default FashionShowCase;
