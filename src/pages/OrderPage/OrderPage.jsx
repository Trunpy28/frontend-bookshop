import { Button, ConfigProvider, Form, InputNumber, message } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import {
  CustomCheckbox,
  WrapperChangeInfo,
  WrapperCountOrder,
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperNameProductOrder,
  WrapperRight,
  WrapperStyleHeader,
  WrapperStyleHeaderDelivery,
  WrapperTotal,
} from "./style";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";

import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeAllOrderProduct,
  removeOrderProduct,
  selectedOrder,
} from "../../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import StepComponent from "../../components/StepConponent/StepComponent";

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);

  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [listChecked, setListChecked] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  useEffect(() => {
    setStateUserDetails({
      name: user?.name,
      phone: user?.phone,
      address: user?.address,
    });
  }, [user]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      form.setFieldsValue(stateUserDetails);
    }
  }, [form, isOpenModalUpdateInfo]);

  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter(
        (item) => item !== e.target.value
      );
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked]);

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      setListChecked(order?.orderItems?.map((item) => item?.product));
    } else {
      setListChecked([]);
    }
  };

  const handleChangeCount = (type, idProduct) => {
    if (type === "increase") {
      dispatch(increaseAmount({ idProduct }));
    } else if (type === "decrease") {
      dispatch(decreaseAmount({ idProduct }));
    }
  };

  const handleDeleteItem = (idProduct) => {
    const index = listChecked.indexOf(idProduct);
    if (index > -1) {
      listChecked.splice(index, 1);
    }
    dispatch(removeOrderProduct({ idProduct }));
  };

  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 0) {
      setListChecked([]);
      dispatch(removeAllOrderProduct({ listChecked }));
    }
  };

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
    if (priceMemo > 0 && priceMemo < 200000) {
      return 25000;
    } else if (priceMemo >= 200000 && priceMemo < 500000) {
      return 10000;
    } else {
      return 0;
    }
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) + Number(deliveryPriceMemo);
  }, [priceMemo, deliveryPriceMemo]);

  const handleAddCart = () => {
    if (!order?.orderItemsSelected?.length) {
      message.warning("Vui lòng chọn sản phẩm!");
    } else if (!user?.phone || !user.address || !user.name) {
      setIsOpenModalUpdateInfo(true);
    } else {
      navigate("/payment", { state: { stateUserDetails } });
    }
  };

  const handleCancelUpdate = () => {
    setIsOpenModalUpdateInfo(false);
    setStateUserDetails({
      name: user?.name,
      phone: user?.phone,
      address: user?.address,
    });
  };

  const handleUpdateInfoUser = () => {
    setIsOpenModalUpdateInfo(false);
  };

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const itemsDelivery = [
    {
      title: "25K",
      description: "Dưới 200.000 VND",
    },
    {
      title: "10K",
      description: "Từ 200.000 VND đến dưới 500.000 VND",
    },
    {
      title: "Free ship",
      description: "Trên 500.000 VND",
    },
  ];

  return (
    <div style={{ background: "#f5f5fa", with: "100%", padding: "30px 15vw" }}>
      <div>
        <h3
          style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "16px" }}
        >
          Giỏ hàng
        </h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperStyleHeaderDelivery>
              <StepComponent
                items={itemsDelivery}
                current={
                  deliveryPriceMemo === 25000
                    ? 0
                    : deliveryPriceMemo === 10000
                    ? 1
                    : order.orderItemsSelected.length === 0
                    ? -1
                    : 2
                }
              />
            </WrapperStyleHeaderDelivery>
            <WrapperStyleHeader>
              <div style={{ display: "inline-block", width: "40%" }}>
                <CustomCheckbox
                  onChange={handleOnchangeCheckAll}
                  checked={listChecked?.length === order?.orderItems?.length &&  order?.orderItems?.length > 0}
                  disabled={order?.orderItems?.length === 0}
                ></CustomCheckbox>
                <span style={{ marginLeft: "5px", fontSize: "16px" }}>
                  Tất cả ({order?.orderItems?.length} sản phẩm)
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
                    textAlign: "center",
                  }}
                >
                  Thành tiền
                </div>
                <DeleteOutlined
                  style={{ cursor: "pointer", fontSize: "18px", color: "red" }}
                  onClick={handleRemoveAllOrder}
                />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderItems?.map((orderItem) => (
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
                    <CustomCheckbox
                      onChange={onChange}
                      value={orderItem?.product}
                      checked={listChecked.includes(orderItem?.product)}
                    ></CustomCheckbox>
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
                      <ConfigProvider
                        theme={{
                          token: {
                            colorPrimary: "#00A651",
                          },
                          components: {
                            InputNumber: {
                              /* here is your component tokens */
                              inputFontSize: "16px",
                              controlWidth: "50px",
                            },
                          },
                        }}
                      >
                        <Button
                          icon={<MinusOutlined />}
                          onClick={() =>
                            handleChangeCount("decrease", orderItem?.product)
                          }
                          disabled={orderItem?.amount < 2}
                        />
                        <InputNumber
                          min={1}
                          max={orderItem?.countInStock}
                          value={orderItem?.amount}
                          controls={false} 
                          readOnly
                        />
                        <Button
                          icon={<PlusOutlined />}
                          onClick={() =>
                            handleChangeCount("increase", orderItem?.product)
                          }
                          disabled={orderItem?.amount >= orderItem?.countInStock}
                        />
                      </ConfigProvider>
                    </WrapperCountOrder>
                    <div
                      style={{
                        fontSize: "16px",
                        width: "30%",
                        textAlign: "center",
                        color: "#CD3238",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(orderItem?.price * orderItem?.amount)}
                    </div>
                    <DeleteOutlined
                      style={{
                        cursor: "pointer",
                        fontSize: "18px",
                        color: "orange",
                      }}
                      onClick={() => handleDeleteItem(orderItem?.product)}
                    />
                  </div>
                </WrapperItemOrder>
              ))}
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: "100%" }}>
              <WrapperInfo>
                <div style={{ display: "flex", gap: "5px" }}>
                  <div style={{ color: "#333333", width: "80px" }}>
                    Địa chỉ:{" "}
                  </div>
                  <div>
                    <div style={{ fontWeight: "bold" }}>
                      {stateUserDetails?.address}
                    </div>
                    <WrapperChangeInfo
                      onClick={handleChangeInfo}
                      style={{ cursor: "pointer", marginTop: "10px" }}
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
              onClick={handleAddCart}
              size={40}
              styleButton={{
                background: "rgb(255, 57, 69)",
                height: "48px",
                width: "320px",
                border: "none",
                borderRadius: "4px",
              }}
              textbutton={"Mua hàng"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </WrapperRight>
        </div>
      </div>
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

export default OrderPage;
