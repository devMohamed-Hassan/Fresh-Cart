import React, { useEffect, useState } from "react";
import axios from "axios";
import { PropagateLoader   } from "react-spinners";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      setProducts(data.data);
    } catch (error) {
      //console.log(error.message);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <PropagateLoader   size={20} color="#0aad0a" />
        </div>
      ) : errorMessage ? (
        <p className="text-center text-xl font-semibold text-red-500">{errorMessage}</p>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products?.map((item) => <Product product={item} key={item.id} />)}
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
