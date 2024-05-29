import styled from "styled-components"

export const WrapperHeaderUser = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const WrapperInfoUser = styled.div`
  .name-info {
    font-size: 16px;
    color: rgb(36, 36, 36);
    font-weight: bold;
    text-transform: uppercase;
    margin-top: 8px;
  }
  .address,.phone-info,.delivery-info,.delivery-fee,.payment-info,.address-info {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    margin-top: 8px;
  }
  .name-delivery {
    color: rgb(234, 133, 0); 
    font-weight: bold;
    text-transform: uppercase;
    font-size: 14px;
  }
  .status-payment {
    margin-top: 10px;
    color: rgb(234, 133, 0);
    font-size: 14px; 
  }
`

export const WrapperLabel = styled.div`
  color: rgb(36, 36, 36);
  font-size: 16px;
  text-transform: uppercase;
  margin-bottom: 15px;
`
export const WrapperContentInfo = styled.div`
  min-height: 130px;
  max-height: 150px;
  width: 22vw;
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
`

export const WrapperStyleContent = styled.div`
  display:flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
  background: rgb(255, 255, 255);
  padding: 17px 3vw;
`

export const WrapperProduct = styled.div`
  display:flex;
  align-items:flex-start;
  margin-top: 10px;
`

export const WrapperNameProduct = styled.div`
  display:flex;
  align-items: flex-start;
  width: 670px;
`

export const WrapperItem = styled.div`
  width: 200px;
  font-weight: bold;
  &:last-child {
    color: red
  }
`
export const WrapperItemLabel = styled.div`
  width: 200px;
  &:last-child {
    font-weight: bold;
  }
`

export const WrapperAllPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end
`

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

export const Label = styled.span`
  font-size: 16px;
  color: #000;
  font-weight: bold
`

export const WrapperNameProductOrder = styled.div`
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;
  &:hover {
    color: #00a651;
  }
`;

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const WrapperCountOrder = styled.div`
  text-align: center;
  font-size: 16px;
`;