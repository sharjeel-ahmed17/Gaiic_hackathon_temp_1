import React from "react";
import { Products } from "../../../../types/products";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

interface ProductPageProps {
  params: { slug: string }; 
}

async function getProducts(slug: string): Promise<Products | null> {
  return client.fetch(
    groq`
      *[_type == "products" && slug.current == $slug][0] {
        _id, 
        name,
        "imageUrl": image.asset->url,
        _type,
        price
      }
    `,
    { slug } 
  );
}

const ProductDetailsPage = async ({ params }: ProductPageProps) => {
  const product = await getProducts(params.slug); 

  return (
    <div>
      <h2>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia aspernatur corrupti voluptates!
      </h2>
      <div>
        <h2>{product?.name ?? "Product not found"}</h2>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
