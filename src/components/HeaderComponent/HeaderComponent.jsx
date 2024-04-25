import React from "react";
import { Badge, Col } from "antd";
import { WrapperHeader, WrapperHeaderButton } from "./style";
import logo from "../../assets/images/bookshop_logo.jpg";
import { Input, ConfigProvider } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
const { Search } = Input;

const HeaderComponent = () => {
  return (
    <div>
      <WrapperHeader>
        <Col span={5}>
          <img
            src={logo}
            alt=""
            style={{
              width: "5vw",
            }}
          />
        </Col>
        <Col span={12}>
          <ConfigProvider
            theme={{
              token: {
                // Seed Token
                colorPrimary: "#00b96b",
              },
            }}
          >
            <Search
              placeholder="Tìm kiếm theo từ khóa trong tên sách..."
              enterButton="Tìm kiếm"
              size="large"
              onSearch={(value, e, { source = "input" }) => {
                console.log(123);
              }}
            />
          </ConfigProvider>
        </Col>
        <Col
          span={6}
          style={{ display: "flex", justifyContent: "end", gap: "20px" }}
        >
          <WrapperHeaderButton>
            <Badge count={5} size='medium'>
              <ShoppingCartOutlined
                style={{
                  fontSize: "24px",
                }}
              />
            </Badge>
            <div>
              <span style={{ fontSize: "16px" }}>Giỏ hàng</span>
            </div>
          </WrapperHeaderButton>
          <WrapperHeaderButton>
            <UserOutlined
              style={{
                fontSize: "24px",
              }}
            />
            <div>
              <span style={{ fontSize: "16px" }}>Tài khoản</span>
            </div>
          </WrapperHeaderButton>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
