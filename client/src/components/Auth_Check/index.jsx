/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";

export default function AuthCheck({ isAuthenticated, user, children }) {
  const location = useLocation();
  const { pathname } = location;

  //   USER NOT AUTHORIZED REDIRECT TO SIGNIN PAGE
  if (
    !isAuthenticated &&
    !(pathname.includes("/auth/signIn") || pathname.includes("/auth/signUp"))
  ) {
    return <Navigate to={"/auth/signIn"} />;
  }

  // USER IS AUTHORIZED REDIRECTED TO HOMES ACCORDING TO THEIR ROLES
  if (
    isAuthenticated &&
    (pathname.includes("/auth/signIn") || pathname.includes("/auth/signUp"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to={"/admin/dashboard"} />;
    } else {
      return <Navigate to={"/shop/home"} />;
    }
  }

  //   ADMIN NOT ABLE TO ACCESS THE SHOP PAGE
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    pathname.includes("/admin")
  ) {
    return <Navigate to={"/UnAuthorized"} />;
  }

  //   USER NOT ABLE TO ACCESS THE ADMIN PAGE
  if (isAuthenticated && user?.role === "admin" && pathname.includes("/shop")) {
    return <Navigate to={"/admin/dashboard"} />;
  }

  return <>{children}</>;
}
