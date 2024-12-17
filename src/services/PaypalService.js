import { axiosJWT } from "./UserService";

// Tạo order PayPal
export const createPayPalOrder = async ({ amount, currency, accessToken, userId }) => {
  const response = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/paypal/create-order/${userId}`,
    {
      amount,
      currency,
    },
    {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data; // Trả về dữ liệu order
};

// Xác nhận thanh toán PayPal
export const capturePayPalOrder = async ({ paymentId, orderId, accessToken, userId }) => {
  const response = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/paypal/capture-order/user/${userId}/order/${orderId}`,
    { paymentId },
    {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data; // Trả về dữ liệu xác nhận thanh toán
};
