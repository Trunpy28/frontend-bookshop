import React from "react";
import { DownOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Dropdown, ConfigProvider, Space } from "antd";
import { LinkNavBar, TypeProductWrapper } from "./style";

const productTypes = [
  {
    key: "1",
    label: "Sách Kinh Tế",
  },
  {
    key: "2",
    label: "Sách Văn Học Trong Nước",
  },
  {
    key: "3",
    label: "Sách Văn Học Nước Ngoài",
    onclick: (e) => {
      console.log(123);
    },
  },
  {
    key: "4",
    label: "Sách Thưởng Thức Đời Sống",
  },
  {
    key: "5",
    label: "Sách Thiếu Nhi",
    onclick: (e) => {
      console.log(123);
    },
  },
  {
    key: "6",
    label: "Sách Phát Triển Bản Thân",
  },
  {
    key: "7",
    label: "Sách Tin Học Ngoại Ngữ",
    onclick: (e) => {
      console.log(123);
    },
  },
  {
    key: "8",
    label: "Sách Chuyên Ngành",
  },
  {
    key: "9",
    label: "Sách Giáo Khoa - Giáo Trình",
    onclick: (e) => {
      console.log(123);
    },
  },
];

const handleDropdownItemClick = (e) => {
  console.log(e.key);
};

const HeaderNavBar = () => {
  return (
    <div>
      <TypeProductWrapper>
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              fontSize: "16px",
              lineHeight: "40px",
              marginXXS: "0px 20px",
              fontWeightStrong: "bold",
              paddingXXS: "10px 0px 0px 20px",
              controlItemBgHover: "#20C77C",
            },
          }}
        >
          <Dropdown
            menu={{
              onClick: handleDropdownItemClick,
              items: productTypes,
            }}
          >
            <LinkNavBar onClick={(e) => e.preventDefault()}>
              <Space>
                <UnorderedListOutlined />
                DANH MỤC SẢN PHẨM
                <DownOutlined />
              </Space>
            </LinkNavBar>
          </Dropdown>
          <LinkNavBar to={'/'}>
            <Space>TRANG CHỦ</Space>
          </LinkNavBar>
          <LinkNavBar onClick={(e) => e.preventDefault()}>
            <Space>TIN TỨC</Space>
          </LinkNavBar>
          <LinkNavBar onClick={(e) => e.preventDefault()}>
            <Space>LIÊN HỆ</Space>
          </LinkNavBar>
        </ConfigProvider>
      </TypeProductWrapper>
    </div>
  );
};

export default HeaderNavBar;
