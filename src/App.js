import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import * as UserService from "./services/UserService";
import { useDispatch } from "react-redux";
import { updateUser } from "./redux/slices/userSlice";

function App() {
  const dispatch = useDispatch();

  //Lấy thông tin user
  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetaislUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  //Xử lý access token nằm trong localStorage
  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded;
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  //Chạy 1 lần để lấy thông tin user
  useEffect(() => {
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded.id, storageData);
    }
  }, []);

  //Kiểm tra access_token hết hạn trước khi thực thi request , đặt access token mới vào config
  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      // Do something before request is sent
      const currentTime = new Date();
      const { decoded } = handleDecoded();

      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
