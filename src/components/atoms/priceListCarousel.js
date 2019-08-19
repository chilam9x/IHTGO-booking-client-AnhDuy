import React from "react";
import { Carousel } from "antd";

const PriceListCarousel = () => {
  return (
    <Carousel autoplay={true} dots={false}>
      <div>
        <img style={{ height: "150px" }} src="./img/bike.PNG" alt="" />
      </div>
      <div>
        <img style={{ height: "150px" }} src="./img/truck.PNG" alt="" />
      </div>
    </Carousel>
  );
};

export default PriceListCarousel;
