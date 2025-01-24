import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="parent flex min-h-screen w-full">
      {/* Admin sidebar. */}
      <Sidebar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        {/*Admin Header*/}
        <Header setOpen={setOpenSidebar} />

        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:py-6 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
