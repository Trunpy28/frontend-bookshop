import React, { useEffect, useState } from "react";
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
  UserAddOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slices/userSlice";
import Loading from "../LoadingComponent/Loading";
const { Search } = Input;

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
    navigate("/");
  };

  useEffect(() => {
    setLoading(true);
    setUserName(user.name || user.email);
    setUserAvatar(user.avatar);
    setLoading(false);
  }, [user?.name, user.email, user?.avatar]);

  const content = (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <WrapperPopupContent onClick={() => navigate("/profile-user")}>
        <InfoCircleOutlined /> Thông tin tài khoản
      </WrapperPopupContent>
      {user?.isAdmin && (
        <WrapperPopupContent onClick={() => navigate("/system/admin")}>
          <SettingOutlined /> Quản lý hệ thống
        </WrapperPopupContent>
      )}
      <WrapperPopupContent onClick={handleLogout}>
        <LogoutOutlined /> Đăng xuất
      </WrapperPopupContent>
    </div>
  );

  const contentNotSignIn = (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <WrapperPopupContent onClick={handleNavigateLogin}>
        <LogoutOutlined /> Đăng nhập
      </WrapperPopupContent>
      <WrapperPopupContent onClick={() => navigate("/sign-up")}>
        <UserAddOutlined /> Đăng ký
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
          {!isHiddenSearch && (
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
          )}
        </Col>
        <Col
          span={6}
          style={{ display: "flex", justifyContent: "end", gap: "30px" }}
        >
          {!isHiddenCart && (
            <WrapperHeaderButton>
              <Badge count={5} size="medium">
                <ShoppingCartOutlined
                  style={{
                    fontSize: "36px",
                  }}
                />
              </Badge>
              <div>
                <span style={{ fontSize: "16px" }}>Giỏ hàng</span>
              </div>
            </WrapperHeaderButton>
          )}
          <Loading isLoading={loading}>
            {user?.access_token ? (
              <Popover placement="bottomRight" content={content}>
                <WrapperHeaderButton onClick={() => navigate("/profile-user")}>
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt=""
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <UserOutlined
                      style={{
                        fontSize: "36px",
                      }}
                    />
                  )}

                  <div>
                    <span style={{ fontSize: "16px" }}>{userName}</span>
                  </div>
                </WrapperHeaderButton>
              </Popover>
            ) : (
              <Popover placement="bottomRight" content={contentNotSignIn}>
                <WrapperHeaderButton onClick={handleNavigateLogin}>
                  <UserOutlined
                    style={{
                      fontSize: "36px",
                    }}
                  />

                  <div>
                    <span style={{ fontSize: "16px" }}>Tài khoản</span>
                  </div>
                </WrapperHeaderButton>
              </Popover>
            )}
          </Loading>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
