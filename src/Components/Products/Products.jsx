import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BarLoader } from "react-spinners";
import useProducts from "../../Hooks/useProducts";
import ProductCard from "../ProductCard/ProductCard";
import NotFound from "../NotFound/NotFound";

function Products() {
  const { slug } = useParams();
  console.log(slug)

  const { data: allProducts, isLoading, isError, error } = useProducts();
  const [products, setProducts] = useState([]);
  const [brandName, setBrandName] = useState('');
  const [loading, setLoading] = useState(true);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    const fetchProductsByBrand = async () => {
      if (!slug) {
        if (allProducts) {
          setProducts(allProducts);
          setLoading(false);
        }
        return;
      }

      try {
        const productsRes = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products?brand=${slug}`
        );
        setProducts(productsRes.data.data);
        setBrandName(productsRes.data.data[0].brand.name);
      } catch (err) {
        console.error(err);
        setLocalError("Failed to fetch products for this brand.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByBrand();
  }, [slug, allProducts]);


  if (loading || isLoading) {
    return (
      <div className="py-2">
        <BarLoader color="#0aad0a" height={4} width="100%" />
      </div>
    );
  }


  if (isError || localError) {
    return (
      <NotFound message={error?.message || localError} />
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {slug ? `${brandName} Products` : "All Products"}
      </h1>

      {products?.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((item) => (
            <ProductCard product={item} key={item._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
