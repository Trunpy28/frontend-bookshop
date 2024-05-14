import React, { useEffect, useState } from "react";
import {
  ChangingButton,
  WrapperContentProfile,
  WrapperHeader,
  WrapperInputField,
  WrapperUploadFile,
} from "./style";
import { ConfigProvider, Form, Input, Button, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FieldName } from "../../components/HeaderComponent/style";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slices/userSlice";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";


const ProfilePage = () => {
  const user = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");

  const mutation = useMutationHooks(async (data) => {
    const { id, access_token, ...rest } = data;
    await UserService.updateUser(id, access_token, rest );
  });

  const dispatch = useDispatch();
  const { data, isPending, isSuccess, isError } = mutation;

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

  useEffect(() => {
    console.log(isSuccess, isError);
    if (isSuccess) {
      message.success("Cập nhật thông tin thành công");
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error("Cập nhật thông tin thất bại");
    }
  }, [isSuccess, isError]);

  const handleOnChangeName = (e) => {
    setName(e.target.value);
  };

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleOnChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleOnChangeAvatar = async ({ file }) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };

  const handleUpdate = (e) => {
    mutation.mutate({
      id: user?.id,
      name,
      email,
      phone,
      address,
      avatar,
      access_token: user?.access_token,
    });
  };

  return (
    <div
      style={{
        padding: "20px 15vw",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <Loading isLoading={isPending}>
        <WrapperContentProfile>
          <ConfigProvider
            theme={{
              token: {
                /* here is your global tokens */
                colorPrimary: "#00A651",
              },
            }}
          >
            <Form>
              <WrapperInputField>
                <FieldName>Tên</FieldName>
                <Form.Item>
                  <Input
                    style={{ fontSize: "16px", minWidth: "300px" }}
                    value={name}
                    onChange={handleOnChangeName}
                  />
                </Form.Item>
                <ChangingButton onClick={handleUpdate}>Cập nhật</ChangingButton>
              </WrapperInputField>

              <WrapperInputField>
                <FieldName>Email</FieldName>
                <Form.Item>
                  <Input
                    style={{ fontSize: "16px", minWidth: "300px" }}
                    value={email}
                    onChange={handleOnChangeEmail}
                  />
                </Form.Item>
                <ChangingButton onClick={handleUpdate}>Cập nhật</ChangingButton>
              </WrapperInputField>

              <WrapperInputField>
                <FieldName>Số điện thoại</FieldName>
                <Form.Item>
                  <Input
                    style={{ fontSize: "16px", minWidth: "300px" }}
                    value={phone}
                    onChange={handleOnChangePhone}
                  />
                </Form.Item>
                <ChangingButton onClick={handleUpdate}>Cập nhật</ChangingButton>
              </WrapperInputField>

              <WrapperInputField>
                <FieldName>Địa chỉ</FieldName>
                <Form.Item>
                  <Input
                    style={{ fontSize: "16px", minWidth: "300px" }}
                    value={address}
                    onChange={handleOnChangeAddress}
                  />
                </Form.Item>
                <ChangingButton onClick={handleUpdate}>Cập nhật</ChangingButton>
              </WrapperInputField>

              <WrapperInputField>
                <FieldName>Ảnh đại diện</FieldName>
                <WrapperUploadFile
                  onChange={handleOnChangeAvatar}
                  showUploadList={false}
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                </WrapperUploadFile>
                {avatar && (
                  <img
                    src={avatar}
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
                <ChangingButton onClick={handleUpdate}>Cập nhật</ChangingButton>
              </WrapperInputField>
            </Form>
          </ConfigProvider>
        </WrapperContentProfile>
      </Loading>
    </div>
  );
};

export default ProfilePage;
