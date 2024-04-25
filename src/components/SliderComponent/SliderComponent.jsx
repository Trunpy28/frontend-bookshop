import { Image } from "antd";
import React from "react";
import Slider from "react-slick";

const SliderComponent = ({ sliderListImg }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <Slider {...settings}>
        {
            sliderListImg.map((item, index) => {
                return (
                    <Image src={item} alt="slider" preview={false} width='100%' height='30vw'/>
                )
            })
        }
    </Slider>
  );
};

export default SliderComponent;
