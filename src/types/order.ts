export interface Order {
    _id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    total: number;
    discount: number;
    orderDate: string;
    status: string | null;
    cartItems: { name: string; imageUrl: string }[];
  }