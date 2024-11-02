import React, { useState } from "react";
import { WrapperForm, WrapperInputPage } from "./style";
import { Button, ConfigProvider, Form, Input, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { verifyResetPasswordOTP } from "../../services/UserService";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/LoadingComponent/Loading";

const OTPInput = () => {
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();
  const { email } = useParams();

  const handleOnChangeOTP = (value) => {  
    setOTP(value);
  };

  const mutation = useMutation({
    mutationFn: async ({ email, otp }) => {         
      return verifyResetPasswordOTP(email, otp);
    },
    onSuccess: (data) => {
      const params = new URLSearchParams({ email, verify_token: otp }); //Truyền query vào trong link
      navigate(`/account/recovery/reset-password?${params.toString()}`);
    },
    onError: (error) => {
      message.error(error?.response?.data?.message, 3);
    },
  });

  const { isPending } = mutation;

  const handleSendOTP = (e) => {
    const regex = /^\d{6}$/;
    const ischeckOTP = regex.test(otp);
    if (!ischeckOTP) {
      message.error("OTP không hợp lệ");
      return;
    }
    if (!otp) {
      message.error("Vui lòng nhập OTP");
      return;
    }
    
    mutation.mutate({ email, otp });
  };

  return (
    <div
      style={{
        backgroundColor: "#F0F0F0",
        padding: "30px 30vw",
        minWidth: "fit-content",
      }}
    >
      <Loading isLoading={isPending}>
        <WrapperInputPage>
          <div
            style={{
              color: "black",
              fontSize: "24px",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            Nhập mã xác nhận OTP
          </div>

          <WrapperForm>
            <ConfigProvider
              theme={{
                token: {
                  // Seed Token
                  colorPrimary: "#00b96b",
                },
              }}
            >
              <Form onFinish={handleSendOTP}>
                <Form.Item
                  label="OTP"
                  name="OTP"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mã OTP của bạn!",
                    },
                    {
                      type: "string",
                      pattern: /^\d{6}$/,
                      message: "OTP không hợp lệ!",
                    },
                  ]}
                >
                  <Input.OTP onChange={handleOnChangeOTP} value={otp} size="large"/>
                </Form.Item>

                <Form.Item style={{ textAlign: "center" }}>
                  <Button type="primary" htmlType="submit">
                    Tiếp theo
                  </Button>
                </Form.Item>
              </Form>
            </ConfigProvider>
          </WrapperForm>
        </WrapperInputPage>
      </Loading>
    </div>
  );
};

export default OTPInput;
