import React from "react";
import { Carousel } from "antd";

const PriceListCarousel = () => {
  return (
    <Carousel autoplay={true} dots={false} style={{ width: "100%" }}>
      <div>
        <img style={{ width: "100%" }} src="./img/bike.PNG" alt="" />
      </div>
      <div>
        <img style={{ width: "100%" }} src="./img/truck.PNG" alt="" />
      </div>
    </Carousel>
  );
};

export default PriceListCarousel;
