import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/NavBarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Row, Pagination, Col, ConfigProvider } from "antd";
import { WrapperNavBar, WrapperProducts } from "./style";
import { useLocation } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

const TypeProductPage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500)

  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState({
    page: 1,
    limit: 10,
    total: 1,
  })

  const fetchProductType = async (type, page, limit) => {
    setLoading(true);
    const res = await ProductService.getProductType(type, page, limit);
    if (res?.status === "OK") {
      setProducts(res?.data);
      setPaginate({
        ...paginate,
        total: res?.totalPage,
      });
    } else {
    }
    setLoading(false);
  };

  const onChange = (current, pageSize) => {
    setPaginate({...paginate, page: current, limit: pageSize})
  };

  useEffect(() => {
    if (state) {
      fetchProductType(state,paginate.page,paginate.limit);
    }
  }, [state,paginate.page,paginate.limit]);


  return (
    <Loading isLoading={loading}>
      <Row style={{ padding: "20px 15vw", backgroundColor: "#F0F0F0" }}>
        <WrapperNavBar span={6}>
          <NavbarComponent />
        </WrapperNavBar>
        <Col span={18}>
          <WrapperProducts span={18}>
            {products?.filter((pro) => {
              if(searchDebounce === ''){
                return pro;
              }else if(pro?.name.toLowerCase()?.includes(searchDebounce?.toLowerCase())){
                return pro;
              }
            }).map((product) => {
              return (
                <CardComponent
                  key={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  rating={product.rating}
                  selled={product.selled}
                  discount={product.discount}
                  id={product._id}
                />
              );
            })}
          </WrapperProducts>

          <ConfigProvider
            theme={{
              token: {
                /* here is your global tokens */
                colorPrimary: "#00A651",
              },
            }}
          >
            <Pagination
              showSizeChanger
              onChange={onChange}
              defaultCurrent={paginate?.page}
              total={paginate?.total}
              style={{ textAlign: "right", marginTop: "30px" }}
            />
          </ConfigProvider>
        </Col>
      </Row>
    </Loading>
  );
};

export default TypeProductPage;
