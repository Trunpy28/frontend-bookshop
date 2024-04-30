import React from "react";
import { Card } from "antd";
import {StarFilled} from '@ant-design/icons';
import { StyledNameProduct, WrapperOriginalPriceText, WrapperPriceText, WrapperReportText } from "./style";


const CardComponent = () => {
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
        <StyledNameProduct>Giáo trình Python</StyledNameProduct>
        <WrapperReportText>
            <span>
                <span>4.8 <StarFilled style={{fontSize: '14px',color:'#FFC70D'}}/> </span>
            </span>
            <span>| Đã bán 1000+</span>
        </WrapperReportText>
        <WrapperPriceText>
            128.000 đ   <WrapperOriginalPriceText>135.000 đ</WrapperOriginalPriceText>
        </WrapperPriceText>
    </Card>
  );
};

export default CardComponent;
