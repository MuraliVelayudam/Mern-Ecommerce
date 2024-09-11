import { shopNav_Links } from "@/constants";
import { Link, useLocation } from "react-router-dom";

export default function Shop_Navbar() {
  const { pathname } = useLocation();
  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-6 ">
        {shopNav_Links.map((eachLink, index) => (
          <li key={index}>
            <Link
              className={`font-heading text-slate-500 hover:text-slate-950 transition-all duration-300 ease-in-out ${
                pathname === eachLink?.path
                  ? "font-semibold text-slate-950"
                  : ""
              }`}
              to={eachLink?.path}
            >
              {eachLink?.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
