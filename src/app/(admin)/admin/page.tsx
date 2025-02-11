"use client";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
// import Image from "next/image";
import Swal from "sweetalert2";
// import ProtectedRoute from "@/components/admin/protected/Protected";
import { Order } from "@/types/order";
import { allOrders } from "@/lib/queries";


const Admin = () => {
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
      : orders.filter((order) => order.status === "filter");

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
  return (
    <div>
      {/* header  */}
      <nav className="bg-red-600 text-white p-4 shadow-lg flex justify-between">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <div className="flex space-x-4">
          {["All", "pending", "dispatch", "success"].map((status) => (
            <button
              key={status}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === status
                  ? "bg-white text-red-600 font-bold"
                  : "text-white"
              }`}
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </nav>
      {/* order table */}
      <div>
        <h2>order</h2>
        <div>
          <table className="w-full border border-1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {filterOrder.map((order) => (
                  <div key={order._id}>
                    <tr
                      className="cursor-pointer hover:bg-red-100 transition-all "
                      onClick={() => toggleOrderDetails(order._id)}
                    >
                      <td>{order._id}</td>
                      <td>{order.firstName} {order.lastName}</td>
                      <td>{order.address}</td>
                      <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                      <td>${order.total}</td>
                      <td>
                        <select
                          value={order.status || ""}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="bg-gray-100 p-1 rounded"
                        >
                          <option value="pending">Pending</option>
                          <option value="dispatch">Dispatch</option>
                          <option value="success">Completed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(order._id);
                          }}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    {selectedOrderId === order._id && (
                      <tr>
                        <td colSpan={7} className="bg-gray-50 p-4 transition-all animate-fadeIn">
                          <h3 className="font-bold">Order Details</h3>
                          <p><strong>Phone:</strong> {order.phone}</p>
                          <p><strong>Email:</strong> {order.email}</p>
                          <p><strong>City:</strong> {order.city}</p>
                          <ul>
                            {/* {order.cartItems.map((item, index) => (
                              <li key={`${order._id}-${index}`} className="flex items-center gap-2">
                                {item.productName}
                                {item.image && (
                                  <Image src={item.image} width={40} height={40} alt={item.productName} />
                                )}
                              </li>
                            ))} */}
                            {
                                order.cartItems.map((item)=>{
                                    // console.log('>>>>',item);
                                    
                                    return (
                                        <>
                                    he
                                        </>
                                    )
                                })
                            }
                          </ul>
                        </td>
                      </tr>
                    )}
                  </div>
                ))}

            <tbody>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
