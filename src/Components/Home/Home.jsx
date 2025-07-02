import React from "react";
import styles from "./Home.module.css";
import Slider from "react-slick";

const images = Object.values(
  import.meta.glob('../../assets/images/*.{png,jpg,jpeg,JPEG,PNG}', {
    query: '?url',
    eager: true,
    import: 'default',
  })
);

import img1 from "../../assets/images/blog-img-1.jpeg"
import img2 from "../../assets/images/blog-img-2.jpeg"



function Home() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    cssEase: "ease-in-out",
  };


  return (
    <>
      <div className="flex gap-4">
        <div className="w-2/3">
          <Slider {...settings}>
            {images.map((img, idx) => (
              <div key={idx} className="w-full flex justify-center items-center">
                <img
                  src={img}
                  alt=""
                  className="w-full h-96 object-cover rounded"
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="w-1/3 flex flex-col gap-2">
          <img
            src={img1}
            alt=""
            className="w-full h-48 object-cover rounded"
          />
          <img
            src={img2}
            alt=""
            className="w-full h-48 object-cover rounded"
          />
        </div>
      </div>


    </>
  );
}

export default Home;
