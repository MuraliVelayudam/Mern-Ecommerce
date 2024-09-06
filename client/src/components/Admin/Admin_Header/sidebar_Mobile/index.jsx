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

import { admin_Sidebar_Nav } from "@/constants";

// REACT ICON
import { IoAnalyticsSharp } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import { useState } from "react";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const onHandleSidebar = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button className="flex items-center gap-1">
            <span>
              <TiThMenu size={20} />
            </span>
            <span>Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side={"bottom"} className="rounded-t-3xl space-y-5">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-center mt-8 gap-4">
              <span>
                <IoAnalyticsSharp size={42} />
              </span>
              <span className="font-heading font-bold uppercase text-2xl">
                Admin Panel
              </span>
            </SheetTitle>
            <SheetDescription className="hidden"></SheetDescription>
          </SheetHeader>
          <Separator />
          <div className="my-10">
            <ul className="flex flex-col gap-1   text-center md:w-3/4 mx-auto">
              {admin_Sidebar_Nav?.map((eachLink, index) => (
                <li key={index} className="mt-2">
                  <Link
                    onClick={onHandleSidebar}
                    to={eachLink?.link}
                    className={`inline-block w-full transition-all duration-200 ease-linear text-sm border border-slate-50 ${
                      pathname === eachLink?.link
                        ? "bg-black text-white px-4 py-3 rounded-xl shadow-2xl shadow-slate-600"
                        : "bg-white text-black px-4 py-3 rounded-xl shadow-xl"
                    }`}
                  >
                    <span>{eachLink?.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
