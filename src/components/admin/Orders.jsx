import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../UI/card";

import {
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableBody,
  TableCell,
} from "../UI/table";
import { Button } from "../UI/button";
import { Dialog } from "../UI/dialog";
import AdminOrderDetailsView from "./AdminOrderDetailsView";
import {
  getAllOrdersByAllUser,
  getOrderDetailsAdmin,
} from "../../store/admin/orderAdmin";
import { useDispatch, useSelector } from "react-redux";
import { resetOrderDetails } from "../../store/shop/order";
import { Badge } from "../UI/badge";

const AdminOrdersBoard = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { orderDetails } = useSelector((state) => state.adminOrder);
  const { orderList } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrdersByAllUser(user.id));
    }
  }, [dispatch, user, getAllOrdersByAllUser]);

  // useEffect(() => {
  //   if (orderDetails !== null) {
  //     setOpenDetailsDialog();
  //   }
  // }, [orderDetails, getOrderDetailsAdmin]);



  function fetchOrderDetailsAdmin(id) {
    dispatch(getOrderDetailsAdmin(id));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orderList && orderList.length > 0 ? (
              orderList.map((orderItem) => (
                // console.log('orderItem',orderItem),
                <TableRow key={orderItem._id}>
                  <TableCell className="text-[16px]">{orderItem._id}</TableCell>
                  <TableCell>{orderItem.orderDate.split("T")[0]}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        orderItem.orderStatus === "confirmed"
                          ? "bg-green-600 hover:bg-green-700 px-4 py-1"
                          : "bg-yellow-700 hover:bg-yellow-800 px-5 py-1"
                      }
                    >
                      {orderItem?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{`$ ${orderItem.totalAmount}`}</TableCell>
                  <TableCell>
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={() => {
                        setOpenDetailsDialog();
                        dispatch(resetOrderDetails());
                      }}
                    >
                      <Button
                        onClick={() => {
                          setOpenDetailsDialog(true);
                          fetchOrderDetailsAdmin(orderItem._id);
                        }}
                      >
                        View Details
                      </Button>
                      <AdminOrderDetailsView
                        openDetailsDialog={openDetailsDialog}
                        orderDetails={orderDetails}
                      />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminOrdersBoard;
