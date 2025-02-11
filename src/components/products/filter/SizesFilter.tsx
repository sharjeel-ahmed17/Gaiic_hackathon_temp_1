interface SizesFilterProps {
  setSelectedSize: (category: string) => void;
  sizes: string[];
}

const SizesFilter: React.FC<SizesFilterProps> = ({ setSelectedSize  ,sizes}) => {
    return (
       <>
     <select onChange={(e) => setSelectedSize(e.target.value)} className="p-2 border rounded">
<option value="">All sizes</option>
{sizes.map((category) => (
  <option key={category} value={category}>
    {category}
  </option>
))}
</select>
       </>
    );
};

export default SizesFilter;
