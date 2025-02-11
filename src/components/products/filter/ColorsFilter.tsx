interface ColorsFilterProps {
  setSelectedColor: (category: string) => void;
  colors: string[];
}

const ColorsFilter: React.FC<ColorsFilterProps> = ({ setSelectedColor  ,colors}) => {
    return (
       <>
     <select onChange={(e) => setSelectedColor(e.target.value)} className="p-2 border rounded">
<option value="">All colors</option>
{colors.map((category) => (
  <option key={category} value={category}>
    {category}
  </option>
))}
</select>
       </>
    );
};

export default ColorsFilter;
