import { Drawer } from "antd";
import React from "react";

const DrawerComponent = ({
  title = "Drawer",
  placement = "right",
  children,
  isOpen = false,
  ...rests
}) => {
  return (
    <div>
      <Drawer title={title} placement={placement} open={isOpen} {...rests}>
        {children}
      </Drawer>
    </div>
  );
};

export default DrawerComponent;
