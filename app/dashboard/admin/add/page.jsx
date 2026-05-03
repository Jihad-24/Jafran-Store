"use client";

import { useState } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AddItem() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // multiple images state
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  // handle image select
  const handleImageChange = (files) => {
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);

    // limit (optional safety)
    if (imageFiles.length + newFiles.length > 5) {
      alert("Max 5 images allowed");
      return;
    }

    setImageFiles((prev) => [...prev, ...newFiles]);

    const newPreviews = newFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  // drag drop
  const handleDrop = (e) => {
    e.preventDefault();
    handleImageChange(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageFiles.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    setLoading(true);

    try {
      // upload all images
      const uploadPromises = imageFiles.map((file) => {
        const formData = new FormData();
        formData.append("image", file);

        return axios.post(
          `https://api.imgbb.com/1/upload?key=140f2d0db1502e65c2c0ee7bfc66be98`,
          formData
        );
      });

      const responses = await Promise.all(uploadPromises);
      const imageUrls = responses.map(
        (res) => res.data.data.url
      );

      const price = Number(e.target.price.value);
      const oldPrice = Number(e.target.oldPrice.value);

      const newItem = {
        title: e.target.title.value,
        category: e.target.category.value,
        price,
        oldPrice,
        discount: Math.round(((oldPrice - price) / oldPrice) * 100),
        rating: Number(e.target.rating.value),
        ratingCount: Number(e.target.ratingCount.value),
        delivery: e.target.delivery.value,
        description: e.target.description.value,
        images: imageUrls, // 🔥 multiple images
      };

      await axios.post(
        "http://localhost:5001/products",
        newItem
      );

      alert("Item added successfully");

      // reset
      setTimeout(() => {
        e.target.reset();
        setImageFiles([]);
        setPreviews([]);
      }, 300);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-2xl relative">
          <div className="absolute -inset-1 rounded-3xl blur-xl opacity-30"></div>

          <div className="relative bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-3xl p-8 text-gray-900 dark:text-white">

            <h1 className="text-3xl font-bold">
              Create New Item
            </h1>

            <p className="text-gray-500 dark:text-white/70 mt-1 mb-6">
              Add product details to your store
            </p>

            {loading && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-900 text-black dark:text-white px-6 py-5 rounded-xl shadow-xl text-center">
                  <div className="animate-spin h-8 w-8 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-3"></div>
                  <p className="font-medium">
                    Adding product... please wait
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                name="title"
                placeholder="Product title"
                required
                className="input bg-white dark:bg-transparent text-gray-900 dark:text-white border-gray-300 dark:border-white/20"
              />

              <textarea
                name="description"
                placeholder="Description"
                required
                rows={3}
                className="input bg-white dark:bg-transparent text-gray-900 dark:text-white border-gray-300 dark:border-white/20"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="price"
                  type="number"
                  placeholder="Price"
                  required
                  className="input bg-white dark:bg-transparent text-gray-900 dark:text-white border-gray-300 dark:border-white/20"
                />
                <input
                  name="oldPrice"
                  type="number"
                  placeholder="Old Price"
                  required
                  className="input bg-white dark:bg-transparent text-gray-900 dark:text-white border-gray-300 dark:border-white/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="rating"
                  type="number"
                  step="0.1"
                  placeholder="Rating"
                  className="input bg-white dark:bg-transparent text-gray-900 dark:text-white border-gray-300 dark:border-white/20"
                />
                <input
                  name="ratingCount"
                  type="number"
                  placeholder="Rating Count"
                  className="input bg-white dark:bg-transparent text-gray-900 dark:text-white border-gray-300 dark:border-white/20"
                />
              </div>

              <select
                name="delivery"
                required
                className="input bg-white dark:bg-transparent text-gray-900 dark:text-white border-gray-300 dark:border-white/20"
              >
                <option value="">Select Delivery Type</option>
                <option value="Free Delivery">Free Delivery</option>
                <option value="Paid Delivery">Paid Delivery</option>
              </select>

              <select
                name="category"
                className="input bg-white dark:bg-transparent text-gray-900 dark:text-white border-gray-300 dark:border-white/20"
              >
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Accessories</option>
              </select>

              {/* DROP ZONE */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-300 dark:border-white/30 rounded-xl p-6 text-center cursor-pointer hover:border-pink-500"
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    handleImageChange(e.target.files)
                  }
                  className="hidden"
                  id="imageUpload"
                />

                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer block"
                >
                  {previews.length > 0 ? (
                    <div className="grid grid-cols-3 gap-3">
                      {previews.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          className="h-24 w-full object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-white/60">
                      Drag & drop or click to upload images
                    </p>
                  )}
                </label>
              </div>

              {/* REMOVE */}
              {previews.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {previews.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setImageFiles((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                        setPreviews((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Remove {index + 1}
                    </button>
                  ))}
                </div>
              )}

              <button
                type="submit"
                className="w-full cursor-pointer mt-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 py-3 rounded-xl font-semibold text-white"
              >
                Add Item
              </button>
            </form>

            <Link href="/items">
              <button className="w-full mt-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-3 rounded-xl cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600">
                Back to Items
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}