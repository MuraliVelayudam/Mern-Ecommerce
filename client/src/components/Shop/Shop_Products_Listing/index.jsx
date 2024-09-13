import { Separator } from "../../ui/separator";
import ShopProductTile from "../Shop_Product_Tile";
import ShopProductSort from "../Shop_Sort_Products";

export default function ShopProductListing() {
  return (
    <div className="p-5 space-y-5">
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className="text-2xl font-heading">All Products</h1>
        </div>
        <div className="flex items-center gap-4">
          <div>13 Total Products</div>
          <div>
            <ShopProductSort />
          </div>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-5 gap-5">
        <ShopProductTile />
        <ShopProductTile />
        <ShopProductTile />
        <ShopProductTile />
        <ShopProductTile />
        <ShopProductTile />
      </div>
    </div>
  );
}
