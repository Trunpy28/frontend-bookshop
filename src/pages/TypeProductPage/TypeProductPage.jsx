import React from "react";
import NavbarComponent from "../../components/NavBarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Row, Pagination, Col, ConfigProvider } from "antd";
import { WrapperNavBar, WrapperProducts } from "./style";

const TypeProductPage = () => {
  const onChange = (page, pageSize) => {};
  return (
    <Row style={{ padding: "20px 15vw", backgroundColor: "#F0F0F0" }}>
      <WrapperNavBar span={6}>
        <NavbarComponent />
      </WrapperNavBar>
      <Col span={18}>
        <WrapperProducts span={18}>
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </WrapperProducts>

        <ConfigProvider
          theme={{
            token: {
              /* here is your global tokens */
              colorPrimary: '#00A651',
            }
          }}
        >
        <Pagination
          defaultCurrent={1}
          total={100}
          showSizeChanger={false}
          style={{ textAlign: "center", marginTop: "30px" }}
        />
        </ConfigProvider>
      </Col>
    </Row>
  );
};

export default TypeProductPage;
