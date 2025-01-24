import React, { useState } from "react";
import Address from "../../components/shopping/Address";
import { useDispatch, useSelector } from "react-redux";
import Cartitemscontent from "../../components/shopping/Cart-items-content";
import { Button } from "../../components/UI/button";
import { createNewOrder } from "../../store/shop/order";
import { toast } from "../../hooks/use-toast";

const ShoppingCheckout = () => {
  const { cart } = useSelector((state) => state.cart);

  console.log("cart", cart?._doc?._id);
  console.log(cart, "cart");
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.order);
  const { address } = useSelector((state) => state.address);
  console.log("add", address);
  const dispatch = useDispatch();

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  console.log("currentSelectedAddress", currentSelectedAddress);

  function handleInitiatePaypalPayment() {
    if (cart.items.length === 0) {
      toast({
        title: "Your cart items is empty. Please add items to proceed.",
        variant: "destructive",
      });
      return;
    }
    if (address.length === 0) {
      toast({
        title: "Please Add your address",
        variant: "destructive",
      });
      return;
    }

    if (address.length >= 2 && currentSelectedAddress === null) {
      toast({
        title: "Please select one Address",
        variant: "destructive",
      });
      return;
    }

    if (currentSelectedAddress === null) {
      toast({
        title: "Please select  Address",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cart?._doc?._id,
      cartitems: cart.items.map((cartitem) => ({
        productId: cartitem?.productId,
        title: cartitem?.title,
        image: cartitem?.image,
        price: cartitem?.price,
        salePrice:
          cartitem?.salePrice > 0 ? cartitem.salePrice : cartitem.price,
        quantity: cartitem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };
    dispatch(createNewOrder(orderData)).then((data) => {
      console.log("data,", data);
    });
    console.log(orderData, "Order Data Sent");
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  const totalCartAmount =
    cart.items && cart.items && cart.items.length > 0
      ? cart.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src=""
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5 ">
        <Address
          setCurrentSelectedAddress={setCurrentSelectedAddress}
          currentSelectedAddress={currentSelectedAddress}
        />
        <div className="flex flex-col gap-4 w-full">
          {cart && cart.items && cart.items.length > 0 ? (
            cart.items.map((item) => (
              <Cartitemscontent key={item.id} cart={item} />
            ))
          ) : (
            <p>No items in cart</p>
          )}
          <span className="flex justify-between text-lg mx-3 font-semibold">
            Total:
            <span>${totalCartAmount}</span>
          </span>

          <Button onClick={handleInitiatePaypalPayment} className="w-full">
            Checkout with paypal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
