import Logo from "./Logo";
import Shop_Navbar from "./Shop_Nav";

// REACT
import { CiShoppingCart } from "react-icons/ci";
import ShopUserInfo from "./Shop_UserInfo";
import ShopSidebar from "./Shop_Sidebar";
import { useSelector } from "react-redux";

export default function ShopHeader() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="border border-b shadow-xl sticky top-0 py-5 flex items-center justify-between lg:px-10 max-lg:px-5">
      <Logo />
      <Shop_Navbar />
      <div className="flex items-center gap-5">
        <div>
          <button>
            <CiShoppingCart size={28} />
          </button>
        </div>
        <div className="lg:hidden block">
          <ShopSidebar user={user} />
        </div>
        <div className="hidden lg:block">
          <ShopUserInfo
            className={"uppercase text-xl rounded-full py-5  font-heading"}
            user={user?.username[0]}
            size={"w-40"}
          />
        </div>
      </div>
    </div>
  );
}
