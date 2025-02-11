'use client'

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { client } from "@/sanity/lib/client";
import { Order } from "@/types/order";
import { allOrders } from "@/lib/queries";

const useAdminHooks = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setselectedOrderId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const getAllOrders = async () => {
    try {
      const data: Order[] = await client.fetch(allOrders);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching Orders", error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const filterOrder =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  const toggleOrderDetails = (orderId: string) => {
    setselectedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await client.delete(id);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
      Swal.fire("Deleted!", "Your order has been deleted.", "success");
    } catch (error) {
      console.error("Error deleting order:", error);
      Swal.fire("Error!", "Something went wrong while deleting.", "error");
    }
  };
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await client.patch(id).set({ status: newStatus }).commit();

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );

      if (newStatus === "dispatch") {
        Swal.fire("Dispatch", "The order is now dispatched.", "success");
      } else if (newStatus === "success") {
        Swal.fire("Success", "The order has been completed.", "success");
      }
    } catch (error) {
      console.error("somethings went wring while updating status", error);
      Swal.fire(
        "Error!",
        "Something went wrong while updating the status.",
        "error"
      );
    }
  };
  return  {
    orders,
    selectedOrderId,
    filter,
    setFilter,
    filterOrder,
    toggleOrderDetails,
    handleDelete,
    handleStatusChange,
  };
};

export default useAdminHooks;
