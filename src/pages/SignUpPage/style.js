import styled from "styled-components";

export const WrapperButtonSignUp = styled.button`
  padding: 15px 50px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 15px;
  background-color: #00a651;
  color: white;
  width: fit-content;
  border: none;
  &:disabled{
    cursor: not-allowed;
    background-color: #ccc;
  }
`