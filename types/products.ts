export interface Products {
  _id: string;
  _type: "products";    
  name: string;
  slug: {  
    _type: "slug";  
    current: string; 
  };
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  discountPercent?: number;
  isNew: boolean;
  colors: string[];
  sizes: string[];
}
