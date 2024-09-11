import { Outlet } from "react-router-dom";
import AdminSidebar from "../Admin_Sidebar";
import AdminHeader from "../Admin_Header";

export default function AdminLayout() {
  return (
    <div className="flex min-h-svh w-full ">
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <AdminHeader />
        <main className="flex flex-1 flex-col m-2 p-5 rounded-xl border border-slate-200 shadow-2xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
