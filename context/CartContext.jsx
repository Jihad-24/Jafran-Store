"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const CartContext = createContext(null);

const GUEST_CART_KEY = "guest_cart";

// ---------------- HELPERS ----------------
const getGuestCart = () =>
  JSON.parse(localStorage.getItem(GUEST_CART_KEY)) || [];

const setGuestCart = (items) =>
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));

// ---------------- PROVIDER ----------------
export function CartProvider({ children }) {
  const { user } = useAuth();

  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [cartVersion, setCartVersion] = useState(0);

  // ---------------- LOAD CART ----------------
  useEffect(() => {
    const loadCart = async () => {
      try {
        // 👤 guest cart
        if (!user?.email) {
          setItems(getGuestCart());
          setHydrated(true);
          return;
        }

        // 🔐 user cart
        const res = await axios.get(
          `http://localhost:5001/cart?email=${user.email}`
        );

        setItems(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setHydrated(true);
      }
    };

    loadCart();
  }, [user?.email, cartVersion]);

  // ---------------- ADD TO CART ----------------
  const addToCart = async (product, qty = 1) => {
    const newItem = {
      productId: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      qty,
    };

    // 👤 guest
    if (!user?.email) {
      const cart = getGuestCart();

      const existing = cart.find(
        (i) => i.productId === newItem.productId
      );

      let updated;

      if (existing) {
        updated = cart.map((i) =>
          i.productId === newItem.productId
            ? { ...i, qty: i.qty + qty }
            : i
        );
      } else {
        updated = [...cart, newItem];
      }

      setItems(updated);
      setGuestCart(updated);
      return;
    }

    // 🔐 logged in
    try {
      await axios.post("http://localhost:5001/cart", {
        ...newItem,
        userEmail: user.email,
      });

      const res = await axios.get(
        `http://localhost:5001/cart?email=${user.email}`
      );

      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- UPDATE QTY ----------------
  const updateQty = async (id, qty) => {
    if (qty < 1) return;

    await axios.patch(`http://localhost:5001/cart/${id}`, { qty });

    setItems((prev) =>
      prev.map((i) => (i._id === id ? { ...i, qty } : i))
    );
  };

  // ---------------- REMOVE ----------------
  const removeItem = async (id) => {
    await axios.delete(`http://localhost:5001/cart/${id}`);

    setItems((prev) => prev.filter((i) => i._id !== id));
  };

  // ---------------- CLEAR ----------------
  const clearCart = async () => {
    if (!user?.email) {
      setGuestCart([]);
      setItems([]);
      return;
    }

    await axios.delete(
      `http://localhost:5001/cart?email=${user.email}`
    );

    setItems([]);
  };

  // ---------------- REFRESH ----------------
  const refreshCart = () => {
    setCartVersion((prev) => prev + 1);
  };

  // ---------------- EVENT LISTENER ----------------
  useEffect(() => {
    const handler = () => {
      setCartVersion((prev) => prev + 1);
    };

    window.addEventListener("cart-updated", handler);
    return () => window.removeEventListener("cart-updated", handler);
  }, []);

  // ---------------- DERIVED ----------------
  const cartCount = items.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = items.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        hydrated,
        addToCart,
        updateQty,
        removeItem,
        clearCart,
        cartCount,
        cartTotal,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);