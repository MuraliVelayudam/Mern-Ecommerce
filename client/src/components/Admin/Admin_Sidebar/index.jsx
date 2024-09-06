import { admin_Sidebar_Nav } from "@/constants";
import { Fragment } from "react";

// REACT ICON
import { IoAnalyticsSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const { pathname } = useLocation();
  return (
    <Fragment>
      <aside className="border border-slate-50 shadow-2xl shadow-slate-50 m-2 p-5 rounded-xl hidden lg:block ">
        <div className="flex items-center flex-col space-y-20">
          <div className="flex items-center gap-1 justify-center">
            <span>
              <IoAnalyticsSharp size={42} />
            </span>
            <h1 className="font-heading font-bold uppercase text-2xl">
              Admin Panel
            </h1>
          </div>
          <ul className="flex flex-col gap-5 w-full text-center">
            {admin_Sidebar_Nav?.map((eachLink, index) => (
              <li key={index} className="mt-2">
                <Link
                  to={eachLink?.link}
                  className={`inline-block w-full transition-all duration-200 ease-linear text-sm ${
                    pathname === eachLink?.link
                      ? "bg-black text-white px-4 py-3 rounded-xl shadow-2xl shadow-slate-600"
                      : "bg-white text-black px-4 py-3 rounded-xl shadow-xl"
                  }`}
                >
                  <span>{eachLink?.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </Fragment>
  );
}
