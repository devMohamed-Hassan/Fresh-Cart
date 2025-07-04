import React from "react";
import Slider from "react-slick";
import { BarLoader, PropagateLoader } from "react-spinners";
import ProductCard from "../ProductCard/ProductCard";
import useCategories from "../../Hooks/useCategories";
import useProducts from "../../Hooks/useProducts";
import useBrands from "../../Hooks/useBrands";

const images = Object.values(
  import.meta.glob('../../assets/images/slider/*.{png,jpg,jpeg,JPEG,PNG}', {
    query: '?url',
    eager: true,
    import: 'default',
  })
);

function Home() {
  const {
    data: products,
    isError: productsError,
    error: productsErrorMsg,
    isLoading: productsLoading,
  } = useProducts();

  const {
    data: categories,
    isLoading: categoriesLoading,
  } = useCategories();

  const {
    data: brands,
    isLoading: brandsLoading,
  } = useBrands();

  const bannerSlider = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    cssEase: "ease-in-out",
  };

  const categorySlider = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const groupedProducts = React.useMemo(() => {
    if (!products) return {};
    const groups = {};
    products.forEach((product) => {
      const categoryName = product.category?.name || "Uncategorized";
      if (!groups[categoryName]) groups[categoryName] = [];
      groups[categoryName].push(product);
    });
    return groups;
  }, [products]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-2 w-full mt-6 px-4">
        <div className="bg-white text-[#350C2E] w-1/3 rounded-xl p-4 shadow-md max-h-[400px] flex flex-col">
          <h2 className="uppercase text-lg font-semibold mb-3 border-b border-gray-300 shadow-2xl">Categories</h2>
          {categoriesLoading ? (
            <div className="py-2">
              <BarLoader color="#0aad0a" height={4} width="100%" />
            </div>
          ) : (
            <ul className="space-y-3 overflow-y-auto pr-1 flex-1 custom-scrollbar">
              {categories?.map((cat) => (
                <li
                  key={cat._id}
                  className="flex items-center gap-3  py-2 px-2 rounded hover:bg-white/10 cursor-pointer transition border-b border-white/10 last:border-b-0"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-8 h-8 rounded border border-white/30 object-cover"
                  />
                  <span className="text-sm font-semibold text-gray-600 truncate">{cat.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="md:w-2/3 w-2/3 h-[400px] rounded-xl overflow-hidden shadow-md">
          <Slider {...bannerSlider} className="w-full h-full">
            {images.map((img, idx) => (
              <div key={idx} className="w-full h-full">
                <img
                  src={img}
                  alt={`slide-${idx}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="mt-12 px-4">
        <h2 className="text-xl font-semibold  mb-5">Top Brands</h2>
        <div className="w-full">
          <Slider {...categorySlider} className="px-2">
            {brands?.map((brand) => (
              <div key={brand._id} className="px-2">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex items-center justify-center h-40">
                  <img src={brand.image} alt={brand.name} className="max-h-full max-w-full object-contain" />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="container mx-auto mt-12 px-4">
        {productsLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <PropagateLoader size={20} color="#0aad0a" />
          </div>
        ) : productsError ? (
          <p className="text-center text-xl font-semibold text-red-500">{productsErrorMsg}</p>
        ) : (
          Object.entries(groupedProducts)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([category, items]) => (
              <div key={category} className="mb-12">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">{category}</h2>
                <Slider {...categorySlider} className="w-full">
                  {items.map((product) => (
                    <div key={product.id} className="px-2">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </Slider>
              </div>
            ))
        )}
      </div>
    </>
  );
}

export default Home;
