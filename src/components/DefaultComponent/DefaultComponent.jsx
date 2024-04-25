import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import HeaderNavBar from "../HeaderNavBar/HeaderNavBar";

const DefaultComponent = ({children}) => {
  return (
    <div>
        <HeaderComponent />
        <HeaderNavBar />
        {children}
    </div>
  )
}

export default DefaultComponent
