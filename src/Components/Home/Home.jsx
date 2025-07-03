import React from "react";
import styles from "./Home.module.css";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import { PropagateLoader } from "react-spinners";

const images = Object.values(
  import.meta.glob('../../assets/images/*.{png,jpg,jpeg,JPEG,PNG}', {
    query: '?url',
    eager: true,
    import: 'default',
  })
);

import img1 from "../../assets/images/blog-img-1.jpeg";
import img2 from "../../assets/images/blog-img-2.jpeg";
import useRecentProducts from "../../Hooks/useRecentProducts";

function Home() {
  const { data, isError, error, isLoading, isFetching } = useRecentProducts();
  console.log("products response:", data);


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
      <div className="container mx-auto p-4">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <PropagateLoader size={20} color="#0aad0a" />
          </div>
        ) : isError ? (
          <p className="text-center text-xl font-semibold text-red-500">{error}</p>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data?.map((item) => <Product product={item} key={item.id} />)}
            </div>
          </>
        )}
      </div>

    </>
  );

}

function Product({ product }) {
  const { title, price, imageCover, category, ratingsAverage } = product;
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
      <img
        src={imageCover}
        alt={title}
        className="w-full h-48 object-cover mb-2 rounded"
      />
      <h1 className="text-sm text-gray-500 mb-1">{category.name}</h1>
      <h2 className="text-lg font-semibold mb-1">{title.split(" ").slice(0, 2).join(" ")}</h2>
      <p className="text-green-600 font-bold mb-1">{price} EGP</p>
      <p className="text-yellow-500 font-medium">
        {ratingsAverage}
      </p>
    </div>
  );
}

export default Home;
