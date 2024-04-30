import React, { useEffect, useState } from "react";
import {
  WrapperInputField,
  WrapperSignInUpForm,
  WrapperSignInUpPage,
} from "../../components/SignInUpComponent/style";
import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { WrapperButtonSignUp } from "./style";
import * as UserService from '../../services/UserService';
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from'../../components/Message/Message';

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const mutation = useMutationHooks(
    data => UserService.signUpUser(data)
  );

  const {data, isPending, isSuccess,isError} = mutation

  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      message.success('Đăng ký thành công');
      navigate('/sign-in');
    }
    else if(isError || data?.status === 'ERR'){
      message.error('Đăng ký thất bại');
    }
  },[isSuccess,isError])

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleOnChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignUp = (e) => {
    mutation.mutate({
      email: email,
      password: password,
      confirmPassword: confirmPassword
    })
    console.log("sign-up:", email, password, confirmPassword);
  };

  return (
    <div style={{ backgroundColor: "#F0F0F0", padding: "30px 30vw", minWidth:'fit-content'}}>
      <WrapperSignInUpPage>
        <div
          style={{
            color: "black",
            fontSize: "24px",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          ĐĂNG KÝ
        </div>
        <WrapperSignInUpForm>
          <Form>
            <WrapperInputField>
              <div
                style={{
                  fontSize: "16px",
                  color: "#555555",
                  marginBottom: "5px",
                }}
              >
                Email
              </div>
              <Form.Item name="username">
                <Input
                  style={{ fontSize: "16px", minWidth: "300px" }}
                  value={email}
                  onChange={handleOnChangeEmail}
                />
              </Form.Item>
            </WrapperInputField>

            <WrapperInputField>
              <div
                style={{
                  fontSize: "16px",
                  color: "#555555",
                  marginBottom: "5px",
                }}
              >
                Mật khẩu
              </div>
              <Form.Item name="password">
                <Input.Password
                  value={password}
                  style={{ fontSize: "16px", minWidth: "300px" }}
                  onChange={handleOnChangePassword}
                />
              </Form.Item>
            </WrapperInputField>

            <WrapperInputField>
              <div
                style={{
                  fontSize: "16px",
                  color: "#555555",
                  marginBottom: "5px",
                }}
              >
                Xác nhận mật khẩu
              </div>
              <Form.Item name="confirm-password">
                <Input.Password
                  value={confirmPassword}
                  style={{ fontSize: "16px", minWidth: "300px" }}
                  onChange={handleOnChangeConfirmPassword}
                />
              </Form.Item>
            </WrapperInputField>
            {data?.status === 'ERR' && <div style={{color: 'red', marginBottom: '20px', fontSize:'14px'}}>{data?.message}</div>}
          </Form>

          <div
            style={{
              fontSize: "14px",
              gap: "5px",
              display: "flex",
              width: "100%",
            }}
          >
            <span>Bạn đã có tài khoản?</span>
            <Link
              style={{
                textDecoration: "none",
                color: "blue",
                alignSelf: "start",
              }}
              to={"/sign-in"}
            >
              Đăng nhập
            </Link>
          </div>
        </WrapperSignInUpForm>

        <Loading isLoading={isPending}>
          <WrapperButtonSignUp
            onClick={handleSignUp}
            disabled={email.length < 1 || password.length < 1 || confirmPassword.length < 1}
          >
            Đăng ký
          </WrapperButtonSignUp>
        </Loading>
      </WrapperSignInUpPage>
    </div>
  );
};

export default SignUpPage;
