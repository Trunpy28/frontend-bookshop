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
  const searchDebounce = useDebounce(searchProduct, 10);

  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState({
    page: 1,
    limit: 10,
    total: 1,
  });
  const [sortedProducts, setSortedProducts] = useState(products);

  const fetchProductType = async (type, page, limit) => {
    setLoading(true);
    const res = await ProductService.getProductType(type, page);
    if (res?.status === "OK") {
      setProducts(res?.data);
      setSortedProducts(res?.data);
      setPaginate({
        ...paginate,
        total: res?.totalPage,
      });
    } else {
    }
    setLoading(false);
  };

  const onChange = (current, pageSize) => {
    setPaginate({ ...paginate, page: current, limit: pageSize });
  };

  useEffect(() => {
    if (state) {
      fetchProductType(state, paginate.page, paginate.limit);
    }
  }, [state, paginate.page]);

  const handleSortChange = (event) => {
    if (event.target.value === "best-seller") {
      setSortedProducts([...products].sort((a, b) => b.selled - a.selled));
    } else if (event.target.value === "price-asc") {
      setSortedProducts([...products].sort((a, b) => a.discount - b.discount));
    } else if (event.target.value === "price-desc") {
      setSortedProducts([...products].sort((a, b) => b.discount - a.discount));
    } else {
      setSortedProducts([...products]);
    }
  };


  return (
    <Loading isLoading={loading}>
      <Row style={{ padding: "20px 15vw", backgroundColor: "#F0F0F0" }}>
        <WrapperNavBar span={6}>
          <NavbarComponent />
        </WrapperNavBar>
        <Col span={18}>
          <div
            style={{
              marginBottom: "20px",
              fontSize: "16px",
            }}
          >
            Sắp xếp theo:{" "}
            <select
              style={{
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#fff",
                cursor: "pointer",
              }}
              defaultValue={"default"}
              onChange={handleSortChange}
            >
              <option value="default">Mặc định</option>
              <option value="best-seller">Bán chạy nhất</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
            </select>
          </div>
          <WrapperProducts span={18}>
            {sortedProducts
              ?.filter((pro) => {
                if (searchDebounce === "") {
                  return pro;
                } else if (
                  pro?.name
                    .toLowerCase()
                    ?.includes(searchDebounce?.toLowerCase())
                ) {
                  return pro;
                } else {
                  return pro;
                }
              })
              .slice(
                (paginate.page - 1) * paginate.limit,
                Math.max(
                  sortedProducts.length,
                  (paginate.page - 1) * paginate.limit + paginate.limit
                )
              )
              .map((product) => {
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
