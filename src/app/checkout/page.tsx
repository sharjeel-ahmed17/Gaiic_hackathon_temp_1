"use client"

import { useState , useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Products } from "../../../types/products"
import {ChevronRight} from "lucide-react"

const Checkout = () => {
    const [cartItems , setCartItems] = useState<Products[]>([])

    const [discount , setDiscount] = useState<Number>(0)
    const [formValues , setFormValues] = useState({
        firstName : "",
        lastName : "",
        addressName : "",
        city : "",
        zipCode  : "",
        phone : "",
        email : "",
        firstName : "",
    })
  return (
    <div>Checkout</div>
  )
}

export default Checkout