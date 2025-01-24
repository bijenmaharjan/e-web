import React, { useEffect, useState } from "react";
import { Input } from "../../components/UI/input";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResults } from "../../store/shop/search";
import ShoppingProductTile from "../../components/shopping/ShoppingProductTile";

const SearchProducts = () => {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const disptach = useDispatch();

  useEffect(() => {
    console.log("keyword", keyword);
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?leyword=${keyword}`));
        disptach(getSearchResults(keyword));
      }, 1000);
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
          searchResults.map((items) => <ShoppingProductTile product={items} />)
        ) : (
          <h1>No results found.</h1>
        )}
      </div>
    </div>
  );
};

export default SearchProducts;
