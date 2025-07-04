import React, { useContext } from "react";
import Slider from "react-slick";
import { PropagateLoader } from "react-spinners";
import useProducts from "../../Hooks/useProducts";
import img1 from "../../assets/images/blog-img-1.jpeg";
import img2 from "../../assets/images/blog-img-2.jpeg";
import ProductCard from "../ProductCard/ProductCard";
const images = Object.values(
  import.meta.glob('../../assets/images/*.{png,jpg,jpeg,JPEG,PNG}', {
    query: '?url',
    eager: true,
    import: 'default',
  })
);

function Home() {
  const { data, isError, error, isLoading } = useProducts();

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

  const groupedProducts = React.useMemo(() => {
    if (!data) return {};
    const groups = {};
    data.forEach((product) => {
      const categoryName = product.category?.name || "Uncategorized";
      if (!groups[categoryName]) groups[categoryName] = [];
      groups[categoryName].push(product);
    });
    return groups;
  }, [data]);

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
            {Object.entries(groupedProducts)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([category, products]) => (
                <div key={category} className="mb-8">
                  <h2 className="text-xl font-bold mb-4 border-b pb-2">{category}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {products.map((item) => (
                      <ProductCard product={item} key={item.id} />
                    ))}
                  </div>

                </div>
              ))}
          </>
        )}
      </div>
    </>
  );
}


export default Home;
