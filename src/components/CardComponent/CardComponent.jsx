import React from "react";
import { Card } from "antd";
import { StarFilled } from "@ant-design/icons";
import {
  StyledNameProduct,
  WrapperOriginalPriceText,
  WrapperPriceText,
  WrapperReportText,
} from "./style";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";

const CardComponent = (props) => {
  const { image, name, price, rating, discount, selled, id } = props;
  const navigate = useNavigate();
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  };

  return (
    <Card
      hoverable
      style={{
        width: "210px",
        cursor: "default",
      }}
      cover={
        <div
          style={{
            height: "230px",
            width: "210px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            paddingTop: "20px",
          }}
          onClick={() => handleDetailsProduct(id)}
        >
          <img
            alt="Ảnh sản phẩm"
            src={image}
            style={{
              height: "210px",
              width: "160px",
              borderRadius: 0,
              cursor: "pointer",
            }}
          />
        </div>
      }
    >
      <StyledNameProduct onClick={() => handleDetailsProduct(id)}>
        {name}
      </StyledNameProduct>
      <WrapperReportText>
        <span>
          <span>
            {rating}{" "}
            <StarFilled style={{ fontSize: "14px", color: "#FFC70D" }} />{" "}
          </span>
        </span>
        <span>| Đã bán {selled || 0}</span>
      </WrapperReportText>
      <WrapperPriceText>
        {convertPrice(discount)}{" "}
        {discount < price && (
          <WrapperOriginalPriceText>
            {convertPrice(price)}
          </WrapperOriginalPriceText>
        )}
      </WrapperPriceText>
    </Card>
  );
};

export default CardComponent;
