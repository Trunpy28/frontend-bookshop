import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperButtonMore = styled.button`
    color: green;
    border: 2px solid green;
    &:hover{
        background-color: green;
        border: none;
        color: white;
        cursor: pointer;
    }

    &:disabled{
        background-color: #919198;
        border: 1px solid #919198;
        cursor: not-allowed;
        color: white;
    }
` 

export const WrapperProducts = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
    flex-wrap: wrap;
`