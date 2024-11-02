import React, { useEffect, useState } from "react";
import {
  WrapperInputField,
  WrapperSignInUpForm,
  WrapperSignInUpPage,
} from "../../components/SignInUpComponent/style";
import { Form, Input } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { WrapperButtonSignIn } from "./style";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { jwtDecode } from "jwt-decode";
import {useDispatch} from 'react-redux';
import { updateUser } from "../../redux/slices/userSlice";

const SignInPage = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const mutation = useMutationHooks(async (data) => await UserService.loginUser(data));

  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success("Đăng nhập thành công");
      localStorage.setItem('access_token', JSON.stringify(data?.access_token));
      
      if(data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if(decoded?.id){
          handleGetDetailsUser(decoded.id, data?.access_token);
        }
      }
      if(location?.state){
        navigate(location?.state);
      }else {
        navigate("/");
      }
    } else if (isError || data?.status === "ERR") {
      message.error("Đăng nhập thất bại");
    }
  }, [isSuccess, isError]);

  const handleGetDetailsUser = async (id,token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({...res?.data, access_token: token}));
  }

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = (e) => {
    mutation.mutate({
      email: email,
      password: password,
    });
  };

  return (
    <div style={{ backgroundColor: "#F0F0F0", padding: "30px 30vw", minWidth:'fit-content'}}>
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
                  placeholder="Nhập email"
                  style={{ fontSize: "16px", minWidth: "300px" }}
                  value={email}
                  onChange={handleOnChangeEmail}
                  onPressEnter={handleSignIn}
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
                  placeholder="Nhập mật khẩu"
                  value={password}
                  style={{ fontSize: "16px", minWidth: "300px" }}
                  onChange={handleOnChangePassword}
                  onPressEnter={handleSignIn}
                />
              </Form.Item>
            </WrapperInputField>
            {data?.status === "ERR" && (
              <div
                style={{ color: "red", marginBottom: "20px", fontSize: "14px" }}
              >
                {data?.message}
              </div>
            )}
          </Form>

          <div
            style={{
              display: "flex",
              width: "100%",
            }}
          >
            <Link
              style={{
                fontSize: "16px",
                textDecoration: "none",
                color: "red",
                alignSelf: "end",
                marginBottom: "20px"
              }}
              to={"/account/recovery"}
            >
              Quên mật khẩu?
            </Link>
          </div>

          <Loading isLoading={isPending}>
            <WrapperButtonSignIn
              onClick={handleSignIn}
              disabled={email.length < 1 || password.length < 1}
            >
              Đăng nhập
            </WrapperButtonSignIn>
          </Loading>
          <div
            style={{
              display: "flex",
              fontSize: "16px",
              alignSelf: "start",
              gap: "5px",
              marginTop: "50px",
              marginBottom: "20px",
            }}
          >
            Chưa có tài khoản?
            <Link
              style={{
                fontSize: "16px",
                textDecoration: "none",
                color: "blue",
              }}
              to={"/sign-up"}
            >
              Đăng ký
            </Link>
          </div>
        </WrapperSignInUpForm>
      </WrapperSignInUpPage>
    </div>
  );
};

export default SignInPage;
