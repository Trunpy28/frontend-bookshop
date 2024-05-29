import { Form, Radio, message } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import {
  Label,
  WrapperChangeInfo,
  WrapperInfo,
  WrapperLeft,
  WrapperRadio,
  WrapperRight,
  WrapperTotal,
} from "./style";
import {} from "@ant-design/icons";

import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  clearOrder,
  decreaseAmount,
  increaseAmount,
  removeAllOrderProduct,
  removeOrderProduct,
  selectedOrder,
} from "../../redux/slices/orderSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as OrderService from "../../services/OrderService";
import Loading from "../../components/LoadingComponent/Loading";
import { orderConstant } from "../../constant";

const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const location = useLocation();

  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: location?.state?.stateUserDetails?.name,
    phone: location?.state?.stateUserDetails?.phone,
    address: location?.state?.stateUserDetails?.address,
  });

  const [delivery, setDelivery] = useState("save-money");
  const [payment, setPayment] = useState("later_money");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutationAddOrder = useMutationHooks(async (data) => {
    const { token, ...rests } = data;
    const res = await OrderService.createOrder(token, { ...rests });
    return res;
  });

  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      form.setFieldsValue(stateUserDetails);
    }
  }, [form, isOpenModalUpdateInfo]);

  const handleChangeInfo = () => {
    setIsOpenModalUpdateInfo(true);
  };

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, current) => {
      return total + current?.price * current?.amount;
    }, 0);
    return result;
  }, [order]);

  const deliveryPriceMemo = useMemo(() => {
    let deliveryPrice = 0;
    if (priceMemo >= 100000 && priceMemo < 200000) {
      deliveryPrice = 20000;
    } else if (priceMemo >= 200000 && priceMemo < 500000) {
      deliveryPrice = 10000;
    } else if (priceMemo >= 500000 || order?.orderItemsSelected?.length === 0) {
      deliveryPrice = 0;
    } else {
      deliveryPrice = 25000;
    }
    return deliveryPrice + orderConstant.shippingAdd[delivery];
  }, [priceMemo, delivery]);

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) + Number(deliveryPriceMemo);
  }, [priceMemo, deliveryPriceMemo]);

  const handleAddOrder = () => {
    if (
      user?.access_token &&
      order?.orderItemsSelected &&
      user?.name &&
      user?.address &&
      user?.phone &&
      priceMemo &&
      user?.id
    ) {
      mutationAddOrder.mutate({
        token: user?.access_token,
        orderItems: order?.orderItemsSelected,
        fullName: stateUserDetails?.name,
        address: stateUserDetails?.address,
        phone: stateUserDetails?.phone,
        deliveryMethod: delivery,
        paymentMethod: payment,
        itemsPrice: priceMemo,
        shippingPrice: deliveryPriceMemo,
        totalPrice: totalPriceMemo,
        user: user?.id,
        // isPaid : false,
        // paidAt: details.update_time,
      });
    }
  };

  const {
    isPending: isLoadingAddOrder,
    data: dataAdd,
    isSuccess,
    isError,
  } = mutationAddOrder;

  useEffect(() => {
    if (isSuccess && dataAdd?.status === "OK") {
      // const arrayOrdered = []
      // order?.orderItemsSlected?.forEach(element => {
      //   arrayOrdered.push(element.product)
      // });
      // dispatch(removeAllOrderProduct({listChecked: arrayOrdered}))
      message.success("Đặt hàng thành công!");
      const arrayOrdered = []
      order?.orderItemsSelected?.forEach(element => {
        arrayOrdered.push(element.product)
      });

      dispatch(clearOrder({listChecked: arrayOrdered}));
      
      navigate("/order-success", {
        state: {
          delivery,
          payment,
          order: order?.orderItemsSelected,
          tempPrice: priceMemo,
          shippingPrice: deliveryPriceMemo,
          totalPrice: totalPriceMemo,
        },
      });
    } else if (isError || dataAdd?.status === "ERR") {
      message.error("Đặt hàng thất bại!");
    }
  }, [isSuccess, isError]);

  const handleCancelUpdate = () => {
    setIsOpenModalUpdateInfo(false);
    setStateUserDetails({
      name: user?.name,
      phone: user?.phone,
      address: user?.address,
    });
  };

  const handleUpdateInfoUser = () => {
    const { name, address, phone } = stateUserDetails;
    setIsOpenModalUpdateInfo(false);
  };

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelivery = (e) => {
    setDelivery(e.target.value);
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  return (
    <div style={{ background: "#f5f5fa", with: "100%", padding: "30px 15vw" }}>
      <Loading isLoading={isLoadingAddOrder}>
        <div>
          <h3
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              marginBottom: "16px",
            }}
          >
            Thanh toán
          </h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WrapperLeft>
              <WrapperInfo>
                <div>
                  <Label>Chọn phương thức giao hàng</Label>
                  <WrapperRadio onChange={handleDelivery} value={delivery}>
                    <Radio value="save-money">Giao hàng tiết kiệm</Radio>
                    <Radio value="fast">
                      <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                        FAST
                      </span>{" "}
                      Giao hàng nhanh{" "}
                      <span
                        style={{
                          fontSize: "16px",
                          width: "30%",
                          textAlign: "center",
                          color: "#CD3238",
                          fontWeight: "bold",
                        }}
                      >
                        +10K
                      </span>
                    </Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Label>Chọn phương thức thanh toán</Label>
                  <WrapperRadio onChange={handlePayment} value={payment}>
                    <Radio value="later_money">
                      {" "}
                      Thanh toán tiền mặt khi nhận hàng
                    </Radio>
                    <Radio value="paypal"> Thanh toán tiền bằng paypal</Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
            </WrapperLeft>
            <WrapperRight>
              <div style={{ width: "100%" }}>
                <WrapperInfo>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <div style={{ color: "#333333", width: "80px" }}>
                      Địa chỉ:{" "}
                    </div>
                    <div>
                      {stateUserDetails?.address && (
                        <div
                          style={{ fontWeight: "bold", marginBottom: "10px" }}
                        >
                          {stateUserDetails?.address}
                        </div>
                      )}
                      <WrapperChangeInfo
                        onClick={handleChangeInfo}
                        style={{ cursor: "pointer" }}
                      >
                        Sửa thông tin
                      </WrapperChangeInfo>
                    </div>
                  </div>
                </WrapperInfo>
                <WrapperInfo>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ color: "#333333" }}>Tạm tính</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(priceMemo)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "5px",
                    }}
                  >
                    <span style={{ color: "#333333" }}>Phí giao hàng</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(deliveryPriceMemo)}
                    </span>
                  </div>
                </WrapperInfo>
                <WrapperTotal>
                  <span>Tổng tiền</span>
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        color: "rgb(254, 56, 52)",
                        fontSize: "24px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(totalPriceMemo)}
                    </span>
                    <span style={{ color: "#000", fontSize: "11px" }}>
                      (Đã bao gồm VAT nếu có)
                    </span>
                  </span>
                </WrapperTotal>
              </div>
              <ButtonComponent
                onClick={() => handleAddOrder()}
                size={40}
                styleButton={{
                  background: "rgb(255, 57, 69)",
                  height: "48px",
                  width: "320px",
                  border: "none",
                  borderRadius: "4px",
                }}
                textbutton="Đặt hàng"
                styleTextButton={{
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              ></ButtonComponent>
            </WrapperRight>
          </div>
        </div>
      </Loading>
      <ModalComponent
        title="Cập nhật thông tin giao hàng"
        open={isOpenModalUpdateInfo}
        onCancel={handleCancelUpdate}
        onOk={handleUpdateInfoUser}
      >
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          // onFinish={onUpdateUser}
          initialValues={{
            remember: true,
          }}
          autoComplete="on"
          form={form}
        >
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Hãy nhập tên của bạn!" }]}
          >
            <InputComponent
              value={stateUserDetails["name"]}
              onChange={handleOnchangeDetails}
              name="name"
            />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Hãy nhập số điện thoại!" }]}
          >
            <InputComponent
              value={stateUserDetails.phone}
              onChange={handleOnchangeDetails}
              name="phone"
            />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Hãy nhập địa chỉ của bạn!" }]}
          >
            <InputComponent
              value={stateUserDetails.address}
              onChange={handleOnchangeDetails}
              name="address"
            />
          </Form.Item>
        </Form>
      </ModalComponent>
    </div>
  );
};

export default PaymentPage;
