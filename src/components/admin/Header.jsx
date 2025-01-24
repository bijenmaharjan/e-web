import React from "react";
import { Menu } from "lucide-react";
import { Button } from "../UI/button";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/authorization-slice/auths";

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <header className="flex items-center justify-between px-4 border-b py-3 bg-slate-50">
      <Button className="lg:hidden sm:block" onClick={() => setOpen(true)}>
        <Menu />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-[14px] font-medium shadow-md bg-[#FF7777] text-slate-100 transition ease-in-out delay-150 hover:-translate-2 hover:scale-110 duration-300 hover:bg-[#f66e6e]"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
