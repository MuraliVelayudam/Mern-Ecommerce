/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useRef, useState } from "react";

import { Label } from "../ui/label";
import { Input } from "../ui/input";

// REACT ICON
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaFile } from "react-icons/fa";
import { RiFileCloseFill } from "react-icons/ri";
import axios from "axios";

export default function ImageUpload({
  imageFile,
  setImageFile,
  setUploadImageUrl,
  setLoading,
  loading,
  product,
}) {
  const inputRef = useRef();
  const [imageError, SetImageError] = useState("");

  const URL = import.meta.env.VITE_URL;

  //   IMAGE UPLOAD
  const onHandle_ImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.includes("image")) {
      setImageFile(selectedFile);
      SetImageError("");
    } else {
      console.log();
      SetImageError("Please Upload only image Only");
    }
  };

  const onHandle_DragFile = (event) => {
    event.preventDefault();
  };

  const onHandle_DropFile = (event) => {
    event.preventDefault();
    const dropFile = event.dataTransfer.files[0];
    if (dropFile && dropFile.type.includes("image")) {
      setImageFile(dropFile);
    } else {
      SetImageError("Please Upload only image Only");
    }
  };

  //   REMOVE IMAGE
  const onHandle_RemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setUploadImageUrl("");
  };

  // IMAGE UPLOAD ACTION
  const onHandle_Product_Image_Upload = async () => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append("my_image", imageFile);
      const response = await axios.post(
        `${URL}/api/admin/product/upload_image`,
        data
      );

      if (response?.data?.success) {
        setUploadImageUrl(response?.data?.result?.url);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (imageFile !== null) onHandle_Product_Image_Upload();
  }, [imageFile]);

  return (
    <div
      onDragOver={onHandle_DragFile}
      onDrop={onHandle_DropFile}
      className="h-36 mb-5"
    >
      <Input
        id="image_upload"
        type="file"
        ref={inputRef}
        onChange={onHandle_ImageUpload}
        className="hidden"
        disabled={product}
      />
      <div className="flex items-center justify-center">
        {!imageFile ? (
          <Label
            htmlFor="image_upload"
            className={`capitalize text-sm   text-center flex flex-col items-center justify-center border-2 border-dashed w-full rounded-xl pt-10
              ${product ? "bg-black/5" : ""}
              ${imageError ? "text-[#EF4444]" : ""}`}
          >
            Drag and Drop Or Click to Upload Product Image
            <span>
              <IoCloudUploadOutline
                size={36}
                className="text-slate-500 animate-pulse my-4"
              />
            </span>
          </Label>
        ) : (
          <div className="flex items-center justify-center gap-4 border-2 border-dashed w-full h-36 px-5 rounded-xl">
            <div>
              <FaFile size={30} className="text-green-600" />
            </div>
            <div className="w-full">
              <p className="text-sm">
                {imageFile?.name.slice(0, 22) + " . . ."}
              </p>
            </div>
            <div>
              <button
                className="flex flex-col items-center "
                type="button"
                onClick={onHandle_RemoveImage}
                disabled={loading}
              >
                <RiFileCloseFill
                  size={30}
                  className={`${
                    loading ? "text-slate-300 animate-pulse" : "text-[#EF4444]"
                  }`}
                />
                <span className="text-xs">Remove</span>
              </button>
            </div>
          </div>
        )}
      </div>
      <p className="text-[#EF4444] font-[500] text-[12.8px] capitalize text-center py-2">
        {imageError}
      </p>
    </div>
  );
}
