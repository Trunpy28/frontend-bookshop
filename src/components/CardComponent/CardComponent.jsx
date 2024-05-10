import React from "react";
import { Card } from "antd";
import {StarFilled} from '@ant-design/icons';
import { StyledNameProduct, WrapperOriginalPriceText, WrapperPriceText, WrapperReportText } from "./style";


const CardComponent = (props) => {
  const { image, name, price, rating, discount, selled} = props;
  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={
        <img
          alt="example"
          src="https://k3bxzjut8xobj.vcdn.cloud/Book/thumb-fa1521be-4c3b-42e0-bec3-bdc10ea5f58f.jpg"
        />
      }
    >
        <StyledNameProduct>{name}</StyledNameProduct>
        <WrapperReportText>
            <span>
                <span>{rating} <StarFilled style={{fontSize: '14px',color:'#FFC70D'}}/> </span>
            </span>
            <span>| Đã bán {selled || 0}</span>
        </WrapperReportText>
        <WrapperPriceText>
            {discount} đ  {(discount < price) && <WrapperOriginalPriceText>{price} đ</WrapperOriginalPriceText>}
        </WrapperPriceText>
    </Card>
  );
};

export default CardComponent;
