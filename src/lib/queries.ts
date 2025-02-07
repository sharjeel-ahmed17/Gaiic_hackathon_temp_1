import { groq } from "next-sanity";

export const allProducts =  groq`*[_type == "products"]`
export const fourProducts =  groq`*[_type == "products"][0..3]`