import React, { useEffect, useRef, useState } from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import slider4 from "../../assets/images/slider4.jpg";
import slider5 from "../../assets/images/slider5.jpg";
import CardComponent from "../../components/CardComponent/CardComponent";
import { WrapperButtonMore, WrapperProducts } from "./style";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 1000)
  const [loading, setLoading] = useState(false);

  const [limit,setLimit] = useState(6);
  const fetchProductAll = async (context) => {
    const search = context?.queryKey && context?.queryKey[2];
    const limit = context?.queryKey && context?.queryKey[1];
    const res = await ProductService.getAllProduct(search,limit);
    return res;
  };


  const { isPending, data: products, isPlaceholderData, } = useQuery({
    queryKey: ["products",limit,searchDebounce],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
    placeholderData: true,
  });
  
  console.log(products?.total === products?.data?.length);
  console.log('isPlaceholderData', products);
  return (
    <div style={{ padding: "10px 15vw", backgroundColor: "#F0F0F0" }}>
      <SliderComponent
        arrImages={[slider1, slider2, slider3, slider4, slider5]}
      />
      <Loading isLoading={isPending || loading}>
        <WrapperProducts>
          {products?.data?.map((product) => {
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

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <WrapperButtonMore
            type="outlined"
            style={{
              width: "150px",
              height: "40px",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "600",
            }}
            onClick={() => {
              setLimit((prev) => prev + 6);
            }}
            disabled={products?.total === products?.data?.length  || products?.totalPage === 1}
          >
            Xem thêm
          </WrapperButtonMore>
        </div>
      </Loading>
    </div>
  );
};

export default HomePage;
