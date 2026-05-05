"use client";

import { useState } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";

export default function AddItem() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // handle image select
  const handleImageChange = (file) => {
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // drag drop
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("Please upload an image");
      return;
    }

    setLoading(true); // 🔥 start loading

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=140f2d0db1502e65c2c0ee7bfc66be98`,
        formData,
      );

      const imageUrl = imgbbRes.data.data.url;

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
        image: imageUrl,
      };

      await axios.post(
        "https://jafran-store-server.vercel.app/products",
        newItem,
      );

      toast.success("Item added successfully");
      // 🔥 reset everything
      setTimeout(() => {
        e.target.reset();
        setImageFile(null);
        setPreview(null);
      }, 300);

      // scroll to top 🔥
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // optional redirect
      // router.push("/items");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item");
    } finally {
      setLoading(false); // 🔥 stop loading
    }
  };

  return (
    <PrivateRoute>
      <div>
        <Navbar />

        <div className="min-h-screen py-20 flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="w-full max-w-2xl relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl blur-xl opacity-30"></div>

            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl text-white">
              <h1 className="text-3xl font-bold">Create New Item</h1>
              <p className="text-white/70 mt-1 mb-6">
                Add product details to your store
              </p>
              {loading && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="bg-white text-black px-6 py-5 rounded-xl shadow-xl text-center">
                    <div className="animate-spin h-8 w-8 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-3"></div>
                    <p className="font-medium">Adding product... please wait</p>
                  </div>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  name="title"
                  placeholder="Product title"
                  required
                  className="input"
                />

                <textarea
                  name="description"
                  placeholder="Description"
                  required
                  rows={3}
                  className="input"
                />

                {/* price section */}
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="price"
                    type="number"
                    placeholder="Price"
                    required
                    className="input"
                  />
                  <input
                    name="oldPrice"
                    type="number"
                    placeholder="Old Price"
                    required
                    className="input"
                  />
                </div>

                {/* rating section */}
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="rating"
                    type="number"
                    step="0.1"
                    placeholder="Rating"
                    className="input"
                  />
                  <input
                    name="ratingCount"
                    type="number"
                    placeholder="Rating Count"
                    className="input"
                  />
                </div>

                <select name="delivery" required className="input text-black">
                  <option value="">Select Delivery Type</option>
                  <option value="Free Delivery">Free Delivery</option>
                  <option value="Paid Delivery">Paid Delivery</option>
                </select>
                <select name="category" className="input text-black">
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Accessories</option>
                </select>

                {/* 🔥 drag & drop upload */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="border-2 border-dashed border-white/30 rounded-xl p-6 text-center cursor-pointer hover:border-pink-500"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e.target.files[0])}
                    className="hidden"
                    id="imageUpload"
                  />

                  <label htmlFor="imageUpload" className="cursor-pointer block">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="mx-auto max-h-48 rounded-lg object-cover"
                      />
                    ) : (
                      <p className="text-white/60">
                        Drag & drop or click to upload image
                      </p>
                    )}
                  </label>
                </div>

                {/* remove image */}
                {preview && (
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);
                      setImageFile(null);
                    }}
                    className="text-sm text-red-400 cursor-pointer hover:underline"
                  >
                    Remove Image
                  </button>
                )}

                <button
                  type="submit"
                  className="w-full cursor-pointer mt-2   bg-gradient-to-r  from-pink-500 via-purple-500 to-blue-500 py-3 rounded-xl font-semibold"
                >
                  Add Item
                </button>
              </form>

              <Link href="/items">
                <button className="w-full mt-3 bg-gray-700 py-3 rounded-xl cursor-pointer hover:bg-gray-600">
                  Back to Items
                </button>
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </PrivateRoute>
  );
}
