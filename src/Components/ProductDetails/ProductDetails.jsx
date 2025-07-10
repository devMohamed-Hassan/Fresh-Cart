import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { useCart } from "../../Context/CartContext";
import NotFound from "../NotFound/NotFound";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingCart, setLoadingCart] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { addToCart } = useCart();
  const [showMore, setShowMore] = useState(false);



  const { id } = useParams();

  useEffect(() => {
    fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch product:", err);
        setLoading(false);
      });
  }, [id]);

  async function handleAddToCart() {
    try {
      setLoadingCart(true);
      await addToCart(id);
      toast.success("Product added to cart successfully!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    } catch (error) {
      console.error("Cart error:", error);
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to add product to cart.";
      toast.error(errorMsg, {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setLoadingCart(false);
    }
  }

  if (loading) {
    return (<div className="py-2">
      <BarLoader color="#0aad0a" height={4} width="100%" />
    </div>
    )
  }
  if (!product) return (
    <NotFound message={"This product does not exist or may have been removed."} />
  );

  const allImages = [product.imageCover, ...product.images];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-xl border border-gray-300 shadow-md">

        <div>
          <Swiper
            spaceBetween={10}
            navigation={false}
            loop={true}
            autoplay={{ delay: 3000 }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs, Autoplay]}
            className=" shadow-lg overflow-hidden rounded-xl"
          >
            {allImages.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Product ${index}`}
                  className="w-full h-auto max-h-[70vh] sm:max-h-[400px] md:max-h-[600px] lg:max-h-[700px] object-contain"
                />
              </SwiperSlide>

            ))}
          </Swiper>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-gray-800">{product.title}</h1>

          <p className="text-gray-600 text-base leading-7 tracking-wide">
            {showMore
              ? product.description
              : product.description.slice(0, 150) + (product.description.length > 150 ? "..." : "")}
          </p>

          {product.description.length > 150 && (
            <button
              className="text-green-600 font-semibold text-sm mt-1 hover:underline"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          )}



          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            watchSlidesProgress={true}
            modules={[Thumbs]}
            className="mt-4"
          >
            {allImages.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Thumb ${index}`}
                  className="w-full h-24 object-cover rounded-xl border border-gray-300 shadow-sm cursor-pointer"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="text-2xl font-bold text-green-600">
            {product.price.toLocaleString()} EGP
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Sold: {product.sold}</span>
            <span>Rating: {product.ratingsAverage} ⭐ ({product.ratingsQuantity})</span>
          </div>

          <div className="flex gap-2 flex-wrap">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Brand: {product.brand.name}
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              Category: {product.category.name}
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              Subcategory: {product.subcategory[0]?.name}
            </span>
          </div>

          <button
            className={`bg-green-500 btn w-full text-white font-semibold rounded-lg py-2 mt-auto transition duration-300 ${loadingCart
              ? "opacity-70 cursor-not-allowed"
              : "hover:bg-green-600 hover:bg-opacity-90"
              }`}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            disabled={loadingCart}
          >
            {loadingCart ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Adding...
              </span>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
