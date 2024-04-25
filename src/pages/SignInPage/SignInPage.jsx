import React from "react";
import {
  WrapperInputField,
  WrapperSignInUpForm,
  WrapperSignInUpPage,
} from "../../components/SignInUpComponent/style";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { WrapperButtonSignIn } from "./style";

const SignInPage = () => {
  return (
    <div style={{ backgroundColor: "#F0F0F0", padding: "30px 30vw" }}>
      <WrapperSignInUpPage>
        <div
          style={{
            color: "black",
            fontSize: "24px",
            fontWeight: "500",
            textAlign: "center"
          }}
        >
          ĐĂNG NHẬP
        </div>
        <WrapperSignInUpForm>
          <Form>
            <WrapperInputField>
              <div style={{ fontSize: "16px", color: "#555555",marginBottom:'5px' }}>Email</div>
            </WrapperInputField>
            <Form.Item
              name="username"
            >
              <Input placeholder="Nhập email" style={{fontSize: '16px', width: '20vw'}}/>
            </Form.Item>

            <WrapperInputField>
              <div style={{ fontSize: "16px", color: "#555555",marginBottom:'5px' }}>Mật khẩu</div>
            </WrapperInputField>
            <Form.Item
              name="password"
            >
              <Input.Password placeholder="Nhập mật khẩu"/>
            </Form.Item>
          </Form>

          <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
            <Link style={{fontSize:'14px',textDecoration:'none',color:'blue',alignSelf:'start'}}>
              Đăng ký
            </Link>
            <Link
              style={{fontSize:'14px',textDecoration:'none',color:'red',alignSelf:'end'}}>
                Quên mật khẩu?
            </Link>
          </div>
        </WrapperSignInUpForm>
        <WrapperButtonSignIn>Đăng nhập</WrapperButtonSignIn>
      </WrapperSignInUpPage>
    </div>
  );
};

export default SignInPage;
