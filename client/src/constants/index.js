// SIGNUP INPUTS
const signUp_Inputs = [
  {
    type: "text",
    placeholder: "Enter Your Name . . .",
    label: "Username",
    name: "username",
  },
  {
    type: "email",
    placeholder: "Enter Your Email . . .",
    label: "Email",
    name: "email",
  },
  {
    type: "password",
    placeholder: "Enter Your Password . . .",
    label: "Password",
    name: "password",
  },
];

// SIGNIN INPUTS

const signIn_Inputs = [
  {
    type: "email",
    placeholder: "Enter Your Email . . .",
    label: "Email",
    name: "email",
  },
  {
    type: "password",
    placeholder: "Enter Your Password . . .",
    label: "Password",
    name: "password",
  },
];

// ADMIN SIDEBAR NAV
const admin_Sidebar_Nav = [
  {
    link: "/admin/dashboard",
    label: "Dashboard",
  },
  {
    link: "/admin/products",
    label: "Products",
  },
  {
    link: "/admin/orders",
    label: "Orders",
  },
];

// CATEGORY SELECTIONS
const categoryOptions = [
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "kids", label: "Kids" },
  { id: "accessories", label: "Accessories" },
  { id: "footwear", label: "Footwear" },
];

// BRAND SELECTION
const brandOptions = [
  { id: "nike", label: "Nike" },
  { id: "adidas", label: "Adidas" },
  { id: "puma", label: "Puma" },
  { id: "levi", label: "Levi's" },
  { id: "zara", label: "Zara" },
  { id: "h&m", label: "H&M" },
];

// SHOP NAV LINKS
const shopNav_Links = [
  {
    label: "Home",
    path: "/shop/home",
  },
  {
    label: "Products",
    path: "/shop/listing",
  },
  {
    label: "Men",
    path: "/shop/listing",
  },
  {
    label: "Women",
    path: "/shop/listing",
  },
  {
    label: "Kids",
    path: "/shop/listing",
  },
  {
    label: "Footwear",
    path: "/shop/listing",
  },
  {
    label: "Accessories",
    path: "/shop/listing",
  },
  {
    label: "Search",
    path: "/shop/search",
  },
];

export {
  signUp_Inputs,
  signIn_Inputs,
  admin_Sidebar_Nav,
  categoryOptions,
  brandOptions,
  shopNav_Links,
};
