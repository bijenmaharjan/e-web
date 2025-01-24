import React, { Fragment } from "react";
import { ChartNoAxesCombined, MailWarningIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ShoppingBasket, BadgeCheck, ChartNoAxesColumn } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../UI/sheet";
import Image from "./Image";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <ChartNoAxesColumn color="#06D001" />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket color="#FF8D29" />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck color="#332FD0" />,
  },
];

const MenuItems = () => {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          onClick={() => navigate(menuItem.path)}
          key={menuItem.id}
          className="flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-200 hover:text-zinc-600"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
};

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} color="#166534" />
                <h1 className="text-2xl  text-red-500">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden w-64 flex-col border-r bg-slate-50 p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center  gap-2"
        >
          <ChartNoAxesCombined size={25} color="#166939" />
          <h1 className="text-[25px] font-serif ">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
      
    </Fragment>
  );
};

export default AdminSidebar;
