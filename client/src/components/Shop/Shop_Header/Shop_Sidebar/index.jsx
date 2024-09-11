/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";

import { Button } from "../../../ui/button";
import { Separator } from "../../../ui/separator";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../ui/sheet";

import ShopUserInfo from "../Shop_UserInfo";
import { shopNav_Links } from "@/constants";

import logo from "../../../../assets/logo/logo.png";

// REACT ICONS
import { TiThMenu } from "react-icons/ti";

export default function ShopSidebar({ user }) {
  const { pathname } = useLocation();
  console.log(user);
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <TiThMenu size={22} />
          </Button>
        </SheetTrigger>
        <SheetContent className="space-y-6 " side={"left"}>
          <SheetHeader className="space-y-6">
            <SheetTitle className="flex items-center justify-center w-full">
              <img src={logo} alt="Ecommerce.In" className="w-40" />
            </SheetTitle>
            <Separator />
            <SheetDescription className="hidden"></SheetDescription>
          </SheetHeader>
          <div className="">
            <ul className="flex flex-col items-start justify-start gap-6 ">
              {shopNav_Links.map((eachLink, index) => (
                <li key={index}>
                  <Link
                    className={`font-heading text-slate-500 hover:text-slate-950 transition-all duration-300 ease-in-out ${
                      pathname === eachLink?.path
                        ? "font-semibold text-slate-950"
                        : ""
                    }`}
                    to={eachLink?.path}
                  >
                    {eachLink?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Separator />
          <ShopUserInfo className={"w-full"} user={user?.email} size={"w-64"} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
