import { Link } from "react-router-dom";
import styled from "styled-components";

export const TypeProductWrapper = styled.div`
    display: flex;
    padding-left: 15vw;
    padding-right: 15vw;
    background-color: #00A651;
`
    
export const LinkNavBar = styled(Link)`
    text-decoration: none;
    padding: 20px 20px;
    font-size: 16px;
    font-weight: 600;
    color: white;
    &:hover{
        background-color: #0C6136;
    }
`