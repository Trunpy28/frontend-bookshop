import styled from "styled-components";
import { Col, Image, InputNumber } from "antd";

export const WrapperStyleNameProduct = styled.h1`
  font-size: 22px;
  line-height: 1.2;
  margin-bottom: 5px;
  color: #3d3d3d;
  font-weight: 600;
`;
export const WrapperStyleTextSale = styled.span`
  font-size: 14px;
  line-height: 1.2;
  color: rgb(120, 120, 120);
`;

export const RatingText = styled.div`
  font-size: 15px;
  font-weight: 500;
  font-family: Inter, Helvetica, Arial, sans-serif;
`;
export const WrapperPrice = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const WrapperPriceText = styled.h1`
  font-size: 26px;
  color: #00a651;
  font-weight: bold;
`;

export const WrapperOriginalPriceText = styled.h2`
  font-size: 20px;
  color: #999999;
  font-weight: 400;
  vertical-align: middle;
  text-decoration: line-through;
  margin-top: 5px;
`;

export const WrapperStatus = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 40px;
  align-items: center;
  font-size: 16px;
`;

export const StatusInStockText = styled.div`
  font-size: 16px;
  color: white;
  text-align: center;
  padding: 5px 10px;
  background-color: #00b96b;
  border-radius: 5px;
`;

export const StatusNotInStockText = styled.div`
  font-size: 16px;
  color: white;
  text-align: center;
  padding: 5px 10px;
  background-color: #E62531;
  border-radius: 5px;
`;

export const WrapperQuantity = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 30px;
  align-items: center;
  font-size: 16px;
`;


export const WrapperButtonAddToCart = styled.button`
  margin-top: 30px;
  padding: 15px 20px;
  background-color: white;
  border: 2px solid #00a651;
  font-size: 18px;
  font-weight: bold;
  color: #00a651;
  cursor: pointer;
  border-radius: 30px;
  width: fit-content;
  &:hover{
    background-color: #00a651;
    color: white;
  }
  &:disabled{
    cursor: not-allowed;
  }
`

export const WrapperAuthor = styled.div`
  font-size: 16px;
  color: black;
  font-weight: 400;
  vertical-align: middle;
  margin-top: 15px;
`

export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm {
        width: 40px;
        border-top: none;
        border-bottom: none;
        .ant-input-number-handler-wrap {
            display: none !important;
        }
    };
`