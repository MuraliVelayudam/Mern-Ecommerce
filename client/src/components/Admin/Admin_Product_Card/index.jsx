/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";

// REACT ICONS
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {
  delete_Admin_product,
  get_All_Products,
} from "@/store/admin/product_Slice";
import { useToast } from "@/hooks/use-toast";

export default function AdminProductCard({
  eachList,
  setProduct,
  setOpenDialog,
}) {
  const dispatch = useDispatch();
  const { toast } = useToast();

  // EDIT FUNCTION
  const onHandle_EditProduct = () => {
    setProduct(eachList);
    setOpenDialog((prev) => !prev);
  };

  // DELETE PRODUCT FUNCTION
  const onHandle_DeleteProduct = (productId) => {
    dispatch(delete_Admin_product({ productId })).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        dispatch(get_All_Products());
        setProduct("");
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
    <div className="cursor-pointer shadow-2xl shadow-white rounded-2xl w-[240px]">
      <Card className="border border-slate-200 shadow-2xl">
        <CardHeader className="hidden">
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent className="p-0 rounded-t-xl overflow-hidden">
          {/* IMAGE */}
          <div className="relative">
            <img
              src={eachList?.image}
              alt={eachList?.title}
              className="rounded-t-md scale-100 hover:scale-105 transition-all duration-500 ease-in-out h-[250px] w-full object-cover object-top"
            />
            <div className="flex flex-col items-start justify-center absolute top-0 p-3 gap-1">
              <span className="text-white bg-green-600 text-xs px-3 py-1 rounded-full font-heading tracking-wide">
                {eachList?.brand}
              </span>
              <span className="text-white bg-red-600 text-xs px-3 py-1 rounded-full font-heading tracking-wide">
                {eachList?.category}
              </span>
            </div>
          </div>
          <div className="my-3 text-center">
            <p className="text-slate-700 uppercase font-semibold font-heading tracking-widest ">
              {`${
                eachList?.title.length < 15
                  ? `${eachList?.title}`
                  : `${eachList?.title.slice(0, 15) + " . . ."}`
              }`}
            </p>
          </div>
          <div className=" flex items-start gap-1 px-5 flex-col">
            {eachList?.salePrice ? (
              <span
                className={`text-sm ${
                  eachList?.salePrice > 0 ? "line-through" : ""
                }`}
              >
                Sale Price : ${eachList?.salePrice}
              </span>
            ) : null}
            <span className={`font-semibold text-sm`}>
              Price : ${eachList?.price}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between mt-5 px-5">
          <Button
            className="flex items-center gap-1"
            onClick={onHandle_EditProduct}
          >
            <span>
              <MdEdit className="text-green-600" size={20} />
            </span>
            <span>Edit</span>
          </Button>
          <Button
            className="flex items-center gap-2 "
            onClick={() => onHandle_DeleteProduct(eachList?._id)}
          >
            <span>Delete</span>
            <span>
              <MdDelete className="text-red-600" size={20} />
            </span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
