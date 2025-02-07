"use client";

import { useState, useEffect } from "react";
import { Products } from "../../types/products";
import { client } from "@/sanity/lib/client";
import { allProducts } from "@/lib/queries";
import Image from "next/image";

const Home = () => {
  const [products, setProducts] = useState<Products[]>([]);

  const getAllProducts = async () => {
    try {
      const data: Products[] = await client.fetch<Products[]>(allProducts);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  if (!products.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* {products.length} */}
      <h1>home</h1>
      {products.map((products) => {
        // console.log("image url >>>", products.imageUrl);

        return <div key={products._id}>
          <h3>{products.name}</h3>
     <Image src={products.imageUrl} width={200} height={200} alt={products.name}/>
        </div>;
      })}
    </div>
  );
};

export default Home;
