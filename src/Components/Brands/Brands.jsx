import React from "react";
import useBrands from "../../Hooks/useBrands";
import { BarLoader } from "react-spinners";
import NotFound from "../NotFound/NotFound";
import { useNavigate } from "react-router-dom";

function Brands() {
  const { data, isLoading, isError, error } = useBrands();
  
  if (isLoading) {
    return (
      <div className="py-6">
        <BarLoader color="#0aad0a" height={4} width="100%" />
      </div>
    );
  }

  if (isError) {
    return (
      <NotFound message={error.message} />
    )
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {data?.map((brand) => (
          <BrandCard key={brand._id} brand={brand} />
        ))}
      </div>
    </div>
  );
}

function BrandCard({ brand }) {
  const navigate = useNavigate();
  console.log(brand)
  return (
    <div
      onClick={() => navigate(`/products/${brand._id}`)}
      className="group relative bg-white flex flex-col items-center border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer" >
      <div className="w-full flex justify-center px-4 py-5">
        <img
          src={brand.image}
          alt={brand.name}
          className="max-w-full h-24 object-contain transition-transform duration-300 group-hover:scale-105 "
        />
      </div>
      <div className="w-full text-center py-3 bg-green-400 mt-auto border-t border-gray-200">
        <span className="text-lg   font-semibold  text-white">{brand.name}</span>
      </div>
    </div >
  );
}

export default Brands;
