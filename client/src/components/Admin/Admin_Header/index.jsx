import { Button } from "../../ui/button";

// REACT ICON
import { FiLogOut } from "react-icons/fi";
import MobileSidebar from "./sidebar_Mobile";

export default function AdminHeader() {
  return (
    <header className="border border-slate-200 shadow-2xl flex items-center justify-between m-2 p-5 rounded-xl">
      <div className="lg:hidden">
        <MobileSidebar />
      </div>
      <div className="flex flex-1 justify-end">
        <Button className="inline-flex items-center gap-2">
          <span className="max-md:hidden">Sign Out</span>
          <span>
            <FiLogOut />
          </span>
        </Button>
      </div>
    </header>
  );
}
