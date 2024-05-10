import React from "react";
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

const HomePage = () => {
  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };

  const { isPending, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
  });

  return (
    <div style={{ padding: "10px 15vw", backgroundColor: "#F0F0F0" }}>
      <SliderComponent
        sliderListImg={[slider1, slider2, slider3, slider4, slider5]}
      />
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
          textbutton={"Xem thêm"}
          type="outlined"
          styleButton={{
            border: "2px solid green",
            color: "green",
            width: "150px",
            height: "40px",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "600",
          }}
        />
      </div>
    </div>
  );
};

export default HomePage;
