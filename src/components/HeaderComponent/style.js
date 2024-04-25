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
