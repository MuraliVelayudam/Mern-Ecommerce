import { Outlet } from "react-router-dom";
import ShopHeader from "../Shop_Header";

export default function ShopLayout() {
  return (
    <div>
      <ShopHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
