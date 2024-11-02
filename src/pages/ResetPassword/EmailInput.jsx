import React, { useState } from "react";
import { WrapperForm, WrapperInputPage } from "./style";
import { Button, ConfigProvider, Form, Input, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/LoadingComponent/Loading";

const EmailInput = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const mutation = useMutation({
    mutationFn: async (email) => {
      return forgotPassword(email);
    },
    onSuccess: (data) => {
      message.success(
        "Mail khôi phục mật khẩu đã được gửi tới email của bạn. Vui lòng check email để lấy mã OTP!"
      );
      navigate(`/account/recovery/otp/${email}`);
    },
    onError: (error) => {
      message.error(error?.response?.data?.message, 3);
    },
  });

  const { isPending } = mutation;

  const handleSendEmail = (e) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const ischeckEmail = regex.test(email);
    if (!ischeckEmail) {
      message.error("Email không hợp lệ");
      return;
    }
    if (!email) {
      message.error("Vui lòng nhập email");
      return;
    }
    mutation.mutate(email);
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
            Nhập email đặt lại mật khẩu
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
              <Form onFinish={handleSendEmail}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập email của bạn!",
                    },
                    {
                      type: "email",
                      message: "Email không hợp lệ!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Nhập email"
                    style={{ fontSize: "16px", minWidth: "300px" }}
                    value={email}
                    onChange={handleOnChangeEmail}
                    onPressEnter={handleSendEmail}
                  />
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

export default EmailInput;
