"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/dashboard/DataTable";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function AdminProductsPage() {
  const [rows, setRows] = useState([]);
  const { user } = useAuth();

  const [viewProduct, setViewProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [editImageFiles, setEditImageFiles] = useState([]);
  const [editPreviews, setEditPreviews] = useState([]);
  const [updating, setUpdating] = useState(false);

  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    discount: "",
  });

  // ✅ Fetch Products
  const getAdminProducts = async () => {
    const res = await axios.get(
      `https://jafran-store-server.vercel.app/products`,
    );

    return res.data.map((p) => ({
      id: p._id,
      title: p.title,
      category: p.category,
      price: p.price,
      oldPrice: p.oldPrice,
      discount: p.discount,
      rating: p.rating,
      ratingCount: p.ratingCount,
      delivery: p.delivery,
      description: p.description,
      images: p.images?.length ? p.images : p.image ? [p.image] : [],
    }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAdminProducts();
        setRows(data);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    return () => {
      editPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [editPreviews]);

  const handleEditImageChange = (files) => {
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);

    if (editPreviews.length + newFiles.length > 5) {
      toast.error("Max 5 images allowed");
      return;
    }

    setEditImageFiles((prev) => [...prev, ...newFiles]);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setEditPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleEditDrop = (e) => {
    e.preventDefault();
    handleEditImageChange(e.dataTransfer.files);
  };

  const handleEditDragOver = (e) => {
    e.preventDefault();
  };

  // ✅ Update Product
  const handleUpdateProduct = async (updatedData) => {
    console.log(updatedData);
    if (!editProduct?.id) {
      console.error("Missing product ID");
      return;
    }
    try {
      await axios.patch(
        `https://jafran-store-server.vercel.app/products/${editProduct.id}`,
        updatedData,
      );

      setRows((prev) =>
        prev.map((p) =>
          p.id === editProduct.id ? { ...p, ...updatedData } : p,
        ),
      );

      setEditProduct(null);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update product.");
    }
  };

  // ✅ Delete Product
  const handleDeleteProduct = async () => {
    try {
      await axios.delete(
        `https://jafran-store-server.vercel.app/products/${deleteProduct.id}`,
      );

      setRows((prev) => prev.filter((p) => p.id !== deleteProduct.id));

      setDeleteProduct(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Manage Products
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          View, edit and delete products.
        </p>
      </div>

      <DataTable
        columns={[
          {
            key: "title",
            label: "Product",
            sortable: true,
            render: (r) => (
              <div className="flex items-center gap-3">
                <img
                  src={r.images?.[0] || "/placeholder.png"}
                  alt={r.title}
                  className="w-10 h-10 object-cover rounded"
                />
                <span className="text-sm font-medium">{r.title}</span>
              </div>
            ),
          },

          { key: "category", label: "Category", sortable: true },

          {
            key: "price",
            label: "Price",
            sortable: true,
            render: (r) => <span>${r.price}</span>,
          },

          {
            key: "discount",
            label: "Discount",
            sortable: true,
            render: (r) => <span>{r.discount}%</span>,
          },

          {
            key: "rating",
            label: "Rating",
            sortable: true,
            render: (r) => (
              <span>
                ⭐ {r.rating} ({r.ratingCount})
              </span>
            ),
          },
        ]}
        rows={rows}
        filterKeys={["title", "category"]}
        pageSize={5}
        onView={(row) => setViewProduct(row)}
        onEdit={(row) => {
          setEditProduct(row);
          setForm({
            title: row.title,
            price: row.price,
            category: row.category,
            discount: row.discount,
            oldPrice: row.oldPrice,
            description: row.description,
          });

          // preload existing images
          setEditPreviews(row.images || []);
          setEditImageFiles([]);
        }}
        onDelete={(row) => setDeleteProduct(row)}
      />

      {/* ✅ VIEW PRODUCT */}
      {viewProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-950 rounded-xl w-[900px] max-h-[90vh] overflow-y-auto">
            {/* HEADER */}
            <div className="flex justify-between items-center px-6 py-4 border-b dark:border-gray-800">
              <h2 className="text-lg font-semibold">Product Details</h2>
              <button onClick={() => setViewProduct(null)}>✕</button>
            </div>

            <div className="p-6 grid md:grid-cols-2 gap-8">
              {/* IMAGES */}
              <div className="grid grid-cols-2 gap-3">
                {viewProduct.images?.length > 0 ? (
                  viewProduct.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ))
                ) : (
                  <div className="text-sm text-gray-400">No images</div>
                )}
              </div>

              {/* INFO */}
              <div className="space-y-4">
                <span className="text-xs uppercase text-gray-400">
                  {viewProduct.category}
                </span>

                <h1 className="text-2xl font-bold">{viewProduct.title}</h1>

                <div className="flex items-center gap-2 text-sm">
                  ⭐ {viewProduct.rating} ({viewProduct.ratingCount})
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold">
                    ৳{viewProduct.price}
                  </span>

                  {viewProduct.oldPrice && (
                    <span className="line-through text-gray-400">
                      ৳{viewProduct.oldPrice}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-500">
                  {viewProduct.description}
                </p>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <p>
                    <b>Discount:</b> {viewProduct.discount}%
                  </p>
                  <p>
                    <b>Delivery:</b> {viewProduct.delivery}
                  </p>
                  <p>
                    <b>Stock:</b> In Stock
                  </p>
                  <p>
                    <b>SKU:</b> {viewProduct.id?.slice(-6)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end p-4">
              <button
                onClick={() => setViewProduct(null)}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ EDIT PRODUCT */}
      {editProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-950 rounded-xl w-[900px] max-h-[90vh] overflow-y-auto p-6 space-y-6">
            {/* HEADER */}
            <div className="flex justify-between items-center border-b dark:border-gray-800 pb-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit Product
              </h2>
              <button onClick={() => setEditProduct(null)} className="text-xl">
                ✕
              </button>
            </div>

            {/* IMAGE UPLOAD (your same design) */}
            <div
              onDrop={handleEditDrop}
              onDragOver={handleEditDragOver}
              className="border-2 border-dashed border-gray-300 dark:border-white/30 rounded-xl p-6 text-center cursor-pointer hover:border-pink-500"
            >
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleEditImageChange(e.target.files)}
                className="hidden"
                id="editImageUpload"
              />

              <label htmlFor="editImageUpload" className="cursor-pointer block">
                {editPreviews.length > 0 ? (
                  <div className="grid grid-cols-3 gap-3">
                    {editPreviews.map((src, i) => (
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

            {/* REMOVE IMAGES */}
            {editPreviews.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {editPreviews.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setEditImageFiles((prev) =>
                        prev.filter((_, i) => i !== index),
                      );
                      setEditPreviews((prev) =>
                        prev.filter((_, i) => i !== index),
                      );
                    }}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Remove {index + 1}
                  </button>
                ))}
              </div>
            )}

            {/* BASIC INFO */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                Basic Information
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500">Title</label>
                  <input
                    className="w-full p-2 border rounded bg-transparent"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-500">Category</label>
                  <input
                    className="w-full p-2 border rounded bg-transparent"
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* PRICING */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                Pricing
              </h3>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-500">Price</label>
                  <input
                    className="w-full p-2 border rounded bg-transparent"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-500">Old Price</label>
                  <input
                    className="w-full p-2 border rounded bg-transparent"
                    value={form.oldPrice}
                    onChange={(e) =>
                      setForm({ ...form, oldPrice: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-500">Discount %</label>
                  <input
                    className="w-full p-2 border rounded bg-transparent"
                    value={form.discount}
                    onChange={(e) =>
                      setForm({ ...form, discount: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Description
              </h3>

              <textarea
                className="w-full p-3 border rounded bg-transparent"
                rows={4}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setEditProduct(null)}
                className="px-4 py-2 border rounded cursor-pointer"
              >
                Cancel
              </button>

              <button
                disabled={updating}
                onClick={async () => {
                  try {
                    setUpdating(true);

                    let uploadedUrls = [];

                    if (editImageFiles.length > 0) {
                      const uploadPromises = editImageFiles.map((file) => {
                        const formData = new FormData();
                        formData.append("image", file);

                        return axios.post(
                          `https://api.imgbb.com/1/upload?key=140f2d0db1502e65c2c0ee7bfc66be98`,
                          formData,
                        );
                      });

                      const responses = await Promise.all(uploadPromises);
                      uploadedUrls = responses.map((res) => res.data.data.url);
                    }

                    const finalImages = editPreviews.filter((img) =>
                      img.startsWith("http"),
                    );

                    await handleUpdateProduct({
                      ...form,
                      images: [...finalImages, ...uploadedUrls],
                    });

                    toast.success("✅ Product updated successfully");
                  } catch (err) {
                    console.error(err);
                    toast.error("❌ Update failed");
                  } finally {
                    setUpdating(false);
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
              >
                {updating ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ DELETE PRODUCT */}
      {deleteProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-80 space-y-4">
            <h2 className="text-lg font-semibold">Delete Product?</h2>

            <p className="text-sm">
              Delete <b>{deleteProduct.title}</b> ?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteProduct(null)}
                className="px-3 py-1 border rounded cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteProduct}
                className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
