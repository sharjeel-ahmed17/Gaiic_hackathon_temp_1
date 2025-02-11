"use client";
import useAdminHooks from "@/hooks/useAdminHooks";

const Admin = () => {
  const {
    selectedOrderId,
    filter,
    setFilter,
    filterOrder,
    toggleOrderDetails,
    handleDelete,
    handleStatusChange,
  } = useAdminHooks();

  return (
    <div>
      {/* header  */}
      <nav className="bg-red-600 text-white p-4 shadow-lg flex justify-between">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <div className="flex space-x-4">
          {["all", "pending", "dispatch", "success"].map((status) => {
            return (
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
            );
          })}
        </div>
      </nav>

      {/* order table */}
      <div>
        <h2>Orders</h2>
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
            <tbody>
              {filterOrder.map((order) => (
                <div key={order._id}>
                  <tr
                    className="cursor-pointer hover:bg-red-100 transition-all"
                    onClick={() => toggleOrderDetails(order._id)}
                  >
                    <td>{order._id}</td>
                    <td>
                      {order.firstName} {order.lastName}
                    </td>
                    <td>{order.address}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>${order.total}</td>
                    <td>
                      <select
                        value={order.status || ""}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
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
                      <td
                        colSpan={7}
                        className="bg-gray-50 p-4 transition-all animate-fadeIn"
                      >
                        <h3 className="font-bold">Order Details</h3>
                        <p>
                          <strong>Phone:</strong> {order.phone}
                        </p>
                        <p>
                          <strong>Email:</strong> {order.email}
                        </p>
                        <p>
                          <strong>City:</strong> {order.city}
                        </p>
                        <ul>
                          {order.cartItems.map((item, index) => {
                            return (
                              <li
                                key={`${order._id}-${index}`}
                                className="flex items-center gap-2"
                              >
                                {item.name}
                                {item.imageUrl && (
                                  <img
                                    src={item.imageUrl}
                                    width={40}
                                    height={40}
                                    alt={item.name}
                                  />
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                    </tr>
                  )}
                </div>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
