"use client";

import PrivateRoute from "@/components/PrivateRoute";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { itemsData } from "@/data/items";

export default function Manage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH FROM MONGODB API
  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5001/products");
      setItems(res.data);
    } catch (error) {
      console.error("Failed to load items", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [items?.length]);
  // useEffect(() => {
  //   setItems(itemsData);
  //   setLoading(false);
  // }, []);

  // DELETE FROM MONGODB
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5001/products/${id}`);

      setItems((prev) => prev.filter((item) => item._id !== id));

      alert("Item deleted successfully ✅");
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete item ❌");
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* HEADER */}
        <div className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
          {/* BACK */}
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-black transition"
          >
            ← Back to Home
          </Link>

          {/* TITLE */}
          <div className="text-center">
            <h1 className="text-3xl font-bold">Manage Items</h1>
            <p className="text-gray-500 text-sm">
              View, manage and delete your products
            </p>
          </div>

          {/* RIGHT SPACER (keeps center aligned) */}
          <div className="w-24"></div>
        </div>
        {/* CONTENT */}
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-500">
              Loading items...
            </div>
          ) : items.length === 0 ? (
            <div className="p-10 text-center text-gray-500">No items found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100 text-gray-600 text-sm">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item) => (
                    <tr
                      key={item._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="p-4 font-medium">{item.title}</td>

                      <td className="p-4 text-gray-500">{item.category}</td>

                      <td className="p-4 font-semibold">${item.price}</td>

                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/items/${item.id}`}
                            className="px-3 py-1 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600"
                          >
                            View
                          </Link>

                          <button
                            onClick={() => handleDelete(item._id)}
                            className="px-3 py-1 cursor-pointer rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
}
