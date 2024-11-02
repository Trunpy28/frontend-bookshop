import React, { useEffect, useState } from "react";
import { WrapperForm, WrapperInputPage } from "./style";
import { Button, ConfigProvider, Form, Input, message } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { resetPassword, verifyResetPasswordOTP } from "../../services/UserService";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../../components/LoadingComponent/Loading";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tokenValid, setTokenValid] = useState(true); // To check if OTP is valid
  const [countdown, setCountdown] = useState(10);  // 10 seconds countdown
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const otp = searchParams.get("verify_token");

  const navigate = useNavigate();

  // Validate OTP token
  const validateTokenQuery = useQuery({
    queryFn: async () => verifyResetPasswordOTP(email, otp),
    enabled: !!email && !!otp,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Reset password mutation
  const mutation = useMutation({
    mutationFn: async ({ email, otp, password }) => resetPassword(email, otp, password),
    onSuccess: () => {
      message.success("Mật khẩu đã đặt lại thành công!", 3);
      navigate("/sign-in");
    },
    onError: (error) => {
      message.error(error?.response?.data?.message, 3);
    },
  });

  const { isPending } = mutation;
  const { isPending: isPendingValidateToken, isError: isErrorValidateToken } = validateTokenQuery;

  const handleResetPassword = () => {
    mutation.mutate({ email, otp, password });
  };

  // Start the countdown and navigate after 10 seconds if OTP is invalid
  useEffect(() => {
    if (isErrorValidateToken) {
      setTokenValid(false);  // Set token to invalid
      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : prev));  // Decrease countdown every second
      }, 1000);

      // Redirect to home after 10 seconds
      const timeout = setTimeout(() => {
        navigate("/");
      }, 10000);

      return () => {
        clearInterval(timer);
        clearTimeout(timeout);
      };
    }
  }, [isErrorValidateToken, navigate]);

  return (
    <div
      style={{
        backgroundColor: "#F0F0F0",
        padding: "30px 30vw",
        minWidth: "fit-content",
      }}
    >
      <Loading isLoading={isPending || isPendingValidateToken}>
        <WrapperInputPage>
          {!tokenValid ? (
            // Display countdown and expired message when OTP is invalid
            <div style={{ color: "red", fontSize: "20px", textAlign: "center", padding: "20px 30px"}}>
              OTP không hợp lệ! Bạn sẽ được chuyển về trang chủ trong {countdown} giây.
            </div>
          ) : (
            // Form to reset password if OTP is valid
            <>
              <div
                style={{
                  color: "black",
                  fontSize: "24px",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Nhập mật khẩu mới của bạn
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
                  <Form
                    onFinish={handleResetPassword}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    validateTrigger="onSubmit"
                  >
                    <Form.Item
                      label="Mật khẩu"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mật khẩu của bạn!",
                        },
                        {
                          pattern: /^.{8,}$/,
                          message: "Mật khẩu phải chứa ít nhất 8 ký tự!",
                        },
                      ]}
                    >
                      <Input.Password
                        style={{ fontSize: "16px", minWidth: "300px" }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Xác nhận mật khẩu"
                      name="confirmPassword"
                      dependencies={["password"]}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mật khẩu xác nhận của bạn!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("Mật khẩu xác nhận không khớp!")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        style={{ fontSize: "16px", minWidth: "300px" }}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item style={{ display: "flex", justifyContent: "center" }}>
                      <Button type="primary" htmlType="submit">
                        Xác nhận
                      </Button>
                    </Form.Item>
                  </Form>
                </ConfigProvider>
              </WrapperForm>
            </>
          )}
        </WrapperInputPage>
      </Loading>
    </div>
  );
};

export default ResetPassword;
