import React from "react";
import {
  Label,
  WrapperAllPrice,
  WrapperContentInfo,
  WrapperCountOrder,
  WrapperHeaderUser,
  WrapperInfoUser,
  WrapperItem,
  WrapperItemLabel,
  WrapperItemOrder,
  WrapperLabel,
  WrapperNameProduct,
  WrapperNameProductOrder,
  WrapperProduct,
  WrapperStyleContent,
  WrapperStyleHeader,
} from "./style";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { orderConstant } from "../../constant";
import { convertPrice } from "../../utils";
import { useMemo } from "react";
import Loading from "../../components/LoadingComponent/Loading";

const DetailsOrderPage = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { id } = params;

  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.token);
    return res.data;
  };

  const queryOrder = useQuery({
    queryKey: ["orders-details"],
    queryFn: fetchDetailsOrder,
    enabled: !!id,
  });
  const { isPending, data } = queryOrder;

  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [data]);

  return (
    <Loading isLoading={isPending}>
      <div
        style={{ width: "100vw", background: "#f5f5fa", padding: "30px 15vw" }}
      >
        <div>
          <h3
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              marginBottom: "16px",
            }}
          >
            Chi tiết đơn hàng #{id} {data?.isCancelled ? "(Đã hủy)" : ""}
          </h3>
          <WrapperHeaderUser>
            <WrapperInfoUser>
              <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
              <WrapperContentInfo>
                <div className="name-info">
                  {data?.shippingAddress?.fullName}
                </div>
                <div className="address-info">
                  <span>Địa chỉ: </span> {`${data?.shippingAddress?.address}`}
                </div>
                <div className="phone-info">
                  <span>Điện thoại: </span> {data?.shippingAddress?.phone}
                </div>
              </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
              <WrapperLabel>Hình thức giao hàng</WrapperLabel>
              <WrapperContentInfo>
                <div className="delivery-info">
                  {data?.deliveryMethod === "fast" && (
                    <span className="name-delivery">FAST </span>
                  )}
                  {orderConstant.delivery[data?.deliveryMethod]}
                </div>
                <div className="delivery-fee">
                  <span>Phí giao hàng: </span> {data?.shippingPrice}đ
                </div>
              </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
              <WrapperLabel>Hình thức thanh toán</WrapperLabel>
              <WrapperContentInfo>
                <div className="payment-info">
                  {orderConstant.payment[data?.paymentMethod]}
                </div>
                <div className="status-payment">
                  {data?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                </div>
              </WrapperContentInfo>
            </WrapperInfoUser>
          </WrapperHeaderUser>
          <WrapperStyleContent>
            <Label>Đơn hàng</Label>
            <WrapperStyleHeader>
              <div style={{ display: "inline-block", width: "40%" }}>
                <span style={{ fontSize: "16px" }}>
                  Tất cả ({data?.orderItems?.length} sản phẩm)
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
            {data?.orderItems?.map((orderItem) => {
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
                  {convertPrice(priceMemo)}
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
                  {convertPrice(data?.shippingPrice)}
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
                  {convertPrice(data?.totalPrice)}
                </span>
              </div>
            </div>
          </WrapperStyleContent>
        </div>
      </div>
    </Loading>
  );
};

export default DetailsOrderPage;
