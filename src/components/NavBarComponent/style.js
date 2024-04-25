import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: white;
    width: fit-content;
`

export const BigLabel = styled.div`
    font-size: 18px;
    font-weight: 600;
    color: white;
    border-bottom: 1px solid #EAEAEA;
    background-color: #29903B;
    padding: 15px 30px;
`

export const TypeLink = styled(Link)`
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    text-decoration: none;
    padding: 5px 30px;
    &:hover{
        color: #00A651;
    }
`

export const TypeList = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const FilterByLabel = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    border-radius: 20px;
    width: 100%;
    background-color: #EEEEEE;
    padding: 10px 20px;
`

export const FilterByGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    padding: 10px 10px;
`

