"use client";

import { useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function AdminBannerPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    link: "",
    active: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (file) => {
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=140f2d0db1502e65c2c0ee7bfc66be98`,
      formData,
    );

    return res.data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      if (imageFile) {
        imageUrl = await uploadImage();
      }

      await axios.post(`http://localhost:5001/banners?email=${user?.email}`, {
        ...form,
        image: imageUrl,
      });

      toast.success("Banner created successfully 🎉");

      setForm({ title: "", subtitle: "", link: "", active: true });
      setImageFile(null);
      setPreview("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create banner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create Banner
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Design homepage banners for promotions & offers
        </p>
      </div>

      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 space-y-5"
      >
        {/* Title */}
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Title
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Summer Sale 50% Off"
            className="w-full mt-1 p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Subtitle
          </label>
          <input
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
            placeholder="Limited time offer"
            className="w-full mt-1 p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        {/* Link */}
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Redirect Link
          </label>
          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="/products"
            className="w-full mt-1 p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        {/* Upload */}
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Banner Image
          </label>

          {/* If image selected → show preview only */}
          {preview ? (
            <div className="mt-2 relative">
              <img
                src={preview}
                className="w-full h-48 object-cover rounded-xl shadow"
              />

              {/* remove button */}
              <button
                type="button"
                onClick={() => {
                  setPreview("");
                  setImageFile(null);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ) : (
            /* Drag & drop only when no image */
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleImage(e.dataTransfer.files[0]);
              }}
              className="mt-2 border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <input
                type="file"
                hidden
                id="file"
                onChange={(e) => handleImage(e.target.files[0])}
              />

              <label
                htmlFor="file"
                className="cursor-pointer text-sm text-gray-500 dark:text-gray-300"
              >
                Drag & drop or click to upload image
              </label>
            </div>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-lg font-medium"
        >
          {loading ? "Publishing..." : "Publish Banner"}
        </button>
      </form>
    </div>
  );
}
