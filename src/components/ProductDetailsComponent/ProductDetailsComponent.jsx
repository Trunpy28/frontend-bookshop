import {
  Col,
  Image,
  Row,
  Rate,
  InputNumber,
  Button,
  ConfigProvider,
  message,
} from "antd";
import {
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import React, { useEffect, useMemo, useState } from "react";
import {
  RatingText,
  StatusInStockText,
  StatusNotInStockText,
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
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addOrderProduct,
  resetAddItemState,
} from "../../redux/slices/orderSlice";
import { convertPrice, initFacebookSDK } from "../../utils";
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent";
import CommentComponent from "../CommentComponent/CommentComponent";

const ProductDetailsComponent = ({ idProduct }) => {
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const fetchGetDetailsProduct = async (context) => {
    let res = {};
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      res = await ProductService.getDetailsProduct(id);
    }
    return res?.data;
  };

  const { isPending, data: productDetails } = useQuery({
    queryKey: ["products-details", idProduct],
    queryFn: fetchGetDetailsProduct,
    enabled: !!idProduct,
  });

  const [maxQuantity, setMaxQuantity] = useState(productDetails?.countInStock);

  useEffect(() => {
    setMaxQuantity(productDetails?.countInStock);
  }, [productDetails]);

  const [quantity, setQuantity] = React.useState(1);
  const onIncreaseQuantity = () => {
    if (quantity < maxQuantity) setQuantity(quantity + 1);
  };
  const onDecreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  useEffect(() => {
    initFacebookSDK();
  }, []);

  useEffect(() => {
    if (order.isSuccessAddItem && !order.isErrorAddItem) {
      message.success("Thêm sản phẩm vào giỏ hàng thành công!");
    } else if (!order.isSuccessAddItem && order.isErrorAddItem) {
      message.error(
        "Thêm sản phẩm vào giỏ hàng thất bại do không đủ số lượng trong kho!"
      );
    }
    if (order.isSuccessAddItem || order.isErrorAddItem) {
      dispatch(resetAddItemState());
    }
  }, [order.isSuccessAddItem, order.isErrorAddItem]);

  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productDetails?.name,
            amount: quantity,
            image: productDetails?.image,
            price: productDetails?.discount,
            product: productDetails?._id,
            countInStock: productDetails?.countInStock,
          },
        })
      );
      setMaxQuantity((prev) => prev - quantity);
    }
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
          <Image
            src={productDetails?.image}
            alt="Product"
            width={"18vw"}
            preview={true}
          />
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

          <LikeButtonComponent
            dataHref={
              process.env.REACT_APP_IS_LOCAL
                ? "https://developers.facebook.com/docs/plugins/"
                : window.location.href
            }
          />

          <WrapperAuthor>
            Tác giả:{" "}
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>
              {productDetails?.author}
            </span>
          </WrapperAuthor>

          <WrapperPrice>
            <WrapperOriginalPriceText>
              {convertPrice(productDetails?.price)}
            </WrapperOriginalPriceText>
            <WrapperPriceText>
              {convertPrice(productDetails?.discount)}
            </WrapperPriceText>
          </WrapperPrice>

          <WrapperStatus>
            <div>Tình trạng:</div>
            {productDetails?.countInStock > 0 ? (
              <StatusInStockText>Còn hàng</StatusInStockText>
            ) : (
              <StatusNotInStockText>Hết hàng</StatusNotInStockText>
            )}
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

          <WrapperButtonAddToCart
            onClick={handleAddOrderProduct}
            disabled={
              productDetails?.countInStock <= 0 || quantity > maxQuantity
            }
          >
            <ShoppingCartOutlined /> Thêm vào giỏ hàng
          </WrapperButtonAddToCart>
        </Col>
      </Row>

      <div style={{ marginTop: "40px" }}>
        <div
          style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}
        >
          NHẬN XÉT
        </div>
        <CommentComponent
          dataHref={
            process.env.REACT_APP_IS_LOCAL
              ? "https://developers.facebook.com/docs/plugins/comments#configurator"
              : window.location.href
          }
          width="100%"
        />
      </div>
    </Loading>
  );
};

export default ProductDetailsComponent;
