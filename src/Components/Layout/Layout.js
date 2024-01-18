import React from "react";
import NavBar from "../Common/NavBar";
import Footer from "../Common/Footer";
// import Home from "../../Pages/Home/Home";
import { Outlet } from "react-router-dom";
// import ViewProducts from "../../Pages/ViewProducts/ViewProducts";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
