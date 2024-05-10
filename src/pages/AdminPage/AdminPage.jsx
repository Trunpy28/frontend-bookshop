import React, { useState } from "react";
import { ConfigProvider, Menu } from "antd";
import {
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";

const AdminPage = () => {
  const [keySelected, setKeySelected] = useState("user");

  const renderPage = (key) => {
    switch (key) {
      case 'user':
        return <AdminUser />;
      case 'product':
        return <AdminProduct />;
      default:
        return <div>Default</div>;
    }
  };

  const items = [
    {
      key: "user",
      label: "Người dùng",
      icon: <UserOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "product",
      label: "Sản phẩm",
      icon: <AppstoreOutlined />,
    },
  ];

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  return (
    <div>
      <HeaderComponent isHiddenSearch isHiddenCart />
      <div style={{ display: "flex", marginTop: '30px'}}>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                /* here is your component tokens */
              },
            },
            token: {
              /* here is your global tokens */
              fontSize: 18,
            },
          }}
        >
          <Menu
            onClick={handleOnClick}
            style={{
              width: 256,
              boxShadow: '1px 1px 2px #ccc',
              height: '100vw'
            }}
            defaultSelectedKeys={["user"]}
            mode="inline"
            items={items}
          />
          
        </ConfigProvider>

        <div style={{padding: '20px', flex: '1'}}>
          {renderPage(keySelected)}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
