import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../../Redux/Actions/Orders";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.listOrdersReducer);
  const { loading, orders, error } = orderList;

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Order List
      </h1>

      {loading ? (
        <p className="text-center text-lg text-blue-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Total Price</th>
                <th className="px-4 py-3 text-left">Paid</th>
                <th className="px-4 py-3 text-left">Delivered</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(orders) && orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="px-4 py-3">{order._id}</td>
                    <td className="px-4 py-3">{order.user?.name || "N/A"}</td>
                    <td className="px-4 py-3">${order.totalPrice.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      {order.isPaid ? (
                        <span className="text-green-600 font-semibold">Yes</span>
                      ) : (
                        <span className="text-red-600 font-semibold">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {order.isDelivered ? (
                        <span className="text-green-600 font-semibold">Yes</span>
                      ) : (
                        <span className="text-red-600 font-semibold">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
