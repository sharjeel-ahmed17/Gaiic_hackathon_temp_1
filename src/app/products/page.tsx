"use client";
import { allProducts } from "@/lib/queries";
import { client } from "@/sanity/lib/client";
import { Products } from "@/types/products";
import { useEffect, useState } from "react";

const ProductsListingPage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [filterProducts, setFilterProducts] = useState<Products[]>([]);
  const [priceRange, setPriceRange] = useState<number>(500);
  useEffect(() => {
    const getallProducts = async () => {
      const data: Products[] = await client.fetch(allProducts);
      setProducts(data);
      setFilterProducts(data);
    };
    getallProducts();
  }, []);

  useEffect(() => {
    const filter = products.filter((item) => item.price <= priceRange);
    setFilterProducts(filter);
  }, [priceRange, products]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange(Number(e.target.value));
  };

  return (
    <div>
      <h1>product listing</h1>
      {filterProducts.length}
      <input
        type="range"
        min="10"
        max="500"
        value={priceRange}
        onChange={handlePriceChange}
      />
      {filterProducts.map((product) => (
        <div key={product._id}>
          <h2>{product.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default ProductsListingPage;
