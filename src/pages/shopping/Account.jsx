import React, { useEffect } from "react";
import banner13 from "../../assets/banner13.webp";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/UI/tabs";
import Orders from "../../components/shopping/Orders";
import Address from "../../components/shopping/Address";


const ShoppingAccount = () => {

  return (
    <div className="flex flex-col">
      <div className="relative h-[350px] w-full overflow-hidden">
        <img
          src={banner13}
          alt=""
          className="h-full w-full object-fit object-center"
        />
      </div>
      <div className="container mx-auto lg:px-10 md:py-10 grid grid-cols-1 gap-8 py-8 max-w-full">
        <div className="flex flex-col rounded-lg border bg-slate-50 p-6 shadow-sm w-full">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <Orders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ShoppingAccount;
