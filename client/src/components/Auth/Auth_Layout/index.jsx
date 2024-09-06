import { Outlet } from "react-router-dom";

export default function Auth_Layout() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
      <div className="max-lg:hidden login_Large_Bg bg-loginBackground border-none"></div>
      <main className="flex flex-col  justify-center min-h-screen max-lg:bg-loginBackground login_Small_Bg">
        <Outlet />
      </main>
    </div>
  );
}
