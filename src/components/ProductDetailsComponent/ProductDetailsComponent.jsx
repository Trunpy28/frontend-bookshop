import {
  Col,
  Image,
  Row,
  Rate,
  InputNumber,
  Button,
  ConfigProvider,
} from "antd";
import {
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import React from "react";
import bookImg from "../../assets/images/20240328_u3ba0oVa6E.webp";
import bookImgSmall from "../../assets/images/20240328_u3ba0oVa6E_small.webp";
import {
  RatingText,
  StatusText,
  WrapperButtonAddToCart,
  WrapperOriginalPriceText,
  WrapperPrice,
  WrapperPriceText,
  WrapperQuantity,
  WrapperStatus,
  WrapperStyleNameProduct,
  WrapperStyleTextSale,
} from "./style";

const ProductDetailsComponent = () => {
  let maxQuantity = 1000;
  const [quantity, setQuantity] = React.useState(1);
  const onIncreaseQuantity = () => {
    if (quantity < maxQuantity) setQuantity(quantity + 1);
  };
  const onDecreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <Row style={{ padding: "30px", backgroundColor: "white" }}>
      <Col
        span={10}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image src={bookImg} alt="Product" width={"20vw"} preview={true} />
        <Row
          style={{
            paddingTop: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignSelf: "stretch",
          }}
        >
          <Image
            span={4}
            src={bookImgSmall}
            alt="Img small"
            preview={true}
            width={"5vw"}
          />
          <Image
            span={4}
            src={bookImgSmall}
            alt="Img small"
            preview={true}
            width={"5vw"}
          />
          <Image
            span={4}
            src={bookImgSmall}
            alt="Img small"
            preview={true}
            width={"5vw"}
          />
          <Image
            span={4}
            src={bookImgSmall}
            alt="Img small"
            preview={true}
            width={"5vw"}
          />

          <Image
            span={4}
            src={bookImgSmall}
            alt="Img small"
            preview={true}
            width={"5vw"}
          />
        </Row>
      </Col>
      <Col span={14} style={{ padding: "10px 5vw" }}>
        <WrapperStyleNameProduct>Design Patterns For Vuejs A Test Driven Approach To Maintainable Applications - Lachlan Miller</WrapperStyleNameProduct>
        <div
          style={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <RatingText>4.8</RatingText>
          <Rate
            disabled
            allowHalf={true}
            value={4.5}
            style={{ fontSize: "16px" }}
          />
          <WrapperStyleTextSale>
            (10 đánh giá) | Đã bán 100
          </WrapperStyleTextSale>
        </div>

        <WrapperPrice>
          <WrapperOriginalPriceText>230.000 đ</WrapperOriginalPriceText>
          <WrapperPriceText>203.000 đ</WrapperPriceText>
        </WrapperPrice>

        <WrapperStatus>
          <div>Tình trạng:</div>
          <StatusText>Còn hàng</StatusText>
        </WrapperStatus>

        <WrapperQuantity>
          <div>Số lượng:</div>
          <div>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#00A651",
                },
              }}
            >
              <Button
                icon={<MinusOutlined />}
                onClick={onDecreaseQuantity}
                disabled={quantity < 2}
              />
              <ConfigProvider
                theme={{
                  components: {
                    InputNumber: {
                      /* here is your component tokens */
                      inputFontSize: "16px",
                      controlWidth: "50px",
                    },
                  },
                }}
              >
                <InputNumber
                  min={1}
                  max={maxQuantity}
                  value={quantity}
                  controls={false}
                  onChange={(value) => {
                    setQuantity(value);
                  }}
                />
              </ConfigProvider>
              <Button
                icon={<PlusOutlined />}
                onClick={onIncreaseQuantity}
                disabled={quantity >= maxQuantity}
              />
            </ConfigProvider>
          </div>
        </WrapperQuantity>

        <WrapperButtonAddToCart><ShoppingCartOutlined /> Thêm vào giỏ hàng</WrapperButtonAddToCart>
      </Col>
    </Row>
  );
};

export default ProductDetailsComponent;
