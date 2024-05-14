import React from "react";
import { Card } from "antd";
import {StarFilled} from '@ant-design/icons';
import { StyledNameProduct, WrapperOriginalPriceText, WrapperPriceText, WrapperReportText } from "./style";
import { useNavigate } from "react-router-dom";


const CardComponent = (props) => {
  const { image, name, price, rating, discount, selled, id} = props;
  const navigate = useNavigate();
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`)
  }

  return (
    <Card
      hoverable
      style={{
        width: 240,
        cursor: 'default',
      }}
      cover={
        <img
          alt="example"
          src={image}
          style={{
            height: "350px",
            width: "240px",
            cursor: 'pointer',
          }}
          onClick={() => handleDetailsProduct(id)}
        />
      }
    >
        <StyledNameProduct onClick={() => handleDetailsProduct(id)}>{name}</StyledNameProduct>
        <WrapperReportText>
            <span>
                <span>{rating} <StarFilled style={{fontSize: '14px',color:'#FFC70D'}}/> </span>
            </span>
            <span>| Đã bán {selled || 0}</span>
        </WrapperReportText>
        <WrapperPriceText>
            {discount.toLocaleString()} đ  {(discount < price) && <WrapperOriginalPriceText>{price.toLocaleString()} đ</WrapperOriginalPriceText>}
        </WrapperPriceText>
    </Card>
  );
};

export default CardComponent;
