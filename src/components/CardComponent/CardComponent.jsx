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
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
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
