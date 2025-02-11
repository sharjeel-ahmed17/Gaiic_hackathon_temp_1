interface CategoryFilterProps {
    setSelectedCategory: (category: string) => void;
    categories: string[];
  }
  
  const CategoryFilter: React.FC<CategoryFilterProps> = ({ setSelectedCategory  ,categories}) => {
      return (
         <>
       <select onChange={(e) => setSelectedCategory(e.target.value)} className="p-2 border rounded">
  <option value="">All Categories</option>
  {categories.map((category) => (
    <option key={category} value={category}>
      {category}
    </option>
  ))}
</select>
         </>
      );
  };
  
  export default CategoryFilter;
  