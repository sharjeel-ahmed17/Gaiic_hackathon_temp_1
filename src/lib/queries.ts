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
export const getAllcategories = groq`array::unique(*[_type == "products"].category)`
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


// orders data
export const allOrders =  groq`*[_type == "order"]{
          _id,
          firstName,
          lastName,
          phone,
          email,
          address,
          city,
          zipCode,
          total,
          discount,
          orderDate,
          status,
          cartItems[]->{
            productName,
            "imageUrl" : image.asset->url
          }
        }`