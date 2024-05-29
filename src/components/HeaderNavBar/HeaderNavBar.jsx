import React, { useEffect, useState } from "react";
import { DownOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Dropdown, ConfigProvider, Space } from "antd";
import { LinkNavBar, TypeProductWrapper } from "./style";
import { useNavigate } from "react-router-dom";
import * as ProductService from "../../services/ProductService";


const HeaderNavBar = () => {
  const navigate = useNavigate();
  const [typeProducts, setTypeProducts] = useState([])
  const fetchAllTypeProduct = async () => {
    const  res = await ProductService.getAllTypeProduct();
    if(res?.status === 'OK') {
      setTypeProducts(res?.data);
    }
  }
  useEffect(() => {
    fetchAllTypeProduct();
  },[])

  const productTypes = typeProducts.map((value) => {
    return {
      key: value,
      label: value,
      onClick: (e) => {
        navigate(`/product/${value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`,{state: value});
      },
    }
  })
  
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
              items: productTypes,
              // onClick: handleDropdownItemClick,
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
