import { Button } from "../../ui/button";

// REACT ICON
import { FiLogOut } from "react-icons/fi";
import MobileSidebar from "./sidebar_Mobile";
import { useDispatch } from "react-redux";
import { user_SignOut_Action } from "@/store/auth_Slice";
import { useToast } from "@/hooks/use-toast";

export default function AdminHeader() {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const onHandle_Signout_Admin = () => {
    dispatch(user_SignOut_Action()).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          description: "Please Try Again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <header className="border border-slate-200 shadow-2xl flex items-center justify-between m-2 p-5 rounded-xl">
      <div className="lg:hidden">
        <MobileSidebar />
      </div>
      <div className="flex flex-1 justify-end">
        <Button
          className="inline-flex items-center gap-2"
          onClick={onHandle_Signout_Admin}
        >
          <span className="max-md:hidden">Sign Out</span>
          <span>
            <FiLogOut />
          </span>
        </Button>
      </div>
    </header>
  );
}
