import React from "react";
import { Carousel } from "antd";

const PriceListCarousel = () => {
  return localStorage.getItem("@lang") === "vi" ? (
    <Carousel autoplay={true} dots={false} style={{ width: "100%" }}>
      <div>
        <img style={{ width: "100%" }} src="./img/bike.PNG" alt="" />
      </div>
      <div>
        <img style={{ width: "100%" }} src="./img/truck.jpg" alt="" />
      </div>
    </Carousel>
  ) : (
    <Carousel autoplay={true} dots={false} style={{ width: "100%" }}>
      <div>
        <img style={{ width: "100%" }} src="./img/china_bike.jpg" alt="" />
      </div>
      <div>
        <img style={{ width: "100%" }} src="./img/china_truck.jpg" alt="" />
      </div>
    </Carousel>
  );
};

export default PriceListCarousel;
