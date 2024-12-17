import axios from "axios";

//Mỗi lần gọi đều đi qua
export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/sign-in`,
    data, {
      withCredentials: true
    }
  );
  return res.data;
};

export const signUpUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/sign-up`,
    data
  );
  return res.data;
};

export const getDetailsUser = async (id, access_token) => {
  try {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/user/get-details/${id}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  }
  catch (error) {
    console.log(error);
  }
};

export const getAllUser = async (access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/user/get-all`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const refreshToken = async () => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/refresh-token`,
      {},
      {
        withCredentials: true, //Tự động lấy cookie(refresh_token) đính vào req
      }
    );
    return res.data;
  }
  catch (error) {
    console.log(error);
  }
};

export const logoutUser = async () => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`);
  return res.data;
};

export const updateUser = async (id,access_token,data) => {
  const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`,data,{
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteUser = async (id,access_token) => {
  const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/delete-user/${id}`,{
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteManyUser = async (data,access_token) => {
  const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/user/delete-many`,data,{
      headers: {
        token: `Bearer ${access_token}`,
      },
  });
  return res.data;
};

export const forgotPassword = async (email) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/forgot-password/${email}`);
  return res.data;
}

export const verifyResetPasswordOTP = async (email, otp) => {
  console.log(otp);
  
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/verify-reset-password-token/${email}`, {
    OTP: otp
  });
  return res.data;
}

export const resetPassword = async (email, otp, password) => {
  console.log(email, otp, password);
  
  const res = await axios.patch(`${process.env.REACT_APP_API_URL}/user/reset-password`, {
    email,
    verify_code: otp,
    password
  });
  return res.data;
}