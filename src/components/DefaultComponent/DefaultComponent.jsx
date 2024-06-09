import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import HeaderNavBar from "../HeaderNavBar/HeaderNavBar";
import Footer from "../FooterComponent/FooterComponent";

const DefaultComponent = ({children}) => {
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
