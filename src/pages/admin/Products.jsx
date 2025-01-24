import React, { Fragment, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/UI/sheet";
import Form from "../../components/common/Form";
import { addProductFormElements } from "../../components/config";
import Image from "../../components/admin/Image";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProducts,
  editProducts,
  fetchAllProducts,
} from "../../store/admin/admin";
import { useToast } from "../../hooks/use-toast";
import Producttile from "../../components/admin/Product-Tile";
import { LeafyGreen } from "lucide-react";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  console.log("formdata", formData);
  const [productImage, setProductImage] = useState(null);
  console.log("product image:", productImage);
  const [productImageUrl, setProductImageUrl] = useState("");
  console.log("productUrl:", productImageUrl);
  const [imageLoading, setImageLoading] = useState(false);
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminproducts);
  console.log("productlist", productList);
  const { toast } = useToast();
  const [currentEditId, setCurrentEditId] = useState(false);
  console.log("Id:", currentEditId);

  const onSubmit = (event) => {
    event.preventDefault();

    currentEditId !== false
      ? dispatch(editProducts({ id: currentEditId, formdata: formData })).then(
          (data) => {
            console.log("datas:", data);
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              setFormData(initialFormData);
              setOpenCreateProductsDialog(false);
              setCurrentEditId(false);
              toast({
                title: "Product Edited Successfully",
              });
            }
          }
        )
      : dispatch(addNewProduct({ ...formData, image: productImageUrl }))
          .then((data) => {
            console.log("Dispatch response data:", data);
            if (data?.payload?.success) {
              toast({
                title: data?.payload?.message || "Product Added Successfully",
                status: "success",
              });
              dispatch(fetchAllProducts());
              setOpenCreateProductsDialog(false);
              setFormData(initialFormData);
              setProductImage(null);
            } else {
              toast({
                title: "Failed to add product",
                description:
                  data.payload.message || "An unexpected error occurred.",
                status: "error",
              });
            }
          })
          .catch((error) => {
            console.error("Error during addNewProduct dispatch:", error);
            toast({
              title: "Error",
              description: error.message || "Failed to add product",
              status: "error",
            });
          });
  };

  const deletenality = (getId) => {
    console.log(getId, "Iddelete");

    dispatch(deleteProducts(getId)).then((data) => {
      console.log("deletedata:", data);
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast({
          title: data?.payload?.message,
        });
      }
    });
  };

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
    isFormValid();
  }, [dispatch]);
  return (
    <Fragment>
      <div className="mb-5 flex justify-end">
        <div>
          <button
            onClick={() => setOpenCreateProductsDialog(true)}
            className="bg-[#52a4d6] py-1 px-3 rounded-md text-gray-200 shadow-md drop-shadow-md"
          >
            Add New Product
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-1">
        {productList && productList.length > 0
          ? productList.map((productitem) => (
              <Producttile
                product={productitem}
                setCurrentEditId={setCurrentEditId}
                currentEditId={setCurrentEditId}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setFormData={setFormData}
                deletenality={deletenality}
              />
            ))
          : null}
      </div>
      <Sheet
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setFormData(initialFormData);
          setCurrentEditId(false);
        }}
        open={openCreateProductsDialog}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditId ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <Image
            setProductImageUrl={setProductImageUrl}
            productImage={productImage}
            setProductImage={setProductImage}
            productImageUrl={productImageUrl}
            imageLoading={imageLoading}
            setImageLoading={setImageLoading}
            isEdit={currentEditId !== false}
          />
          <div className="py-6">
            <Form
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditId ? "Edit product" : "Add Product"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
