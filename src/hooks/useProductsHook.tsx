import { allProducts, getAllcategories } from "@/lib/queries";
import { client } from "@/sanity/lib/client";
import { Products } from "@/types/products";
import { useEffect, useState } from "react";

const useProductsHook = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [priceRange, setPriceRange] = useState<number>(500);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // New state for search

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      const data: Products[] = await client.fetch(allProducts);
      setProducts(data);
      setFilteredProducts(data);
    };

    fetchProducts();
    fetchCategories();
    fetchColors();
    fetchSizes();
  }, []);

  useEffect(() => {
    // Apply filters including search query
    const filtered = products.filter((product) => {
      return (
        (selectedCategory ? product.category === selectedCategory : true) &&
        (selectedSize ? product.sizes.includes(selectedSize) : true) &&
        (selectedColor ? product.colors.includes(selectedColor) : true) &&
        product.price <= priceRange &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) // Search filter
      );
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [
    priceRange,
    selectedCategory,
    selectedSize,
    selectedColor,
    searchQuery,
    products,
  ]);

  // functions

  const fetchCategories = async () => {
    const categoryList: string[] = await client.fetch(
      `array::unique(*[_type == "products" && defined(category)].category)`
    );
    setCategories(categoryList);
  };
  const fetchColors = async () => {
    const colorsList: string[] = await client.fetch(
      `array::unique(*[_type == "products"].colors[])`
    );
    setColors(colorsList);
  };
  const fetchSizes = async () => {
    const sizesList: string[] = await client.fetch(
      `array::unique(*[_type == "products"].sizes[])`
    );
    setSizes(sizesList);
  };
  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return {
    products,
    categories,
    filteredProducts,
    currentProducts,
    priceRange,
    selectedColor,
    selectedCategory,
    selectedSize,
    searchQuery,
    currentPage,
    setCurrentPage,
    setPriceRange,
    setSelectedColor,
    setSelectedCategory,
    setSelectedSize,
    setSearchQuery,
    productsPerPage,
    indexOfFirstProduct,
    indexOfLastProduct,
    sizes ,
    colors
  };
};

export default useProductsHook;
