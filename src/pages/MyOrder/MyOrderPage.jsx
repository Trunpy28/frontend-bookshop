import { Button, ConfigProvider, Form, InputNumber, message } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import {
  WrapperContainer,
  WrapperItemOrder,
  WrapperListOrder,
  WrapperHeaderItem,
  WrapperStatus,
  WrapperFooterItem,
} from "./style";
import { ContainerOutlined } from "@ant-design/icons";
import * as OrderService from "../../services/OrderService";

import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../components/LoadingComponent/Loading";
import { convertPrice } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useMutationHooks } from '../../hooks/useMutationHook';

const MyOrderPage = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const fetchMyOrders = async () => {
    const res = await OrderService.getOrdersByUserId(state?.id, state?.token);
    return res.data;
  };

  const queryOrder = useQuery({
    queryKey: ["orders"],
    queryFn: fetchMyOrders,
    enabled: !!state?.id && !!state?.token,
  });

  const { isPending, data } = queryOrder;

  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
        token: state?.token,
      },
    });
  };

  const mutation = useMutationHooks((data) => {
    const { id, token, orderItems, userId } = data;
    const res = OrderService.cancelOrder(id, token, orderItems, userId);
    return res;
  });

  const handleCanceOrder = (order) => {
    mutation.mutate(
      {
        id: order._id,
        token: state?.token,
        orderItems: order?.orderItems,
        userId: user.id,
      },
      {
        onSuccess: () => {
          queryOrder.refetch();
        },
      }
    );
  };
  const {
    isPending: isLoadingCancel,
    isSuccess: isSuccessCancel,
    isError: isErrorCancle,
    data: dataCancel,
  } = mutation;

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === "OK") {
      message.success("Hủy đơn hàng thành công!");
    } else if (isSuccessCancel && dataCancel?.status === "ERR") {
      message.error("Hủy đơn hàng thất bại!");
    } else if (isErrorCancle) {
      message.error("Hủy đơn hàng thất bại!");
    }
  }, [isErrorCancle, isSuccessCancel]);

  const renderProduct = (data) => {
    return data?.map((order) => {
      return (
        <WrapperHeaderItem key={order?._id}>
          <img
            src={order?.image}
            style={{
              width: "70px",
              height: "105px",
              objectFit: "cover",
              border: "1px solid rgb(238, 238, 238)",
              padding: "2px",
            }}
          />
          <div
            style={{
              width: "50%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginLeft: "10px",
              fontSize: "16px",
            }}
          >
            {order?.name}
          </div>
          <span
            style={{ fontSize: "16px", color: "#242424", marginLeft: "auto" }}
          >
            {convertPrice(order?.price)}
          </span>
        </WrapperHeaderItem>
      );
    });
  };

  return (
    <Loading isLoading={isPending || isLoadingCancel}>
      <WrapperContainer>
        <div
          style={{ background: "#f5f5fa", with: "100%", padding: "30px 15vw" }}
        >
          <h3
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            Đơn hàng của tôi
          </h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {data?.length > 0 ? (
              <WrapperListOrder>
                {data?.map((order) => {
                  return (
                    <WrapperItemOrder key={order?._id}>
                      <WrapperStatus>
                        <span style={{ fontWeight: "bold" }}>Trạng thái</span>
                        <div>
                          <span style={{ color: "#38383D" }}>Giao hàng: </span>
                          <span
                            style={{ color: "#00A651", fontWeight: "bold" }}
                          >{`${
                            order.isDelivered
                              ? "Đã giao hàng"
                              : "Chưa giao hàng"
                          }`}</span>
                        </div>
                        <div>
                          <span style={{ color: "#38383D" }}>Thanh toán: </span>
                          <span
                            style={{ color: "#00A651", fontWeight: "bold" }}
                          >{`${
                            order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"
                          }`}</span>
                        </div>
                      </WrapperStatus>
                      {renderProduct(order?.orderItems)}
                      <WrapperFooterItem>
                        <div>
                          <span style={{ color: "#808089" }}>Tổng tiền: </span>
                          <span
                            style={{
                              fontSize: "16px",
                              color: "#38383D",
                              fontWeight: 700,
                            }}
                          >
                            {convertPrice(order?.totalPrice)}
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                          {!data?.isDelivered && !data?.isPaid && (
                            <ButtonComponent
                              onClick={() => handleCanceOrder(order)}
                              size={40}
                              styleButton={{
                                height: "36px",
                                border: "1px solid #00b20b",
                                borderRadius: "4px",
                              }}
                              textbutton={"Hủy đơn hàng"}
                              styleTextButton={{
                                color: "#00b20b",
                                fontSize: "14px",
                              }}
                            ></ButtonComponent>
                          )}
                          <ButtonComponent
                            onClick={() => handleDetailsOrder(order?._id)}
                            size={40}
                            styleButton={{
                              height: "36px",
                              border: "1px solid #00b20b",
                              borderRadius: "4px",
                            }}
                            textbutton={"Xem chi tiết"}
                            styleTextButton={{
                              color: "#00b20b",
                              fontSize: "14px",
                            }}
                          ></ButtonComponent>
                        </div>
                      </WrapperFooterItem>
                    </WrapperItemOrder>
                  );
                })}
              </WrapperListOrder>
            ) : (
              <WrapperListOrder
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    color: "#8d8d8e",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ContainerOutlined style={{ fontSize: "100px" }} />
                  Bạn chưa có đơn hàng nào!
                </div>
              </WrapperListOrder>
            )}
          </div>
        </div>
      </WrapperContainer>
    </Loading>
  );
};

export default MyOrderPage;
