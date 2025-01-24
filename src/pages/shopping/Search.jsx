import React, { useEffect, useState } from "react";
import { Input } from "../../components/UI/input";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResults, resetSearch } from "../../store/shop/search";
import ShoppingProductTile from "../../components/shopping/ShoppingProductTile";
import { toast } from "../../hooks/use-toast";
import { addToCart, fetchCartItems } from "../../store/shop/cart";
import ProductDetails from "../../components/shopping/ProductDetails";
import { fetchProductDetails } from "../../store/shop/shop";

const SearchProducts = () => {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { productDetails } = useSelector((state) => state.shopproducts);

  const dispatch = useDispatch();

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddCart(id, getTotalStock) {
    console.log("getCurrentProductId", id);
    console.log("getTotalStock", getTotalStock);
    let getCartItems = cart.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === id
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: id,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    console.log("keyword", keyword);
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearch());
    }
  }, [keyword]);
  console.log("searchResults", searchResults);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            className="py-6"
            placeholder="Search Products..."
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults && searchResults.length ? (
          searchResults.map((items) => (
            <ShoppingProductTile
              handleAddCart={handleAddCart}
              handleGetProductDetails={handleGetProductDetails}
              product={items}
            />
          ))
        ) : (
          <h1>No results found.</h1>
        )}
      </div>
      <ProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
        handleAddCart={handleAddCart}
      />
    </div>
  );
};

export default SearchProducts;
