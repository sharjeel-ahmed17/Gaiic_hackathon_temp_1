import { groq } from "next-sanity";

export const allProducts =  groq`*[_type == "products"]{
  _id,
  name,
  "slug": slug.current,
  description,
  price,
  "imageUrl" : image.asset->url,
  category,
  discountPercent,
  "isNew": new,
  colors,
  sizes,
  inventory
}`

export const fourProducts =  groq`*[_type == "products"][0..3]{

 _id,
  name,
  description,
  price,
  "imageUrl" : image.asset->url,
  category,
  discountPercent,
  "isNew": new,
  colors,
  sizes
}`

export const EightProducts =  groq`*[_type == "products"][0..3]{

_id,
 name,
 description,
 price,
 "imageUrl" : image.asset->url,
 category,
 discountPercent,
 "isNew": new,
 colors,
 sizes
}`