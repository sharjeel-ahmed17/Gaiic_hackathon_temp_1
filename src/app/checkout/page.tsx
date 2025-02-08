"use client";

import { useState, useEffect } from "react";
import { Products } from "@/types/products";
import { getCartItems } from "@/actions/actions";
import Swal from "sweetalert2";
import { client } from "@/sanity/lib/client";


const Checkout = () => {
  const [cartItems, setCartItems] = useState<Products[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    addressName: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    addressName: false,
    city: false,
    zipCode: false,
    phone: false,
    email: false,
  });

  useEffect(() => {
    setCartItems(getCartItems());
    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.inventory,
    0
  );
  const total = Math.max(subTotal - discount, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {
      firstName: !formValues.firstName,
      lastName: !formValues.lastName,
      addressName: !formValues.addressName,
      city: !formValues.city,
      zipCode: !formValues.zipCode,
      phone: !formValues.phone,
      email: !formValues.email,
    };
    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };
 
  const handleProceedOrder = async () => {

     if (validateForm()) {
    localStorage.removeItem("appliedDiscount");
    Swal.fire({
      title: "Success",
      text: "Order placed successfully!",
      icon: "success",
    });
  } else {
    Swal.fire({
      title: "Error",
      text: "Please fill in all required fields",
      icon: "error",
      confirmButtonText: "Okay",
    });
  }
    const orderData = {
      _type: "order",
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      address: formValues.addressName,
      city: formValues.city,
      zipCode: formValues.zipCode,
      phone: formValues.phone,
      email: formValues.email,
      cartItems: cartItems.map(item =>({
        _type : "reference",
        _ref : item._id
      })),
      
      
      total: total,
      discount: discount,
      orderDate: new Date().toISOString(),
      status: "pending", 
    };


    try {
      await client.create(orderData);
      localStorage.removeItem("appliedDiscount")
console.log("order created>>>>>>");

    } catch (error) {
console.log("error crating order" , error);

      
    }
    
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Billing Details</h3>
          <form className="space-y-4">
            {Object.keys(formValues).map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  id={field}
                  type="text"
                  value={formValues[field as keyof typeof formValues]}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none $ {
                    formErrors[field as keyof typeof formErrors] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formErrors[field as keyof typeof formErrors] && (
                  <p className="text-red-500 text-sm">This field is required</p>
                )}
              </div>
            ))}
          </form>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between py-2 border-b">
              <span>{item.name}</span>
              <span>${item.price * item.inventory}</span>
            </div>
          ))}
          <div className="flex justify-between mt-4 font-semibold">
            <span>Subtotal:</span>
            <span>${subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Discount:</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-2 text-xl font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleProceedOrder}
            className="w-full mt-4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          >
            Proceed to Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;



