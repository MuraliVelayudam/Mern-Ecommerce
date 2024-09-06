import { Button } from "../../ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";

import { Separator } from "../../ui/separator";

// REACT ICON
import { FaPlus } from "react-icons/fa6";
import AddProduct_Form from "./Admin_AddProduct_Form";

export default function Admin_AddProduct() {
  return (
    <div className="">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="flex items-center gap-2">
            <span className="mb-1">
              <FaPlus size={16} />
            </span>
            <span className="hidden md:block">Add New Product</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="rounded-l-3xl space-y-8">
          <SheetHeader>
            <SheetTitle className="font-heading text-center tracking-wide">
              Add New Product
            </SheetTitle>
            <SheetDescription className="hidden"></SheetDescription>
          </SheetHeader>
          <Separator />
          <div>
            <AddProduct_Form />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
