import React, { useEffect } from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import HeaderNavBar from "../HeaderNavBar/HeaderNavBar";
import Footer from "../FooterComponent/FooterComponent";
import { useLocation } from "react-router-dom";

const DefaultComponent = ({children}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
        <HeaderComponent />
        <HeaderNavBar />
        {children}
        <Footer />
    </div>
  )
}

export default DefaultComponent
