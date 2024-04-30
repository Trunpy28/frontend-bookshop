import React, { useState } from "react";
import { Badge, Col, Popover } from "antd";
import {
  WrapperHeader,
  WrapperHeaderButton,
  WrapperPopupContent,
} from "./style";
import logo from "../../assets/images/bookshop_logo.jpg";
import { Input, ConfigProvider } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slices/userSlice";
import Loading from "../LoadingComponent/Loading";
const { Search } = Input;

const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
  };
  const content = (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <WrapperPopupContent onClick={handleLogout}>
        <LogoutOutlined /> Đăng xuất
      </WrapperPopupContent>
      <WrapperPopupContent>
        <InfoCircleOutlined /> Thông tin tài khoản
      </WrapperPopupContent>
    </div>
  );

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
            <Badge count={5} size="medium">
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
          <Loading isLoading={loading}>
            <Popover placement="bottomRight" content={content}>
              <WrapperHeaderButton onClick={handleNavigateLogin}>
                <UserOutlined
                  style={{
                    fontSize: "24px",
                  }}
                />

                <div>
                  <span style={{ fontSize: "16px" }}>
                    {user?.name ? user.name : "Tài khoản"}
                  </span>
                </div>
              </WrapperHeaderButton>
            </Popover>
          </Loading>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
