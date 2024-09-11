/* eslint-disable react/prop-types */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";

import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";
import { brandOptions, categoryOptions } from "@/constants";

import ImageUpload from "@/components/ImageUpload";
import FormLoader from "@/components/Form_Loader";

import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  add_Admin_Product,
  get_All_Products,
  update_Admin_Product,
} from "@/store/admin/product_Slice";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title Min 2 Characters Required" })
    .max(1500),
  description: z
    .string()
    .min(2, { message: "Description Min 2 Characters Required" })
    .max(5000),
  category: z.string().min(1, { message: "Please Select One Category" }),
  brand: z.string().min(1, { message: "Please Select One Category" }),
  price: z.coerce.number().min(1, { message: "Please Enter Min Price" }),
  salePrice: z.coerce.number(),
  totalStock: z.coerce.number().min(0, { message: "Please Enter Total Stock" }),
});

export default function AddProduct_Form({
  setLoadForm,
  product,
  setOpenDialog,
  setProduct,
}) {
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: product?.title || "",
      description: product?.description || "",
      category: product?.category || "",
      brand: product?.brand || "",
      price: product?.price || "",
      salePrice: product?.salePrice || "",
      totalStock: product?.totalStock || "",
    },
  });

  function onSubmit(values) {
    const formData = { ...values, image: uploadImageUrl };
    setLoadForm((prev) => !prev);
    const productId = product?._id;
    product
      ? dispatch(update_Admin_Product({ formData, productId })).then((data) => {
          if (data?.payload?.success) {
            setLoadForm((prev) => !prev);
            toast({
              title: data?.payload?.message,
            });
            form.reset();
            dispatch(get_All_Products());
            setOpenDialog((prev) => !prev);
            setProduct("");
          } else {
            toast({
              title: data?.payload?.message,
              description: "Please Try Again.",
              variant: "destructive",
            });
            setLoadForm((prev) => {
              !prev;
              setProduct("");
            });
          }
        })
      : dispatch(add_Admin_Product(formData)).then((data) => {
          if (data?.payload?.success) {
            setImageFile(null);
            setUploadImageUrl("");
            dispatch(get_All_Products());
            form.reset();
            setProduct("");
            toast({
              title: data?.payload?.message,
            });
            setLoadForm((prev) => !prev);
            setOpenDialog((prev) => !prev);
          } else {
            toast({
              title: data?.payload?.message,
              description: "Please Try Again.",
              variant: "destructive",
            });
            setLoadForm((prev) => !prev);
          }
        });
  }

  return (
    <div className="overflow-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* IMAGE UPLOAD */}
          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadImageUrl={uploadImageUrl}
            setUploadImageUrl={setUploadImageUrl}
            setLoading={setLoading}
            loading={loading}
            product={product}
          />
          {loading ? (
            <FormLoader />
          ) : (
            <div className="space-y-4">
              {/* TITLE */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Product Title . . ."
                        {...field}
                        disabled={product ? false : !uploadImageUrl}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* DESCRIPTION */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Product Description . . ."
                        disabled={product ? false : !uploadImageUrl}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* SELECT CATEGORY OPTIONS */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={product ? false : !uploadImageUrl}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Category . . ." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryOptions?.map((eachCategory) => (
                          <SelectItem
                            value={eachCategory?.label}
                            key={eachCategory?.id}
                          >
                            {eachCategory?.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* SELECT BRAND OPTIONS */}
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={product ? false : !uploadImageUrl}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Brand . . ." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {brandOptions?.map((eachCategory) => (
                          <SelectItem
                            value={eachCategory?.label}
                            key={eachCategory?.id}
                          >
                            {eachCategory?.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PRICE */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Product Price . . ."
                        disabled={product ? false : !uploadImageUrl}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*SALE PRICE */}
              <FormField
                control={form.control}
                name="salePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sale Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Product Price . . .(Optional)"
                        disabled={product ? false : !uploadImageUrl}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*TOTAL STOCK */}
              <FormField
                control={form.control}
                name="totalStock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="Enter Total Stock . . ."
                        disabled={product ? false : !uploadImageUrl}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={product ? false : !uploadImageUrl}
                >
                  Add New Product
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
