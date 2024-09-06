import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/toaster";

export default function Layout() {
  return (
    <>
      <main>
        <Outlet />
        <Toaster />
      </main>
    </>
  );
}
