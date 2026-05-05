"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/dashboard/DataTable";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function AdminUsersPage() {
  const [rows, setRows] = useState([]);
  const { user } = useAuth();
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [form, setForm] = useState({ role: "", status: "" });
  // fetch users
  const getAdminUsers = async () => {
    const res = await axios.get(
      `https://jafran-store-server.vercel.app/admin/users?email=${user?.email}`,
    );

    return res.data.map((u) => ({
      ...u,
      joined: new Date(u.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }), // map correctly
      status: u.status || "Active", // fallback if missing
    }));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAdminUsers();
        setRows(data);
      } catch (err) {
        console.error("Failed to load users:", err);
      }
    };

    fetchUsers();
  }, [user?.email]);

  const handleUpdate = async () => {
    await axios.patch(
      `https://jafran-store-server.vercel.app/admin/users/${editUser.email}?email=${user.email}`,
      form,
    );

    setRows((prev) =>
      prev.map((u) => (u.email === editUser.email ? { ...u, ...form } : u)),
    );

    setEditUser(null);
  };

  const handleDelete = async () => {
    await axios.delete(
      `https://jafran-store-server.vercel.app/admin/users/${deleteUser.email}?email=${user.email}`,
    );

    setRows((prev) => prev.filter((u) => u.email !== deleteUser.email));

    setDeleteUser(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Manage Users
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Mock directory with pagination, filtering, sorting, and row actions.
        </p>
      </div>

      <DataTable
        columns={[
          {
            key: "avatar",
            label: "Avater",
            sortable: true,
            render: (row) => (
              <div className="flex items-center gap-3">
                <img
                  src={row.photoURL || "/avatar.png"}
                  alt={row.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {row.name}
                </span>
              </div>
            ),
          },
          { key: "name", label: "Name", sortable: true },
          { key: "email", label: "Email", sortable: true },
          { key: "role", label: "Role", sortable: true },
          {
            key: "status",
            label: "Status",
            sortable: true,
            render: (r) => (
              <span
                className={
                  r.status === "Active"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : r.status === "Suspended"
                      ? "text-red-600 dark:text-red-400"
                      : "text-amber-600 dark:text-amber-400"
                }
              >
                {r.status}
              </span>
            ),
          },
          { key: "joined", label: "Joined", sortable: true },
        ]}
        rows={rows}
        filterKeys={["name", "email", "role", "status"]}
        pageSize={5}
        // onView={(row) => alert(`View user: ${row.name}`)}
        onEdit={(row) => {
          setEditUser(row);
          setForm({
            role: row.role,
            status: row.status,
          });
        }}
        onDelete={(row) => {
          setDeleteUser(row);
        }}
      />

      {editUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-96 space-y-4">
            <h2 className="text-lg font-semibold">Edit User</h2>

            {/* <div className="space-y-2">
              <label className="text-sm">Role</label>
              <select
                className="w-full p-2 border rounded 
             bg-white text-gray-900 
             dark:bg-gray-800 dark:text-white 
             dark:border-gray-700"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div> */}

            <div className="space-y-2">
              <label className="text-sm">Status</label>
              <select
                className="w-full p-2 border rounded 
                         bg-white text-gray-900 
                         dark:bg-gray-800 dark:text-white 
                         dark:border-gray-700"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditUser(null)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-80 space-y-4">
            <h2 className="text-lg font-semibold">Delete User?</h2>

            <p className="text-sm text-gray-500">
              Are you sure you want to delete{" "}
              <span className="font-medium">{deleteUser.name}</span>?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteUser(null)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 bg-red-600 text-white rounded"
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
