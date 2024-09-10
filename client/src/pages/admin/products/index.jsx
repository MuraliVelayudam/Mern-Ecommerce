import Admin_AddProduct from "@/components/Admin/Admin_AddProduct";
import { get_All_Products } from "@/store/admin/product_Slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AdminProducts() {
  const { productList } = useSelector((state) => state.adminProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_All_Products());
  }, [dispatch]);

  console.log(productList);

  return (
    <div>
      <div className="flex justify-end">
        <Admin_AddProduct />
      </div>
    </div>
  );
}
