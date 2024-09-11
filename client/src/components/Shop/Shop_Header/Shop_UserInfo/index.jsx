/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Button } from "../../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";

// REACT ICONS
import { CiUser } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { user_SignOut_Action } from "@/store/auth_Slice";
import { useToast } from "@/hooks/use-toast";

export default function ShopUserInfo({ className, user, size }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  //HANDLE USER ACCOUNT
  const onHandle_User_Account = () => {
    navigate("/shop/account");
  };

  // HANDLE USER LOGOUT
  const onHandle_User_Logout = () => {
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
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className={className}>{user}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={size}>
          <DropdownMenuLabel className="text-center">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={onHandle_User_Account}
              className="cursor-pointer"
            >
              Profile
              <DropdownMenuShortcut>
                <CiUser size={22} className="text-black" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Button className="w-full" onClick={onHandle_User_Logout}>
              SignOut
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
