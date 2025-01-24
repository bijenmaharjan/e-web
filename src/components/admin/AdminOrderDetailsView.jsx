import React, { useEffect, useState } from "react";
import { DialogContent } from "../UI/dialog";
import { Separator } from "../UI/separator";
import Form from "../common/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetOrderDetails } from "../../store/shop/order";

const AdminOrderDetailsView = ({ openDetailsDialog, orderDetails }) => {
  const initialStateFormData = {
    status: "",
  };

  const [formData, setFormData] = useState(initialStateFormData);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      // Reset order details when navigating away
      dispatch(resetOrderDetails());
    };
  }, [dispatch, navigate]);

  const handleUpdateStatus = (e) => {
    e.preventDefault();
  };

  // useEffect(() => {}, [orderDetails]);

  return (
    <DialogContent
      open={openDetailsDialog}
      className="sm:max-w-[500px] p-4 bg-white rounded-lg shadow-lg"
    >
      <div className="grid gap-4">
        {/* Order Information */}
        <div className="grid gap-3">
          <div className="flex items-center justify-between mt-5">
            <p className="font-medium text-sm text-gray-800">Order ID</p>
            <label className="text-sm text-gray-600">{orderDetails?._id}</label>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="font-medium text-sm text-gray-800">Order Date</p>
            <label className="text-sm text-gray-600">
              {orderDetails?.orderDate.split("T")[0]}
            </label>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="font-medium text-sm text-gray-800">Order Price</p>
            <label className="text-sm text-gray-600">
              $ {orderDetails?.totalAmount}
            </label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium text-sm text-gray-800">Payment Method</p>
            <label className="text-sm text-gray-600">
              {orderDetails?.paymentMethod}
            </label>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="font-medium text-sm text-gray-800">Payment Status</p>
            <label className="text-sm text-gray-600 bg-yellow-200 text-yellow-800 py-0.5 px-2 rounded-full">
              {orderDetails?.paymentStatus}
            </label>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="font-medium text-sm text-gray-800">Order Status</p>
            <label
              className={
                orderDetails?.orderStatus === "confirmed"
                  ? "text-sm text-white bg-green-500 p-[8px] py-1 rounded-xl"
                  : "bg-yellow-600 text-sm text-white  p-[9px] py-1 rounded-xl"
              }
            >
              {orderDetails?.orderStatus}
            </label>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-2" />

        {/* Order Details */}
        <div className="grid gap-3">
          <div className="font-bold text-sm text-gray-800">Order Details</div>
          {orderDetails && orderDetails?.cartitems.length > 0
            ? orderDetails.cartitems.map((cartitems) => (
                <ul className="grid gap-2">
                  <li className="flex items-center justify-between bg-gray-50 p-2 rounded-lg shadow-sm hover:bg-gray-100 transition duration-300">
                    <span className="font-medium text-sm text-gray-800">
                      {cartitems.title}
                    </span>
                    <span>Quantity: {cartitems.quantity}</span>
                    <span className="text-sm text-gray-600">
                      $
                      {cartitems.salePrice > 0
                        ? cartitems?.salePrice
                        : cartitems?.price}
                    </span>
                  </li>
                  {/* Add more items as needed */}
                </ul>
              ))
            : null}
        </div>

        {/* Shipping Info */}
        <div className="grid gap-3 mt-4">
          <div className="font-bold text-sm text-gray-800">Shipping Info</div>
          <div className="grid gap-0.5">
            <span className="text-sm text-gray-600">{user?.userName}</span>
            <span className="text-sm text-gray-600">
              {orderDetails?.addressInfo?.address}
            </span>
            <span className="text-sm text-gray-600">
              {orderDetails?.addressInfo?.city}
            </span>
            <span className="text-sm text-gray-600">
              {orderDetails?.addressInfo?.phone}
            </span>
            <span className="text-sm text-gray-600">
              {orderDetails?.addressInfo?.pincode}
            </span>
            <span className="text-sm text-gray-600">
              {orderDetails?.addressInfo?.notes}
            </span>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetailsView;
