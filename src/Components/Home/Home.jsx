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

import img1 from "../../assets/images/blog-img-1.jpeg";
import img2 from "../../assets/images/blog-img-2.jpeg";

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
    <div className="flex gap-4 w-full px-6 py-8 bg-gray-100 rounded-xl mt-5">

      <div className="w-2/3 h-[416px] overflow-hidden rounded">
        <Slider {...settings}>
          {images.map((img, idx) => (
            <div
              key={idx}
              className="w-full h-[416px] flex justify-center items-center"
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover rounded"
              />
            </div>
          ))}
        </Slider>
      </div>


      <div className="w-1/3 flex flex-col gap-4">
        <img
          src={img1}
          alt=""
          className="w-full h-[200px] object-cover rounded"
        />
        <img
          src={img2}
          alt=""
          className="w-full h-[200px] object-cover rounded"
        />
      </div>
    </div>
  );
}

export default Home;
