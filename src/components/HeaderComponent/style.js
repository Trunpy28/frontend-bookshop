import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    background-color: white;
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
    width: 100%;
    padding: 15px 15vw;
`

export const WrapperHeaderButton = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    width: wrap-content;
    cursor: pointer;
    &:hover{
        color: #00b96b;
    }
`
export const WrapperPopupContent = styled.div`
    cursor: pointer;
    font-size: 16px;
    text-align: center;
    padding-top: 15px;
    padding-bottom: 15px;
    width: 200px;
    border-radius: 20px;
    font-weight: bold;
    &:hover{
        color: #00A651;
        background-color: #F5F5F5;
    }
`

export const FieldName = styled.div`
    font-size: 16px;
    color: #555555;
    margin-bottom: 5px;
    width: 120px;
    line-height: 2.2;
    text-align: right;
    margin-right: 5px;
`