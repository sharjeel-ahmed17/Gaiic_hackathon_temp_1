import { Products } from "@/types/products";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";

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
        price,
        "slug" : slug.current,
      }
    `,
    { slug }
  );
}

const ProductDetailsPage = async ({ params }: ProductPageProps) => {
  const product = await getProducts(params.slug);
  console.log("params >>>", params.slug);
  console.log("products >>>>", product);

  return (
    <div>
      <h2>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
        aspernatur corrupti voluptates!
      </h2>
      <div>
        <h2>{product?.name ?? "Product not found"}</h2>
        {product?.imageUrl && (
          <Image
            src={product.imageUrl}
            width={200}
            height={200}
            alt={product.name}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
