import React, { useCallback, useEffect, useState } from "react";
import ProductFilter from "../../components/shopping/ProductFilter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../../components/UI/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "../../components/config";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllShopProducts,
  fetchProductDetails,
  clearProductDetails,
} from "../../store/shop/shop";
import ShoppingProductTile from "../../components/shopping/ShoppingProductTile";
import { useSearchParams } from "react-router-dom";
import { toast } from "../../hooks/use-toast";
import ProductDetails from "../../components/shopping/ProductDetails";
import { addToCart, fetchCartItems } from "../../store/shop/cart";

const createSearchParamsHelper = (filterParams) => {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      queryParams.push(`${key}=${encodeURIComponent(value.join(","))}`);
    }
  }
  return queryParams.join("&");
};

const ShoppingListing = () => {
  const { product, productDetails } = useSelector(
    (state) => state.shopproducts
  );
  console.log("product", productDetails);
  const { user } = useSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState("price-lowtohigh");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [filters, setFilter] = useState(
    JSON.parse(sessionStorage.getItem("filters")) || {}
  );
  const dispatch = useDispatch();

  const categorySearchParam = searchParams.get("category");

  // Add product to cart
  const handleAddCart = useCallback(
    (id) => {
      console.log("id", id);
      dispatch(
        addToCart({
          userId: user?.id,
          productId: id,
          quantity: 1,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast({ title: "Product is added to cart" });
        }
      });
    },
    [dispatch, user?.id]
  );

  // Fetch products based on filters and sort options
  useEffect(() => {
    dispatch(clearProductDetails()); // Clear product details before fetching products
    if (filters && sort) {
      dispatch(
        fetchAllShopProducts({ filtersParams: filters, sortParams: sort })
      );
    }
  }, [dispatch, sort, filters]); // Re-fetch when sort or filters change

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilter(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  // Update search parameters in URL when filters change
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const queryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(queryString));
    }
  }, [filters, setSearchParams]);

  // Open product details dialog when productDetails state updates
  useEffect(() => {
    if (productDetails) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  // Handle sort changes
  const handleSort = (value) => {
    setSort(value); // Update the sort state
  };

  // Handle filter changes
  const handleFilter = (sectionId, option) => {
    console.log("SectionId:", sectionId);
    const updatedFilters = { ...filters };
    if (!updatedFilters[sectionId]) {
      updatedFilters[sectionId] = [option];
    } else {
      const optionIndex = updatedFilters[sectionId].indexOf(option);
      if (optionIndex === -1) {
        updatedFilters[sectionId].push(option);
      } else {
        updatedFilters[sectionId].splice(optionIndex, 1);
      }
    }
    setFilter(updatedFilters);
    sessionStorage.setItem("filters", JSON.stringify(updatedFilters));
  };

  // Fetch product details
  const handleGetProductDetails = (id) => {
    dispatch(fetchProductDetails(id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-white w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-bold text-lg">All Products</h2>
          <div className="flex items-center gap-4">
            <span className="opacity-50">{`${
              product?.length || 0
            } Products`}</span>
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <button className="flex items-center gap-1 bg-slate-200 px-3 py-1 rounded-[5px] outline-gray-100">
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="text-zinc-900">Sort by</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem value={option.id} key={option.id}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {product?.length > 0 ? (
            product.map((item) => (
              <ShoppingProductTile
                key={item.id}
                handleGetProductDetails={handleGetProductDetails}
                product={item}
                handleAddCart={handleAddCart}
              />
            ))
          ) : (
            <p className="text-center col-span-full">No products found.</p>
          )}
        </div>
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

export default ShoppingListing;
