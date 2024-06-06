import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader } from "./style";
import { Button, Divider, Form, Input, Select, Space } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { WrapperUploadFile } from "../../pages/ProfilePage/style";
import { getBase64, renderOptions } from "../../utils";
import * as ProductService from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [typeSelectModify, setTypeSelectModify] = useState("");
  const [typeSelectAdd, setTypeSelectAdd] = useState("");
  const [typeItems, setTypeItems] = useState([]);

  const user = useSelector((state) => state?.user);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [stateProduct, setStateProduct] = useState({
    name: "",
    image: "",
    type: "",
    countInStock: "",
    price: "",
    rating: "",
    description: "",
    author: "",
    discount: "",
  });

  const [stateProductDetails, setStateProductDetails] = useState({
    name: "",
    image: "",
    type: "",
    countInStock: "",
    price: "",
    rating: "",
    description: "",
    author: "",
    discount: "",
  });

  const [form] = Form.useForm();
  const [formDetails] = Form.useForm();

  const mutation = useMutationHooks(async (data) => {
    const {
      name,
      image,
      type,
      countInStock,
      price,
      rating,
      description,
      author,
      discount,
    } = data;
    const res = await ProductService.createProduct({
      name,
      image,
      type,
      countInStock,
      price,
      rating,
      description,
      author,
      discount,
    });
    return res;
  });

  const mutationUpdate = useMutationHooks(async (data) => {
    const { id, token, ...rests } = data;
    const res = await ProductService.updateProduct(id, token, { ...rests });
    return res;
  });

  const mutationDeleted = useMutationHooks(async (data) => {
    const { id, token } = data;
    const res = await ProductService.deleteProduct(id, token);
    return res;
  });

  const mutationDeletedMany = useMutationHooks(async (data) => {
    const { token, ...ids } = data;
    const res = await ProductService.deleteManyProduct(ids, token);
    return res;
  });

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res;
  };

  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct(rowSelected);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        image: res?.data?.image,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock,
        price: res?.data?.price,
        rating: res?.data?.rating,
        description: res?.data?.description,
        author: res?.data?.author,
        discount: res?.data?.discount,
      });
    }
    setIsLoadingUpdate(false);
  };

  useEffect(() => {
    formDetails.setFieldsValue(stateProductDetails);
  }, [formDetails, stateProductDetails]);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true);
      fetchGetDetailsProduct(rowSelected);
    }
  }, [isOpenDrawer]);

  const handleDetailsProduct = () => {
    setIsOpenDrawer(true);
  };

  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const queryTypeProduct = useQuery({
    queryKey: ["type-product"],
    queryFn: fetchAllTypeProduct,
  });

  
  const { isPending: isLoadingProducts, data: products } = queryProduct;
  const { isSuccess: isSuccessLoadingType, data: typeProduct } = queryTypeProduct;
  
  useEffect(() => {
    if(typeProduct) {
      setTypeItems(typeProduct?.data);
    }
  },[typeProduct])

  const renderAction = () => {
    return (
      <div style={{ display: "flex", gap: "20px" }}>
        <EditOutlined
          style={{ color: "orange", fontSize: "30px", cursor: "pointer" }}
          onClick={handleDetailsProduct}
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
      title: "Tên sản phẩm",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getColumnSearchProps("name"),
    },
    {
      title: "Giá",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: ">= 100.000 đ",
          value: ">",
        },
        {
          text: "<= 100.000 đ",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">") return record.price > 100000;
        else if (value === "<=") return record.price <= 100000;
      },
    },
    {
      title: "Giá kuyến mãi",
      dataIndex: "discount",
      sorter: (a, b) => a.discount - b.discount,
      filters: [
        {
          text: ">= 100.000 đ",
          value: ">",
        },
        {
          text: "<= 100.000 đ",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">") return record.discount > 100000;
        else if (value === "<=") return record.discount <= 100000;
      },
    },
    {
      title: "Loại",
      dataIndex: "type",
      sorter: (a, b) => a.type.localeCompare(b.type),
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      sorter: (a, b) => a.type.localeCompare(b.type),
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const dataTable =
    products?.data?.length &&
    products?.data?.map((product) => {
      return {
        ...product,
        key: product._id,
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
      message.success("Thêm sản phẩm thành công");
      handleCancelDelete();
    } else if (isError || data?.status === "ERR") {
      message.error("Thêm sản phẩm thất bại");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success("Xóa sản phẩm thành công");
      handleCancelDelete();
    } else if (isErrorDeleted || dataDeleted?.status === "ERR") {
      message.error("Xóa sản phẩm thất bại");
    }
  }, [isSuccessDeleted, isErrorDeleted]);

  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === "OK") {
      message.success("Xóa các sản phẩm thành công");
    } else if (isErrorDeletedMany || dataDeletedMany?.status === "ERR") {
      message.error("Xóa các sản phẩm thất bại");
    }
  }, [isSuccessDeletedMany, isErrorDeletedMany]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success("Cập nhật sản phẩm thành công");
      handleCloseDrawer();
    } else if (isErrorUpdated || dataUpdated?.status === "ERR") {
      message.error("Cập nhật sản phẩm thất bại");
    }
  }, [isSuccessUpdated, isErrorUpdated]);

  useEffect(() => {
    setStateProduct({
      name: "",
      image: "",
      type: "",
      countInStock: "",
      price: "",
      rating: "",
      description: "",
      author: "",
      discount: "",
    });
  }, [isModalOpen]);

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: "",
      image: "",
      type: "",
      countInStock: "",
      price: "",
      rating: "",
      description: "",
      author: "",
      discount: "",
    });
    formDetails.resetFields();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setStateProduct({
      name: "",
      image: "",
      type: "",
      countInStock: "",
      price: "",
      rating: "",
      description: "",
      author: "",
      discount: "",
    });
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteProduct = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  const handleDeleteManyProducts = (ids) => {
    mutationDeletedMany.mutate(
      { ids: ids, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );

    return mutationDeletedMany;
  };

  const handleCancel = () => {
    setStateProduct({
      name: "",
      image: "",
      type: "",
      countInStock: "",
      price: "",
      rating: "",
      description: "",
      author: "",
      discount: "",
    });
    form.resetFields();
    setIsModalOpen(false);
  };

  const onFinish = () => {
    handleOk();
    mutation.mutate(stateProduct, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeAvatar = async ({ file }) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };

  const handleOnChangeAvatarDetails = async ({ file }) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview,
    });
  };

  const onUpdateProduct = () => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        ...stateProductDetails,
      },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  const handleOnChangeSelectAdd = (value) => {
    setTypeSelectAdd(value);
    setStateProduct({
      ...stateProduct,
      type: value,
    });
  };

  const handleOnChangeSelectModify = (value) => {
    setTypeSelectModify(value);
    setStateProductDetails({
      ...stateProductDetails,
      type: value,
    });
  };

  //Phần cho select loại sản phẩm khi add
  const [newType, setNewType] = useState("");
  const inputRef = useRef(null);
  const onAddTypeInputChange = (event) => {
    setNewType(event.target.value);
  };
  const addTypeItem = (e) => {
    e.preventDefault();
    setTypeItems([...typeItems, newType || `New item`]);
    setNewType("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  ////////////////////////////////

  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
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
          handleDeleteMany={handleDeleteManyProducts}
          columns={columns}
          data={dataTable}
          isLoading={isLoadingProducts}
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
        title="Tạo sản phẩm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="Hủy bỏ"
        width={700}
        footer={null}
      >
        <Loading isLoading={isPending}>
          <Form
            name="Add product form"
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
              label="Tên sản phẩm"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập tên sản phẩm!",
                },
              ]}
            >
              <InputComponent
                values={stateProduct.name}
                onChange={handleOnChange}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Loại sản phẩm"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Hãy chọn loại sản phẩm!",
                },
              ]}
            >
              <Select
                placeholder="Chọn loại sản phẩm"
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider
                      style={{
                        margin: "8px 0",
                      }}
                    />
                    <Space
                      style={{
                        padding: "0 8px 4px",
                      }}
                    >
                      <Input
                        placeholder="Nhập thể loại"
                        ref={inputRef}
                        value={newType}
                        onChange={onAddTypeInputChange}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={addTypeItem}
                      >
                        Thêm thể loại
                      </Button>
                    </Space>
                  </>
                )}
                options={typeItems.map((item) => ({
                  label: item,
                  value: item,
                }))}
                onChange={handleOnChangeSelectAdd}
              />
            </Form.Item>

            <Form.Item
              label="Số lượng trong kho"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập số lượng trong kho!",
                },
              ]}
            >
              <InputComponent
                values={stateProduct.countInStock}
                onChange={handleOnChange}
                name="countInStock"
              />
            </Form.Item>

            <Form.Item
              label="Giá"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập giá của sản phẩm!",
                },
              ]}
            >
              <InputComponent
                values={stateProduct.price}
                onChange={handleOnChange}
                name="price"
              />
            </Form.Item>

            <Form.Item
              label="Giá ưu đãi"
              name="discount"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập giá ưu đãi của sản phẩm!",
                },
              ]}
            >
              <InputComponent
                values={stateProduct.discount}
                onChange={handleOnChange}
                name="discount"
              />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập rating của sản phẩm!",
                },
              ]}
            >
              <InputComponent
                values={stateProduct.rating}
                onChange={handleOnChange}
                name="rating"
              />
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập mô tả sản phẩm!",
                },
              ]}
            >
              <InputComponent
                values={stateProduct.description}
                onChange={handleOnChange}
                name="description"
              />
            </Form.Item>

            <Form.Item
              label="Tác giả"
              name="author"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập tác giả của sản phẩm!",
                },
              ]}
            >
              <InputComponent
                values={stateProduct.author}
                onChange={handleOnChange}
                name="author"
              />
            </Form.Item>

            <Form.Item
              label="Ảnh sản phẩm"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Hãy chọn ảnh cho sản phẩm!",
                },
              ]}
            >
              <WrapperUploadFile
                onChange={handleOnChangeAvatar}
                showUploadList={true}
                maxCount={1}
              >
                <Button>Chọn ảnh</Button>
                {stateProduct.image && (
                  <img
                    src={stateProduct.image}
                    style={{
                      height: "200px",
                      width: "150px",
                      marginLeft: "30px",
                    }}
                    alt="Ảnh sản phẩm"
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
                Thêm sản phẩm
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
        width="65%"
        forceRender
      >
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
          <Form
            name="Edit product form"
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
            onFinish={onUpdateProduct}
            autoComplete="off"
            form={formDetails}
          >
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập tên sản phẩm!",
                },
              ]}
            >
              <InputComponent
                values={stateProductDetails.name}
                onChange={handleOnChangeDetails}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Loại sản phẩm"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Hãy chọn loại sản phẩm!",
                },
              ]}
            >
              <Select
                defaultValue={stateProductDetails?.type}
                placeholder="Chọn loại sản phẩm"
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider
                      style={{
                        margin: "8px 0",
                      }}
                    />
                    <Space
                      style={{
                        padding: "0 8px 4px",
                      }}
                    >
                      <Input
                        placeholder="Nhập thể loại"
                        ref={inputRef}
                        value={newType}
                        onChange={onAddTypeInputChange}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={addTypeItem}
                      >
                        Thêm thể loại
                      </Button>
                    </Space>
                  </>
                )}
                options={typeItems.map((item) => ({
                  label: item,
                  value: item,
                }))}
                onChange={handleOnChangeSelectModify}
              />
            </Form.Item>

            <Form.Item
              label="Số lượng trong kho"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập số lượng trong kho!",
                },
              ]}
            >
              <InputComponent
                values={stateProductDetails.countInStock}
                onChange={handleOnChangeDetails}
                name="countInStock"
              />
            </Form.Item>

            <Form.Item
              label="Giá"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập giá của sản phẩm!",
                },
              ]}
            >
              <InputComponent
                values={stateProductDetails.price}
                onChange={handleOnChangeDetails}
                name="price"
              />
            </Form.Item>

            <Form.Item
              label="Giá ưu đãi"
              name="discount"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập giá ưu đãi của sản phẩm!",
                },
              ]}
            >
              <InputComponent
                values={stateProductDetails.discount}
                onChange={handleOnChangeDetails}
                name="discount"
              />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập rating của sản phẩm!",
                },
              ]}
            >
              <InputComponent
                values={stateProductDetails.rating}
                onChange={handleOnChangeDetails}
                name="rating"
              />
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập mô tả sản phẩm!",
                },
              ]}
            >
              <InputComponent
                values={stateProductDetails.description}
                onChange={handleOnChangeDetails}
                name="description"
              />
            </Form.Item>

            <Form.Item
              label="Tác giả"
              name="author"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập tác giả của sản phẩm!",
                },
              ]}
            >
              <InputComponent
                values={stateProductDetails.author}
                onChange={handleOnChangeDetails}
                name="author"
              />
            </Form.Item>

            <Form.Item
              label="Ảnh sản phẩm"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Hãy chọn ảnh cho sản phẩm!",
                },
              ]}
            >
              <WrapperUploadFile
                onChange={handleOnChangeAvatarDetails}
                showUploadList={true}
                maxCount={1}
              >
                <Button>Chọn ảnh</Button>
                {stateProductDetails.image && (
                  <img
                    src={stateProductDetails.image}
                    style={{
                      height: "200px",
                      width: "150px",
                      marginLeft: "30px",
                    }}
                    alt="Ảnh sản phẩm"
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
        title="Xóa sản phẩm"
        open={isModalOpenDelete}
        onOk={handleDeleteProduct}
        onCancel={handleCancelDelete}
        cancelText="Hủy bỏ"
      >
        <Loading isLoading={isLoadingDeleted}>
          <p>Bạn có chắc muốn xóa sản phẩm này?</p>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminProduct;
