import React, { useEffect, useRef } from "react";
import { Label } from "../UI/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../UI/button";
import axios from "axios";
import { Skeleton } from "../UI/skeleton";

const Image = ({
  setProductImage,
  productImage,
  setProductImageUrl,
  productImageUrl,
  imageLoading,
  setImageLoading,
  isEdit,
}) => {
  const inputRef = useRef(null);

  const handleImageFileChange = (event) => {
    const selectFile = event.target.files?.[0];
    if (selectFile) setProductImage(selectFile);
  };

  // Function to handle image drops
  const dropImage = (event) => {
    event.preventDefault();
    const handleImage = event.dataTransfer.files?.[0];
    if (handleImage) {
      setProductImage(handleImage);
    }
  };

  // Function to handle drag over
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRemoveImage = () => {
    setProductImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  async function uploadImageToCloudinary() {
    try {
      const data = new FormData();
      data.append("my_file", productImage);

      const response = await axios.post(
        "http://localhost:5000/admin/products/upload-image",
        data
      );

      if (response?.data?.success) {
        setProductImageUrl(response.data.result.url);
      } else {
        console.error("Failed to upload image to Cloudinary");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setImageLoading(false); // Ensure loading is set to false after upload completes
    }
  }

  if (imageLoading) {
    <h1>Loading...</h1>;
  }

  useEffect(() => {
    if (productImage) {
      uploadImageToCloudinary();
    }
  }, [productImage]);

  return (
    <div className="w-full max-w-md mx-auto mt-5">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={dropImage}
        className="
        border-2 border-dashed rounded-lg p-4"
      >
        <input
          type="file"
          id="image-upload"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEdit}
        />
        {!productImage ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEdit ? "cursor-not-allowed opacity-60" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-slate-500 mb-2" />
            <span>Drag & drop or click to upload</span>
          </Label>
        ) : imageLoading ? (
          <Skeleton className="bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-gray-800 mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{productImage.name}</p>

            <Button
              onClick={handleRemoveImage}
              variant="ghost"
              size="icon"
              className="hover:text-red-700"
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Image;
