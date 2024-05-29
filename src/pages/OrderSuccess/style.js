import { Checkbox, Radio } from "antd";
import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin-top: 15px;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
`;
export const WrapperStyleHeaderDelivery = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
  margin-bottom: 4px;
`;

export const WrapperContainer = styled.div`
  width: 60vw;
  min-width: 50vw;
`;

export const WrapperListOrder = styled.div``;

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const WrapperPriceDiscount = styled.span`
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 4px;
`;
export const WrapperCountOrder = styled.div`
  text-align: center;
  font-size: 16px;
`;

export const WrapperRight = styled.div`
  width: 320px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const WrapperInfo = styled.div`
  padding: 17px 3vw;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  width: 100%;
  font-size: 16px;
`;

export const WrapperTotal = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 17px 20px;
  background: #fff;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
`;

export const CustomCheckbox = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #9255fd;
    border-color: #9255fd;
  }
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: #9255fd;
  }
`;

export const WrapperNameProductOrder = styled.div`
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;
  &:hover {
    color: #00a651;
  }
`;

export const WrapperChangeInfo = styled.div`
  color: #4096FF;
  &:hover {
    color: #00a651;
  }
`

export const Label = styled.span`
  font-size: 16px;
  color: #000;
  font-weight: bold
`

export const WrapperRadio = styled(Radio.Group)`
  margin-top: 6px;
  background: #def9e1;
  border: 1px solid #def9e1;
  width: 100%;
  border-radius: 4px;
  height: 100px;
  padding: 16px;
  font-weight: normal;
  display:flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
`

export const WrapperValue = styled.div`
  background: #def9e1;
  border: 1px solid #def9e1;
  padding: 10px;
  width: fit-content;
  border-radius: 6px;
  margin-top: 5px;
`