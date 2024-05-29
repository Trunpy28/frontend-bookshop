import { ConfigProvider, Form, InputNumber, message } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import {
  Label,
  WrapperInfo,
  WrapperContainer,
  WrapperValue,
  WrapperItemOrder,
  WrapperNameProductOrder,
  WrapperCountOrder,
  WrapperStyleHeader,
} from "./style";
import {} from "@ant-design/icons";

import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../components/LoadingComponent/Loading";
import { orderConstant } from "../../constant";
import { convertPrice } from "../../utils";

const OrderSuccess = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  return (
    <div style={{ background: "#f5f5fa", with: "100%", padding: "30px 15vw" }}>
      <Loading isLoading={false}>
        <div>
          <h3
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            Đặt đơn hàng thành công
          </h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WrapperContainer>
              <WrapperInfo>
                <div>
                  <Label>Phương thức giao hàng</Label>
                  <WrapperValue style={{ marginTop: "10px" }}>
                    {state?.delivery === "fast" && (
                      <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                        Fast{" "}
                      </span>
                    )}
                    {orderConstant.delivery[state?.delivery]}
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Label>Phương thức thanh toán</Label>
                  <WrapperValue style={{ marginTop: "10px" }}>
                    {orderConstant.payment[state?.payment]}
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <Label>Đơn hàng</Label>
                <WrapperStyleHeader>
                  <div style={{ display: "inline-block", width: "40%" }}>
                    <span style={{ fontSize: "16px" }}>
                      Tất cả ({state?.order?.length} sản phẩm)
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "60%",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "16px",
                        width: "30%",
                        textAlign: "center",
                      }}
                    >
                      Đơn giá
                    </div>
                    <div
                      style={{
                        fontSize: "16px",
                        width: "30%",
                        textAlign: "center",
                      }}
                    >
                      Số lượng
                    </div>
                    <div
                      style={{
                        fontSize: "16px",
                        width: "30%",
                        textAlign: "right",
                      }}
                    >
                      Tạm tính
                    </div>
                  </div>
                </WrapperStyleHeader>
                {state?.order?.map((orderItem) => {
                  return (
                    <WrapperItemOrder key={orderItem?.product}>
                      <div
                        style={{
                          width: "40%",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          paddingRight: "10px",
                        }}
                      >
                        <img
                          src={orderItem?.image}
                          style={{
                            width: "80px",
                            height: "120px",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            navigate(`/product-details/${orderItem?.product}`);
                          }}
                        />
                        <WrapperNameProductOrder
                          style={{
                            fontSize: "16px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            navigate(`/product-details/${orderItem?.product}`);
                          }}
                        >
                          {orderItem?.name}
                        </WrapperNameProductOrder>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "60%",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "16px",
                            width: "30%",
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "#333333",
                          }}
                        >
                          <span style={{ fontSize: "16px", color: "#242424" }}>
                            {convertPrice(orderItem?.price)}
                          </span>
                        </div>
                        <WrapperCountOrder style={{ width: "30%" }}>
                          {orderItem?.amount}
                        </WrapperCountOrder>
                        <div
                          style={{
                            fontSize: "16px",
                            width: "30%",
                            textAlign: "right",
                            color: "#CD3238",
                            fontWeight: "bold",
                          }}
                        >
                          {convertPrice(orderItem?.price * orderItem?.amount)}
                        </div>
                      </div>
                    </WrapperItemOrder>
                  );
                })}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                  }}
                >
                  <div style={{ fontSize: "16px", marginTop: "30px" }}>
                    Tạm tính: {"  "}
                    <span
                      style={{
                        fontSize: "16px",
                        width: "30%",
                        textAlign: "center",
                        color: "#24242B",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(state?.tempPrice)}
                    </span>
                  </div>
                  <div style={{ fontSize: "16px", marginTop: "10px" }}>
                    Phí vận chuyển: {"  "}
                    <span
                      style={{
                        fontSize: "16px",
                        width: "30%",
                        textAlign: "center",
                        color: "#24242B",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(state?.shippingPrice)}
                    </span>
                  </div>
                  <div style={{ fontSize: "16px", marginTop: "10px" }}>
                    Tổng tiền: {"  "}
                    <span
                      style={{
                        fontSize: "18px",
                        width: "30%",
                        textAlign: "center",
                        color: "#CD3238",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(state?.totalPrice)}
                    </span>
                  </div>
                </div>
              </WrapperInfo>
            </WrapperContainer>
          </div>
        </div>
      </Loading>
    </div>
  );
};

export default OrderSuccess;
