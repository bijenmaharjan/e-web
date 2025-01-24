import React, { useEffect, useState } from "react";
import banner from "../../assets/banner.webp";
import banner6 from "../../assets/banner6.webp";
import banner8 from "../../assets/banner8.avif";
import banner9 from "../../assets/banner9.avif";
import banner11 from "../../assets/banner11.avif";
import banner12 from "../../assets/banner12.avif";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "../../components/UI/card";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProductDetails,
  fetchAllShopProducts,
  fetchProductDetails,
} from "../../store/shop/shop";
import ShoppingProductTile from "../../components/shopping/ShoppingProductTile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "../../store/shop/cart";
import { toast } from "../../hooks/use-toast";
import ProductDetails from "../../components/shopping/ProductDetails";

const slides = [banner, banner6, banner8, banner9, banner11, banner12];

const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const { product, productDetails } = useSelector(
    (state) => state.shopproducts
  );
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const shoppingMenuItems = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
  ];

  const brandItems = [
    {
      id: "nike",
      label: "Nike",
      icon: Shirt,
    },
    {
      id: "adidas",
      label: "Adidas",
      icon: WashingMachine,
    },
    {
      id: "puma",
      label: "Puma",
      icon: ShoppingBasket,
    },
    {
      id: "levi",
      label: "Levi's",
      icon: Airplay,
    },
    {
      id: "zara",
      label: "Zara",
      icon: Images,
    },
    {
      id: "h&m",
      label: "H&M",
      icon: Heater,
    },
  ];

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    dispatch(clearProductDetails());

    navigate(`/shop/listing`);
  }
  function handleNavigateToListingPageBrand(getCurrentItemBrand, section) {
    sessionStorage.removeItem("filters");

    const currentFilterbrand = {
      [section]: [getCurrentItemBrand.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilterbrand));
    dispatch(clearProductDetails());
    navigate(`/shop/listing`);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [setCurrentSlide]);

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
  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }
  useEffect(() => {
    handleGetProductDetails;
  }, []);

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch, user?.id]);

  useEffect(() => {
    dispatch(
      fetchAllShopProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-full">
        {slides.map((slideItem, index) => (
          <img
            key={index}
            src={slideItem}
            alt="Shopping Banner"
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } h-[800px] object-fit w-full absolute left-0 transition-opacity duration-1000 `}
          />
        ))}

        {/* Left Button */}
        <button
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
          className="absolute top-80 left-4 transform -translate-y-1/2 bg-slate-100"
        >
          <ChevronLeftIcon className="w-10 h-8" />
        </button>

        {/* Right Button */}
        <button
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          className="absolute top-80 right-4 transform -translate-y-1/2 bg-slate-100"
        >
          <ChevronRightIcon className="w-10 h-8" />
        </button>
      </div>
      {/*Shop by Category */}
      <section className="pt-[850px]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {shoppingMenuItems.map((item) => (
              <Card
                onClick={() => handleNavigateToListingPage(item, "category")}
                key={item.id}
                className="cursor-pointer bg-gradient-to-br from-[#b3b0b0] to-[#7ae6db] hover:shadow-xl transition-shadow transform hover:scale-105 "
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="w-12 h-12 mb-4 text-zinc-800" />
                  <span className="font-bold text-zinc-800">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/*Shop by Brand */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandItems.map((branditem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPageBrand(branditem, "brand")
                }
                key={branditem.id}
                className="cursor-pointer bg-gradient-to-br from-slate-700 to-purple-400 hover:shadow-xl transition-shadow transform hover:scale-105"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <branditem.icon className="w-12 h-12 mb-4 text-white" />

                  <span className="font-bold text-white">
                    {branditem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/*Feature Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {product && product.length > 0
              ? product.map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddCart={handleAddCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>

      <ProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
        handleAddCart={handleAddCart}
      />
    </div>
  );
};

export default ShoppingHome;
