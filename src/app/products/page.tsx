"use client";
import SearchBar from "@/components/common/header/Search"; // Import the SearchBar component
import useProductsHook from "@/hooks/useProductsHook";
import CategoryFilter from "@/components/products/filter/CategoryFilter";
import ColorsFilter from "@/components/products/filter/ColorsFilter";
import SizesFilter from "@/components/products/filter/SizesFilter";
import Pagination from "@/components/products/filter/pagination/pagination";

const ProductsListingPage = () => {
  const {
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
    sizes,
    colors,
  } = useProductsHook();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Listing</h1>

      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Price Range Slider */}
      <div className="mb-4">
        <label className="block text-sm font-medium">
          Max Price: ${priceRange}
        </label>
        <input
          type="range"
          min="10"
          max="500"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <CategoryFilter setSelectedCategory={setSelectedCategory} categories={categories} />
        <SizesFilter setSelectedSize={setSelectedSize} sizes={sizes} />
        <ColorsFilter setSelectedColor={setSelectedColor} colors={colors} />
      </div>

      {/* Product Listing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentProducts.map((product) => (
          <div key={product._id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-sm">Category: {product.category}</p>
            <p className="text-sm">Sizes: {product.sizes.join(", ")}</p>
            <p className="text-sm">Colors: {product.colors.join(", ")}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <Pagination />
    </div>
  );
};

export default ProductsListingPage;
