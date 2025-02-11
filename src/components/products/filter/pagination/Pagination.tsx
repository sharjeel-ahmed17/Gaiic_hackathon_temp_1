import useProductsHook from '@/hooks/useProductsHook'
import React from 'react'

const Pagination = () => {
        const {
        filteredProducts,
        currentPage,
        setCurrentPage,
 indexOfLastProduct,
       } = useProductsHook();
  return (
    <div className="flex justify-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded mr-2 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Previous
        </button>
        <span className="px-4 py-2 border rounded">{currentPage}</span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              indexOfLastProduct < filteredProducts.length ? prev + 1 : prev
            )
          }
          disabled={indexOfLastProduct >= filteredProducts.length}
          className={`px-4 py-2 border rounded ml-2 ${
            indexOfLastProduct >= filteredProducts.length
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Next
        </button>
      </div>
  )
}

export default Pagination