import React from "react";
import useCategories from "../../Hooks/useCategories";
import { BarLoader } from "react-spinners";
import NotFound from "../NotFound/NotFound";
import { useNavigate, useSearchParams } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();

  const { data: categories, isLoading, isError, error } = useCategories();

  if (isLoading) {
    return (
      <div className="py-2">
        <BarLoader color="#0aad0a" height={4} width="100%" />
      </div>
    );
  }

  if (isError) {
    return (
      <NotFound message={error.message} />
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories?.map((category) => (
          <div
            key={category._id}
            onClick={() => {
              const query = new URLSearchParams();
              query.set("category", category._id);
              navigate(`/products?${query.toString()}`);
            }}
            className="relative group bg-white rounded-2xl shadow hover:shadow-lg transition-transform transform hover:scale-105 overflow-hidden cursor-pointer"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-60 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-70 transition-opacity duration-300">
              <p className="text-white text-lg font-semibold">{category.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Categories;
