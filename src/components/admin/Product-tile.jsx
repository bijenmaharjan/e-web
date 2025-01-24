import React from "react";
import { Card, CardContent, CardFooter } from "../UI/card";
import { Button } from "../UI/button";

const ProductTile = ({
  product,
  setCurrentEditId,
  setOpenCreateProductsDialog,
  setFormData,
  handleDelete, // Renamed for clarity
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>

        <CardContent>
          <h2 className="text-xl font-bold mb-2 truncate">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-zinc-900`}
            >
              {`$${product?.price}`}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-black">{`$${product?.salePrice}`}</span>
            ) : null}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <Button
            className="px-10 py-0"
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(product?._id)}
            className="px-10 py-0"
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProductTile;
