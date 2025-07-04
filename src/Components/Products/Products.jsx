import React from "react";
import { PropagateLoader } from "react-spinners";
import useProducts from "../../Hooks/useProducts";
import ProductCard from "../ProductCard/ProductCard";

function Products() {
  const { data, isError, error, isLoading, isFetching } = useProducts();
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
            {data?.map((item) => <ProductCard product={item} key={item.id} />)}
          </div>
        </>
      )}
    </div>
  );

}



export default Products;
