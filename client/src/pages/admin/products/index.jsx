import Admin_AddProduct from "@/components/Admin/Admin_AddProduct";
import AdminProductCard from "@/components/Admin/Admin_Product_Card";
import { get_All_Products } from "@/store/admin/product_Slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AdminProducts() {
  const [product, setProduct] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const { productList } = useSelector((state) => state.adminProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_All_Products());
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-end sticky top-5 z-50">
        <Admin_AddProduct
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          product={product}
          setProduct={setProduct}
        />
      </div>

      {productList && productList.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-4 max-lg:items-center max-lg:justify-center">
          {productList.length > 0 &&
            productList?.map((eachList, index) => (
              <AdminProductCard
                eachList={eachList}
                key={index}
                setProduct={setProduct}
                product={product}
                setOpenDialog={setOpenDialog}
              />
            ))}
        </div>
      ) : (
        <div className="h-[50vh] flex items-center justify-center">
          <h1 className="font-heading text-2xl text-slate-600">
            Add Products to Show !
          </h1>
        </div>
      )}
    </div>
  );
}
