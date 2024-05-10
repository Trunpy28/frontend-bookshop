import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    font-size: 22px;
    margin: 5px 0;
`

export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    width: 100%;
    justify-content: center;
    padding: 30px 50px;
    width: fit-content;
`
export const WrapperInputField = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
`

export const ChangingButton = styled.button`
    width: 100px;
    height: 35px;
    border-radius: 10px;
    border: 1px solid #00A651;
    background-color: white;
    cursor: pointer;
    color: #00A651;
    padding: 5px 10px;
    textAlign: center;
    font-weight: bold;
    font-size: 16px;
    margin-left: 30px;
`

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 64px;
        height: 64px;
        border-radius: 50%;
    }
`
