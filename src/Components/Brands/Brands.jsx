import React from 'react';
import useBrands from '../../Hooks/useBrands';

function Brands() {
  const { data, isLoading, isError, error } = useBrands();

  if (isLoading) return <p className="text-center text-gray-500">Loading brands...</p>;
  if (isError) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Brands ({data?.results || 0})
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data?.data?.map((brand) => (
          <div key={brand._id} className="border rounded-xl p-3 hover:shadow-md transition-shadow">
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-32 object-contain mb-2"
            />
            <h2 className="text-center text-sm font-semibold">{brand.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Brand;
