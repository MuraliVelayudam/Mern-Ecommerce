import { Link } from "react-router-dom";

import logo from "../../../../assets/logo/logo.png";

export default function Logo() {
  return (
    <div>
      <Link to={"/shop/home"}>
        <img src={logo} alt="Ecommerce.In" className="w-36" />
      </Link>
    </div>
  );
}
