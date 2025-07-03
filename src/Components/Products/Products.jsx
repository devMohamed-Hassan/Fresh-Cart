import React, { useEffect, useState } from "react";
import axios from "axios";
import { PropagateLoader } from "react-spinners";
import useRecentProducts from "../../Hooks/useRecentProducts";

function Products() {
  const { data, isError, error, isLoading, isFetching } = useRecentProducts();
  return (
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


export default Products;
