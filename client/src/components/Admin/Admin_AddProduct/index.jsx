/* eslint-disable react/prop-types */
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
import { useState } from "react";
import FormLoader from "@/components/Form_Loader";

export default function Admin_AddProduct({
  openDialog,
  setOpenDialog,
  product,
  setProduct,
}) {
  const [loadForm, setLoadForm] = useState(false);
  return (
    <div>
      <Sheet open={openDialog} onOpenChange={setOpenDialog}>
        <SheetTrigger asChild>
          <Button
            className="flex items-center gap-2"
            onClick={() => {
              setProduct("");
            }}
          >
            <span className="mb-1">
              <FaPlus size={16} />
            </span>
            <span className="hidden md:block">Add New Product</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="rounded-l-3xl space-y-4 overflow-auto scroll-smooth">
          <SheetHeader>
            <SheetTitle className="font-heading text-center tracking-wide text-3xl uppercase">
              Add New Product
            </SheetTitle>
            <SheetDescription className="hidden"></SheetDescription>
          </SheetHeader>
          <Separator />
          <div>
            {loadForm ? (
              <FormLoader />
            ) : (
              <AddProduct_Form
                setProduct={setProduct}
                setLoadForm={setLoadForm}
                product={product}
                setOpenDialog={setOpenDialog}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
