import React, { useContext } from "react";
import Slider from "react-slick";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";
import styles from "./Home.module.css";
import { CartContext } from "../../Context/CartContext";
import useRecentProducts from "../../Hooks/useRecentProducts";
import img1 from "../../assets/images/blog-img-1.jpeg";
import img2 from "../../assets/images/blog-img-2.jpeg";
const images = Object.values(
  import.meta.glob('../../assets/images/*.{png,jpg,jpeg,JPEG,PNG}', {
    query: '?url',
    eager: true,
    import: 'default',
  })
);

function Home() {
  const { data, isError, error, isLoading } = useRecentProducts();
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
                      <Product product={item} key={item.id} />
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

function Product({ product }) {
  const { addToCart } = useContext(CartContext);
  const { title, price, imageCover, category, ratingsAverage, id } = product;

  async function handleAddToCart() {
    try {
      const result = await addToCart(id);
      toast.success("Product added to cart successfully!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
      console.log("Added to cart successfully:", result);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product to cart.", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
      console.error("Failed to add to cart:", error.response?.data?.message || error.message);
    }
  }

  return (
    <div className="border rounded-2xl p-5 hover:shadow-xl transition-shadow duration-300 product bg-white flex flex-col">
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <img
          src={imageCover}
          alt={title}
          className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h1 className="text-xs text-gray-400 uppercase tracking-wide mb-1">
        {category.name}
      </h1>
      <h2 className="text-lg font-bold text-gray-800 mb-2">
        {title.split(" ").slice(0, 2).join(" ")}
      </h2>
      <p className="text-green-600 font-extrabold text-base mb-2">{price} EGP</p>
      <p className="flex items-center font-semibold mb-4 gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <i
            key={i}
            className={`fa-solid fa-star ${i < Math.round(ratingsAverage) ? "text-yellow-500" : "text-gray-300"
              }`}
          ></i>
        ))}
        <span className="ml-2 text-gray-600 text-sm">
          {ratingsAverage.toFixed(1)}
        </span>
      </p>
      <button className="bg-[var(--main-color)] btn text-white font-semibold rounded-lg py-2 mt-auto transition-colors duration-300 hover:bg-opacity-90"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Home;
