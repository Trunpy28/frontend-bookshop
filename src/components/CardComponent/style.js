import styled from "styled-components";

export const StyledNameProduct = styled.div`
    font-weight: 500;
    font-size: 16px;
    color: #4B4848;
    cursor: pointer;
    height: 50px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    display: -webkit-box;
    &:hover {
        color: #00a651;
    }
`

export const WrapperReportText = styled.div`
    display: flex;
    align-items: center;
    color: #919198;
`

export const WrapperPriceText = styled.div`
    font-size: 18px;
    font-weight: 600;
    color: #E62531;
`

export const WrapperOriginalPriceText = styled.div`
    font-size: 15px;
    font-weight: 500;
    color: #888888;
    text-decoration: line-through;
`