import React from "react";
import { BarLoader } from "react-spinners";
import useProducts from "../../Hooks/useProducts";
import ProductCard from "../ProductCard/ProductCard";

function Products() {
  const { data, isError, error, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="py-2">
        <BarLoader color="#0aad0a" height={4} width="100%" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p className="text-center text-xl font-semibold text-red-500">
          {error?.message || "An unexpected error occurred."}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {data?.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.map((item) => (
            <ProductCard product={item} key={item.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
