import { Outlet } from "react-router-dom";
import AdminSidebar from "../Admin_Sidebar";
import AdminHeader from "../Admin_Header";

export default function AdminLayout() {
  return (
    <div className="flex min-h-svh w-full bg-gradient-to-tr from-red-200 to-cyan-400">
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <AdminHeader />
        <main className="flex flex-1 flex-col m-2 p-5 rounded-xl border border-slate-50 shadow-2xl shadow-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
