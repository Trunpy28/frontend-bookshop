import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div
      style={{
        padding: "20px 15vw",
        backgroundColor: "#F0F0F0",
      }}
    >
      <ProductDetailsComponent idProduct={id} />
    </div>
  );
};

export default ProductDetailsPage;
