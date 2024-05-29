import React, { useEffect, useState } from 'react'
import { BigLabel, FilterByGroup, FilterByLabel, NavBarWrapper, TypeLink, TypeList } from './style'
import {RightOutlined} from '@ant-design/icons'
import * as ProductService from "../../services/ProductService";
import { useNavigate } from 'react-router-dom';


const NavbarComponent = () => {
  const navigate = useNavigate();

  const [typeProducts, setTypeProducts] = useState([])
  const fetchAllTypeProduct = async () => {
    const  res = await ProductService.getAllTypeProduct();
    if(res?.status === 'OK') {
      setTypeProducts(res?.data);
    }
  }
  useEffect(() => {
    fetchAllTypeProduct();
  },[])

  const productTypes = typeProducts.map((value) => {
    return (            
      <TypeLink onClick={() => navigate(`/product/${value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`,{state: value})} key={value}><RightOutlined style={{fontSize: '10px', color:'#CCD1DB'}} key={value}/>{value}</TypeLink>
    )
  })

  return (
    <NavBarWrapper>
        <BigLabel>DANH MỤC SẢN PHẨM</BigLabel>
        <TypeList>
            {productTypes}
        </TypeList>
        <BigLabel>LỌC SẢN PHẨM</BigLabel>
        <FilterByGroup>
            <FilterByLabel>Theo đánh giá</FilterByLabel>

        </FilterByGroup>

    </NavBarWrapper>
  )
}

export default NavbarComponent