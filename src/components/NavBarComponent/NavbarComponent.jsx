import React from 'react'
import { BigLabel, FilterByGroup, FilterByLabel, NavBarWrapper, TypeLink, TypeList } from './style'
import {RightOutlined} from '@ant-design/icons'

const NavbarComponent = () => {
  return (
    <NavBarWrapper>
        <BigLabel>DANH MỤC SẢN PHẨM</BigLabel>
        <TypeList>
            <TypeLink to={"https://github.com/"}><RightOutlined style={{fontSize: '10px', color:'#CCD1DB'}}/> Sách kinh tế</TypeLink>
            <TypeLink to={"https://github.com/"}><RightOutlined style={{fontSize: '10px', color:'#CCD1DB'}}/> Sách kinh tế</TypeLink>
            <TypeLink to={"https://github.com/"}><RightOutlined style={{fontSize: '10px', color:'#CCD1DB'}}/> Sách kinh tế</TypeLink>
        </TypeList>
        <BigLabel>LỌC SẢN PHẨM</BigLabel>
        <FilterByGroup>
            <FilterByLabel>Theo đánh giá</FilterByLabel>

        </FilterByGroup>

    </NavBarWrapper>
  )
}

export default NavbarComponent