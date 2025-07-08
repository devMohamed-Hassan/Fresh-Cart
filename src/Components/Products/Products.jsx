import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { BarLoader } from "react-spinners";
import ProductCard from "../ProductCard/ProductCard";
import NotFound from "../NotFound/NotFound";

function Products() {
  const [searchParams] = useSearchParams();
  const brandId = searchParams.get("brand");
  const categoryId = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(null);
  const [brandName, setBrandName] = useState("");
  const [catName, setCatName] = useState("");
  const [error, setError] = useState("")


  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        const query = [];
        if (brandId) query.push(`brand=${brandId}`);
        if (categoryId) query.push(`category=${categoryId}`);

        const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?${query.join("&")}`);

        setProducts(res.data.data);

        if (res.data.data.length > 0) {
          if (brandId) setBrandName(res.data.data[0].brand.name);
          if (categoryId) setCatName(res.data.data[0].category.name);
        } else {
          setBrandName("");
          setCatName("");
        }
      } catch (err) {
        setError("No products available now. Coming soon!");
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [brandId, categoryId]);


  if (loading) {
    return (
      <div className="py-2">
        <BarLoader color="#0aad0a" height={4} width="100%" />
      </div>
    );
  }

  if (error || products.length === 0) {
    return (
      <NotFound message={"No products available now. Coming soon!"} />
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        {brandName && `Brand: ${brandName}`}
        {catName && `Category: ${catName}`}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((item) => (
          <ProductCard product={item} key={item._id} />
        ))}
      </div>
    </div >
  );
}

export default Products;
