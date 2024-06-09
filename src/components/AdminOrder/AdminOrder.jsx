import React, { useEffect, useMemo, useRef, useState } from "react";
import { WrapperHeader } from "./style";
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Col,
  Row,
  Statistic,
  Card,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import { convertPrice, timeTranform } from "../../utils";
import * as OrderService from "../../services/OrderService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import * as message from "../Message/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";
import { orderConstant } from "../../constant";
import CountUp from "react-countup";

const AdminOrder = () => {
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const user = useSelector((state) => state?.user);
  const orderQuantityFormatter = (value) => (
    <CountUp
      end={value}
      separator="."
      style={{ color: "green", fontWeight: "bold" }}
    />
  );
  const totalRevenueFormatter = (value) => (
    <CountUp
      end={value}
      separator="."
      style={{ color: "#CD3238", fontWeight: "bold" }}
    />
  );

  const paidFormatter = (value) => (
    <CountUp
      end={value}
      separator="."
      style={{ color: "orange", fontWeight: "bold" }}
    />
  );

  const deliveredFormatter = (value) => (
    <CountUp
      end={value}
      separator="."
      style={{ color: "blue", fontWeight: "bold" }}
    />
  );

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [stateOrderDetails, setStateOrderDetails] = useState({
    fullName: "",
    address: "",
    phone: "",
    shippingPrice: "",
    totalPrice: "",
    paymentMethod: "",
    isPaid: false,
    isDelivery: false,
    createdAt: "",
    isCancelled: false,
  });

  const [formDetails] = Form.useForm();

  const mutationUpdate = useMutationHooks(async (data) => {
    const { id, token, isPaid, isDelivery } = data;
    const res = await OrderService.updateOrder(id, token, {
      isPaid,
      isDelivery,
    });
    return res;
  });

  const mutationDeleted = useMutationHooks(async (data) => {
    const { id, token } = data;
    const res = await OrderService.deleteOrder(id, token);
    return res;
  });

  const mutationDeletedMany = useMutationHooks(async (data) => {
    const { token, ...ids } = data;
    const res = await OrderService.deleteManyOrder(ids, token);
    return res;
  });

  const getAllOrders = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return res;
  };

  const fetchGetDetailsOrder = async (rowSelected) => {
    const res = await OrderService.getDetailsOrder(
      rowSelected,
      user?.access_token
    );

    if (res?.data) {
      setStateOrderDetails({
        fullName: res?.data?.shippingAddress?.fullName,
        address: res?.data?.shippingAddress?.address,
        phone: res?.data?.shippingAddress?.phone,
        orderItems: res?.data?.orderItems,
        shippingPrice: convertPrice(res?.data?.shippingPrice),
        totalPrice: res?.data?.totalPrice,
        paymentMethod: res?.data?.paymentMethod,
        isPaid: res?.data?.isPaid,
        isDelivery: res?.data?.isDelivery,
        createdAt: timeTranform(res?.data?.createdAt),
        isCancelled: res?.data?.isCancelled,
      });
    }
    setIsLoadingUpdate(false);
  };

  useEffect(() => {
    formDetails.setFieldsValue(stateOrderDetails);
  }, [formDetails, stateOrderDetails]);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true);
      fetchGetDetailsOrder(rowSelected);
    }
  }, [isOpenDrawer]);

  const handleDetailsOrder = () => {
    setIsOpenDrawer(true);
  };

  const queryOrder = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });
  const { isPending: isLoadingOrders, data: orders } = queryOrder;

  const renderAction = () => {
    return (
      <div style={{ display: "flex", gap: "20px" }}>
        <EditOutlined
          style={{ color: "orange", fontSize: "30px", cursor: "pointer" }}
          onClick={handleDetailsOrder}
        />
        <DeleteOutlined
          style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
          onClick={() => setIsModalOpenDelete(true)}
        />
      </div>
    );
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
            fontSize: "16px",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
              height: "30px",
              fontSize: "16px",
            }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
              height: "30px",
              fontSize: "16px",
            }}
          >
            Đặt lại
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
            style={{
              height: "30px",
              fontSize: "16px",
            }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "userName",
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps("userName"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps("address"),
    },
    {
      title: "Thanh toán",
      dataIndex: "isPaid",
      filters: [
        {
          text: "Đã thanh toán",
          value: "Đã thanh toán",
        },
        {
          text: "Chưa thanh toán",
          value: "Chưa thanh toán",
        },
      ],
      onFilter: (value, record) => {
        return record.isPaid === value;
      },
    },
    {
      title: "Giao hàng",
      dataIndex: "isDelivery",
      filters: [
        {
          text: "Đã giao hàng",
          value: "Đã giao hàng",
        },
        {
          text: "Chưa giao hàng",
          value: "Chưa giao hàng",
        },
      ],
      onFilter: (value, record) => {
        return record.isDelivery === value;
      },
    },
    {
      title: "Tổng tiền(VND)",
      dataIndex: "totalPrice",
      render: (text) => (
        <span style={{ color: "#CD3238", fontWeight: "bold" }}>{text}</span>
      ),
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
    },
    {
      title: "Thời gian đặt hàng",
      dataIndex: "createdAt",
      render: (text) => <span style={{ color: "blue" }}>{text}</span>,
      ...getColumnSearchProps("createdAt"),
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const dataTable =
    orders?.data?.length &&
    orders?.data?.map((order) => {
      return {
        ...order,
        key: order._id,
        userName: order?.shippingAddress?.fullName,
        phone: order?.shippingAddress?.phone,
        address: order?.shippingAddress?.address,
        paymentMethod: orderConstant.payment[order?.paymentMethod],
        isPaid: order?.isPaid ? "Đã thanh toán" : "Chưa thanh toán",
        isDelivery: order?.isDelivery ? "Đã giao hàng" : "Chưa giao hàng",
        totalPrice: convertPrice(order?.totalPrice),
        createdAt: timeTranform(order?.createdAt),
        isCancelled: order?.isCancelled,
      };
    });

  const {
    data: dataUpdated,
    isPending: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;

  const {
    data: dataDeleted,
    isPending: isLoadingDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationDeleted;

  const {
    data: dataDeletedMany,
    isPending: isLoadingDeletedMany,
    isSuccess: isSuccessDeletedMany,
    isError: isErrorDeletedMany,
  } = mutationDeletedMany;

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success("Xóa đơn hàng thành công");
      handleCancelDelete();
    } else if (isErrorDeleted || dataDeleted?.status === "ERR") {
      message.error("Xóa đơn hàng thất bại. ");
    }
  }, [isSuccessDeleted, isErrorDeleted]);

  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === "OK") {
      message.success("Xóa các đơn hàng thành công");
    } else if (isErrorDeletedMany || dataDeletedMany?.status === "ERR") {
      message.error("Xóa các đơn hàng thất bại. ");
    }
  }, [isSuccessDeletedMany, isErrorDeletedMany]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success("Cập nhật đơn hàng thành công");
      handleCloseDrawer();
    } else if (isErrorUpdated || dataUpdated?.status === "ERR") {
      message.error("Cập nhật đơn hàng thất bại. ");
    }
  }, [isSuccessUpdated, isErrorUpdated]);

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateOrderDetails({
      fullName: "",
      address: "",
      phone: "",
      shippingPrice: "",
      totalPrice: "",
      paymentMethod: "",
      isPaid: false,
      isDelivery: false,
      createdAt: "",
      isCancelled: false,
    });
    formDetails.resetFields();
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteOrder = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryOrder.refetch();
        },
      }
    );
  };

  const handleDeleteManyOrders = (ids) => {
    mutationDeletedMany.mutate(
      { ids: ids, token: user?.access_token },
      {
        onSettled: () => {
          queryOrder.refetch();
        },
      }
    );
  };

  const handleOnChangeIsPaid = (value) => {
    setStateOrderDetails({
      ...stateOrderDetails,
      isPaid: value,
    });
  };

  const handleOnChangeIsDelivery = (value) => {
    setStateOrderDetails({
      ...stateOrderDetails,
      isDelivery: value,
    });
  };

  const onUpdateOrder = () => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        ...stateOrderDetails,
      },
      {
        onSettled: () => {
          queryOrder.refetch();
        },
      }
    );
  };


  //Memo cho thống kê
  const totalRevenue = useMemo(() => {
    return orders?.data?.reduce((total, order) => {
      return total + (order?.isPaid ? order?.totalPrice : 0);
    }, 0);
  }, [orders]);

  const paidOrderQuantity = useMemo(() => {
    return orders?.data?.reduce((total, order) => {
      return total + (order?.isPaid ? 1 : 0);
    }, 0);
  }, [orders])

  const deliveredOrderQuantity = useMemo(() => {
    return orders?.data?.reduce((total, order) => {
      return total + (order?.isDelivery ? 1 : 0);
    }, 0);
  },[orders])

  return (
    <div>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
      <Row gutter={40} style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Col span={4}>
          <Card style={{border: '1px solid #00B55F'}}>
            <Statistic
              title="Số đơn hàng"
              value={orders?.data?.length}
              formatter={orderQuantityFormatter}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{border: '1px solid red'}}>
            <Statistic
              title="Tổng doanh thu"
              value={totalRevenue}
              precision={2}
              formatter={totalRevenueFormatter}
              suffix={
                <span style={{ color: "#CD3238", fontWeight: "bold" }}>
                  VNĐ
                </span>
              }
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card style={{border: '1px solid #ffbe0c'}}>
            <Statistic
              title="Số đơn đã thanh toán"
              value={paidOrderQuantity}
              formatter={paidFormatter}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card style={{border: '1px solid #1677FF'}}>
            <Statistic
              title="Số đơn đã giao hàng"
              value={deliveredOrderQuantity}
              formatter={deliveredFormatter}
            />
          </Card>
        </Col>
      </Row>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          handleDeleteMany={handleDeleteManyOrders}
          columns={columns}
          data={dataTable}
          isLoading={isLoadingOrders}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>
      <DrawerComponent
        title="Chi tiết đơn hàng"
        isOpen={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
        width="65%"
        forceRender
      >
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
          <Form
            name="Edit order form"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onUpdateOrder}
            autoComplete="off"
            form={formDetails}
          >
            <Form.Item label="Tên khách hàng" name="fullName">
              <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                {stateOrderDetails?.fullName}
              </div>
            </Form.Item>

            <Form.Item label="Địa chỉ" name="address">
              <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                {stateOrderDetails?.address}
              </div>
            </Form.Item>

            <Form.Item label="Số điện thoại" name="phone">
              <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                {stateOrderDetails?.phone}
              </div>
            </Form.Item>

            <Form.Item label="Phương thức giao hàng" name="paymentMethod">
              <div style={{ fontSize: "16px", color: "" }}>
                {orderConstant.payment[stateOrderDetails?.paymentMethod]}
              </div>
            </Form.Item>

            <Form.Item label="Thời gian đặt hàng" name="createdAt">
              <div style={{ fontSize: "16px", color: "blue" }}>
                {stateOrderDetails.createdAt}
              </div>
            </Form.Item>

            <Form.Item label="Tổng tiền" name="totalPrice">
              <div
                style={{
                  fontSize: "16px",
                  color: "#CD3238",
                  fontWeight: "bold",
                }}
              >
                {convertPrice(stateOrderDetails.totalPrice)}
              </div>
            </Form.Item>

            {stateOrderDetails.isCancelled ? (
              <Form.Item label="Trạng thái" name="status">
                <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                  Đã hủy
                </div>
              </Form.Item>
            ) : (
              <div>
                <Form.Item
                  label="Thanh toán"
                  name="isPaid"
                  rules={[
                    {
                      required: true,
                      message: "Hãy chọn trạng thái thanh toán của đơn hàng!",
                    },
                  ]}
                >
                  <Select
                    defaultValue={stateOrderDetails?.isPaid}
                    style={{
                      width: 150,
                    }}
                    onChange={handleOnChangeIsPaid}
                    options={[
                      {
                        value: true,
                        label: "Đã thanh toán",
                      },
                      {
                        value: false,
                        label: "Chưa thanh toán",
                      },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label="Giao hàng"
                  name="isDelivery"
                  rules={[
                    {
                      required: true,
                      message: "Hãy chọn trạng thái giao hàng!",
                    },
                  ]}
                >
                  <Select
                    defaultValue={stateOrderDetails?.isDelivery}
                    style={{
                      width: 150,
                    }}
                    onChange={handleOnChangeIsDelivery}
                    options={[
                      {
                        value: true,
                        label: "Đã giao hàng",
                      },
                      {
                        value: false,
                        label: "Chưa giao hàng",
                      },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 19,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Cập nhật
                  </Button>
                </Form.Item>
              </div>
            )}
          </Form>
        </Loading>
      </DrawerComponent>

      <ModalComponent
        title="Xóa đơn hàng"
        open={isModalOpenDelete}
        onOk={handleDeleteOrder}
        onCancel={handleCancelDelete}
        cancelText="Hủy bỏ"
      >
        <Loading isLoading={isLoadingDeleted}>
          <p>Bạn có chắc muốn xóa đơn hàng này?</p>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminOrder;
