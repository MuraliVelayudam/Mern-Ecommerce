import ShopProductFilter from "@/components/Shop/Shop_Product_Filter";
import ShopProductListing from "@/components/Shop/Shop_Products_Listing";

export default function Listing() {
  return (
    <div className="flex max-md:flex-col h-[100svh]">
      <ShopProductFilter />
      <div className="flex-1">
        <ShopProductListing />
      </div>
    </div>
  );
}
