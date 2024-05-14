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
import {
  RatingText,
  StatusText,
  WrapperAuthor,
  WrapperButtonAddToCart,
  WrapperOriginalPriceText,
  WrapperPrice,
  WrapperPriceText,
  WrapperQuantity,
  WrapperStatus,
  WrapperStyleNameProduct,
  WrapperStyleTextSale,
} from "./style";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";

const ProductDetailsComponent = ({ idProduct }) => {
  console.log(idProduct);
  
  const fetchGetDetailsProduct = async (context) => {
    let res = {};
    const id = context?.queryKey && context?.queryKey[1];
    if(id){
      res = await ProductService.getDetailsProduct(id);
    }
    return res?.data;
  };
  
  const { isPending, data: productDetails } = useQuery({
    queryKey: ["products-details", idProduct],
    queryFn: fetchGetDetailsProduct,
    enabled: !!idProduct,
  });
  
  console.log("productDetails", productDetails);
  let maxQuantity = productDetails?.countInStock;
  const [quantity, setQuantity] = React.useState(1);
  const onIncreaseQuantity = () => {
    if (quantity < maxQuantity) setQuantity(quantity + 1);
  };
  const onDecreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  
  return (
    <Loading isLoading={isPending}>
      <Row style={{ padding: "30px", backgroundColor: "white" }}>
        <Col
          span={10}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          >
          <Image src={productDetails?.image} alt="Product" width={"18vw"} preview={true} />
          {/* <Row
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
          </Row> */}
        </Col>
        <Col span={14} style={{ padding: "10px 5vw" }}>
          <WrapperStyleNameProduct>
            {productDetails?.name}
          </WrapperStyleNameProduct>
          <div
            style={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <RatingText>{productDetails?.rating}</RatingText>
            <Rate
              disabled
              allowHalf={true}
              value={productDetails?.rating}
              style={{ fontSize: "16px" }}
            />
            <WrapperStyleTextSale>
              (10 đánh giá) | Đã bán {productDetails?.selled || 0}
            </WrapperStyleTextSale>
          </div>
          
          <WrapperAuthor>
            Tác giả: {productDetails?.author}
          </WrapperAuthor>

          <WrapperPrice>
            <WrapperOriginalPriceText>{productDetails?.price?.toLocaleString()} đ</WrapperOriginalPriceText>
            <WrapperPriceText>{productDetails?.discount?.toLocaleString()} đ</WrapperPriceText>
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

          <WrapperButtonAddToCart>
            <ShoppingCartOutlined /> Thêm vào giỏ hàng
          </WrapperButtonAddToCart>
        </Col>
      </Row>

    </Loading>
  );
};

export default ProductDetailsComponent;
