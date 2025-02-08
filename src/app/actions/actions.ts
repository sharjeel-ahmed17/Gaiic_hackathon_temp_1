
// }

import { Products } from "../../../types/products";

// ✅ Extended Products interface for cart inventory
interface CartProduct extends Products {
  inventory: number;
}

// ✅ Get cart items safely from localStorage
const getCart = (): CartProduct[] => {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
};

// ✅ Add to Cart Function
export const addToCart = (product: Products) => {
  const cart: CartProduct[] = getCart();

  const existingProductIndex = cart.findIndex((item) => item._id === product._id);
  
  if (existingProductIndex > -1) {
    cart[existingProductIndex].inventory += 1;
  } else {
    cart.push({ ...product, inventory: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

// ✅ Remove from Cart
export const removeFromCart = (productId: string) => {
  let cart: CartProduct[] = getCart();
  cart = cart.filter((item) => item._id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
};

// ✅ Update Cart Quantity
export const updateCartQuantity = (productId: string, quantity: number) => {
  const cart: CartProduct[] = getCart();
  const productIndex = cart.findIndex((item) => item._id === productId); // ✅ Fix condition

  if (productIndex > -1) {
    cart[productIndex].inventory = quantity;
    localStorage.setItem("cart", JSON.stringify(cart)); // ✅ Update localStorage
  }
};

// ✅ Get Cart Items
export const getCartItems = (): CartProduct[] => {
  return getCart();
};
