import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader } from "./style";
import { Button, Form, Input, Space } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { WrapperUploadFile } from "../../pages/ProfilePage/style";
import { getBase64 } from "../../utils";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";

const AdminUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const user = useSelector((state) => state?.user);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [stateUser, setStateUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
    phone: "",
    address: "",
    avatar: "",
  });

  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    email: "",
    // password: "",
    isAdmin: false,
    phone: "",
    address: "",
    avatar: "",
  });

  const [form] = Form.useForm();
  const [formDetails] = Form.useForm();

  const mutation = useMutationHooks(async (data) => {
    const { name, email, password,confirmPassword,isAdmin, phone,address,avatar } = data;
    const res = await UserService.signUpUser({
      name,
      email,
      password,
      confirmPassword,
      isAdmin,
      phone,
      address,
      avatar,
    });
    return res;
  });

  const mutationUpdate = useMutationHooks(async (data) => {
    const { id, token, ...rests } = data;
    const res = await UserService.updateUser(id, token, { ...rests });
    return res;
  });

  const mutationDeleted = useMutationHooks(async (data) => {
    const { id, token } = data;
    const res = await UserService.deleteUser(id, token);
    return res;
  });

  const mutationDeletedMany = useMutationHooks(async (data) => {
    const { token, ...ids} = data;
    const res = await UserService.deleteManyUser(ids, token);
    return res;
  });

  const getAllUsers = async () => {
    const res = await UserService.getAllUser(user?.access_token);
    return res;
  };

  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserService.getDetailsUser(
      rowSelected,
      user?.access_token
    );
    if (res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        // password: res?.data?.password,
        isAdmin: res?.data?.isAdmin,
        phone: res?.data?.phone,
        address: res?.data?.address,
        avatar: res?.data?.avatar,
      });
    }
    setIsLoadingUpdate(false);
  };

  useEffect(() => {
    formDetails.setFieldsValue(stateUserDetails);
  }, [formDetails, stateUserDetails]);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true);
      fetchGetDetailsUser(rowSelected);
    }
  }, [isOpenDrawer]);

  const handleDetailsUser = () => {
    setIsOpenDrawer(true);
  };

  const queryUser = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  const { isPending: isLoadingUsers, data: users } = queryUser;

  const renderAction = () => {
    return (
      <div style={{ display: "flex", gap: "20px" }}>
        <EditOutlined
          style={{ color: "orange", fontSize: "30px", cursor: "pointer" }}
          onClick={handleDetailsUser}
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
      title: "Tên người dùng",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      ...getColumnSearchProps("email"),
    },
    {
      title: "Vai trò",
      dataIndex: "isAdmin",
      filters: [
        {
          text: "Quản trị viên",
          value: "Quản trị viên",
        },
        {
          text: "Khách hàng",
          value: "Khách hàng",
        },
      ],
      onFilter: (value, record) => {
        return record.isAdmin === value;
      },
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      sorter: (a, b) => a.address.localeCompare(b.address),
      ...getColumnSearchProps("address"),
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const dataTable =
    users?.data?.length &&
    users?.data?.map((user) => {
      return {
        ...user,
        key: user._id,
        isAdmin: user.isAdmin ? "Quản trị viên" : "Khách hàng",
      };
    });
    
  const { data, isPending, isSuccess, isError } = mutation;
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
    if (isSuccess && data?.status === "OK") {
      message.success("Thêm tài khoản thành công");
      handleCancelDelete();
    } else if (isError || data?.status === "ERR") {
      message.error("Thêm tài khoản thất bại. "+data?.message);
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success("Xóa tài khoản thành công");
      handleCancelDelete();
    } else if (isErrorDeleted || dataDeleted?.status === "ERR") {
      message.error("Xóa tài khoản thất bại. ");
    }
  }, [isSuccessDeleted, isErrorDeleted]);

  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === "OK") {
      message.success("Xóa các tài khoản thành công");
    } else if (isErrorDeletedMany || dataDeletedMany?.status === "ERR") {
      message.error("Xóa các tài khoản thất bại. ");
    }
  }, [isSuccessDeletedMany, isErrorDeletedMany]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success("Cập nhật tài khoản thành công");
      handleCloseDrawer();
    } else if (isErrorUpdated || dataUpdated?.status === "ERR") {
      message.error("Cập nhật tài khoản thất bại. ");
    }
  }, [isSuccessUpdated, isErrorUpdated]);

  useEffect(() => {
    setStateUser({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      isAdmin: false,
      phone: "",
      address: "",
      avatar: "",
    });
  }, [isModalOpen]);

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateUserDetails({
      name: "",
      email: "",
      isAdmin: false,
      phone: "",
      address: "",
      avatar: "",
    });
    formDetails.resetFields();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setStateUser({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      isAdmin: false,
      phone: "",
      address: "",
      avatar: "",
    });
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteUser = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };

  const handleDeleteManyUsers = (ids) => {
    mutationDeletedMany.mutate(
      { ids: ids, token: user?.access_token },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  }

  const handleCancel = () => {
    setStateUser({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      isAdmin: false,
      phone: "",
      address: "",
      avatar: "",
    });
    form.resetFields();
    setIsModalOpen(false);
  };

  const onFinish = () => {
    handleOk();
    mutation.mutate(stateUser, {
      onSettled: () => {
        queryUser.refetch();
      },
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleOnChange = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeAvatar = async ({ file }) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUser({
      ...stateUser,
      avatar: file.preview,
    });
  };

  const handleOnChangeAvatarDetails = async ({ file }) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetails({
      ...stateUserDetails,
      avatar: file.preview,
    });
  };

  const onUpdateUser = () => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        ...stateUserDetails,
      },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };

  return (
    <div>
      <WrapperHeader>Quản lý tài khoản</WrapperHeader>
      <div style={{ marginTop: "10px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
          onClick={showModal}
        >
          <PlusOutlined style={{ fontSize: "40px" }} />
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          handleDeleteMany={handleDeleteManyUsers}
          columns={columns}
          data={dataTable}
          isLoading={isLoadingUsers}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>
      <ModalComponent
        forceRender
        title="Tạo tài khoản"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="Hủy bỏ"
        width={700}
        footer={null}
      >
        <Loading isLoading={isPending}>
          <Form
            name="Add user form"
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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Tên người dùng"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập tên người dùng!",
                },
              ]}
            >
              <InputComponent
                values={stateUser.name}
                onChange={handleOnChange}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập email người dùng!",
                },
              ]}
            >
              <InputComponent
                values={stateUser.email}
                onChange={handleOnChange}
                name="email"
              />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập mật khẩu!",
                },
              ]}
            >
              <Input.Password
                values={stateUser.password}
                onChange={handleOnChange}
                name="password"
              />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập mật khẩu xác nhận!",
                },
              ]}
            >
              <Input.Password
                values={stateUser.confirmPassword}
                onChange={handleOnChange}
                name="confirmPassword"
              />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: false,
                  message: "Hãy nhập số điện thoại!",
                },
              ]}
            >
              <InputComponent
                values={stateUser.phone}
                onChange={handleOnChange}
                name="phone"
              />
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: false,
                  message: "Hãy nhập địa chỉ!",
                },
              ]}
            >
              <InputComponent
                values={stateUser.address}
                onChange={handleOnChange}
                name="address"
              />
            </Form.Item>

            <Form.Item
              label="Vai trò"
              name="isAdmin"
              rules={[
                {
                  required: true,
                  message: "Hãy chọn vai trò của người dùng!",
                },
              ]}
            >
              <InputComponent
                values={stateUser.price}
                onChange={handleOnChange}
                name="isAdmin"
              />
            </Form.Item>

            <Form.Item
              label="Ảnh đại diện"
              name="avatar"
              rules={[
                {
                  required: false,
                  message: "Hãy chọn ảnh đại diện!",
                },
              ]}
            >
              <WrapperUploadFile
                onChange={handleOnChangeAvatar}
                showUploadList={true}
                maxCount={1}
              >
                <Button>Chọn ảnh</Button>
                {stateUser.avatar && (
                  <img
                    src={stateUser.avatar}
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    alt="Ảnh đại diện"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 19,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Thêm tài khoản
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
      <DrawerComponent
        title="Chi tiết người dùng"
        isOpen={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
        width="65%"
        forceRender
      >
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
          <Form
            name="Edit user form"
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
            onFinish={onUpdateUser}
            autoComplete="off"
            form={formDetails}
          >
            <Form.Item
              label="Tên người dùng"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập tên người dùng!",
                },
              ]}
            >
              <InputComponent
                values={stateUserDetails.name}
                onChange={handleOnChangeDetails}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập email người dùng!",
                },
              ]}
            >
              <InputComponent
                values={stateUserDetails.email}
                onChange={handleOnChangeDetails}
                name="email"
              />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: false,
                  message: "Hãy nhập số điện thoại!",
                },
              ]}
            >
              <InputComponent
                values={stateUserDetails.phone}
                onChange={handleOnChangeDetails}
                name="phone"
              />
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: false,
                  message: "Hãy nhập địa chỉ!",
                },
              ]}
            >
              <InputComponent
                values={stateUserDetails.address}
                onChange={handleOnChangeDetails}
                name="address"
              />
            </Form.Item>

            <Form.Item
              label="Vai trò"
              name="isAdmin"
              rules={[
                {
                  required: true,
                  message: "Hãy chọn vai trò của người dùng!",
                },
              ]}
            >
              <InputComponent
                values={stateUserDetails.isAdmin.toString()}
                onChange={handleOnChangeDetails}
                name="isAdmin"
              />
            </Form.Item>

            <Form.Item
              label="Ảnh đại diện"
              name="avatar"
              rules={[
                {
                  required: false,
                  message: "Hãy chọn ảnh đại diện!",
                },
              ]}
            >
              <WrapperUploadFile
                onChange={handleOnChangeAvatarDetails}
                showUploadList={true}
                maxCount={1}
              >
                <Button>Chọn ảnh</Button>
                {stateUserDetails.avatar && (
                  <img
                    src={stateUserDetails.avatar}
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    alt="Ảnh đại diện"
                  />
                )}
              </WrapperUploadFile>
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
          </Form>
        </Loading>
      </DrawerComponent>

      <ModalComponent
        title="Xóa tài khoản"
        open={isModalOpenDelete}
        onOk={handleDeleteUser}
        onCancel={handleCancelDelete}
        cancelText="Hủy bỏ"
      >
        <Loading isLoading={isLoadingDeleted}>
          <p>Bạn có chắc muốn xóa tài khoản này?</p>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminUser;
