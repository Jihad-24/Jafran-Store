"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [cartVersion, setCartVersion] = useState(0);
  const [delivery, setDelivery] = useState(70);

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
          `https://jafran-store-server.vercel.app/cart?email=${user.email}`,
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
  // const addToCart = async (product, qty = 1, selectedSize, selectedColor) => {
  //   const newItem = {
  //     productId: product._id,
  //     title: product.title,
  //     price: product.price,
  //     image: product.image,
  //     category: product.category,
  //     image: product.images?.[0] || product.image, // 👈 FIX HERE
  //     qty,
  //     selectedSize,
  //     selectedColor,
  //   };

  //   if (!user?.email) {
  //     const cart = getGuestCart();
  //     const existing = cart.find((i) => i.productId === newItem.productId);

  //     let updated;

  //     if (existing) {
  //       updated = cart.map((i) =>
  //         i.productId === newItem.productId ? { ...i, qty: i.qty + qty } : i,
  //       );
  //       toast.success("Updated quantity in cart");
  //     } else {
  //       updated = [...cart, newItem];
  //       toast.success("Added to cart");
  //     }

  //     setItems(updated);
  //     setGuestCart(updated);
  //     return;
  //   }

  //   try {
  //     await axios.post("https://jafran-store-server.vercel.app/cart", {
  //       ...newItem,
  //       userEmail: user.email,
  //     });

  //     const res = await axios.get(
  //       `https://jafran-store-server.vercel.app/cart?email=${user.email}`,
  //     );

  //     setItems(res.data);
  //     toast.success("Added to cart");
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Failed to add to cart");
  //   }
  // };
  const addToCart = async (
    product,
    qty = 1,
    selectedSizes = [],
    selectedColors = [],
  ) => {
    const newItem = {
      productId: product._id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] || product.image,
      category: product.category,
      qty,
      selectedSizes,
      selectedColors,
    };

    // guest cart
    if (!user?.email) {
      const cart = getGuestCart();

      const existing = cart.find(
        (i) =>
          i.productId === newItem.productId &&
          JSON.stringify(i.selectedSizes) === JSON.stringify(selectedSizes) &&
          JSON.stringify(i.selectedColors) === JSON.stringify(selectedColors),
      );

      let updated;

      if (existing) {
        updated = cart.map((i) =>
          i.productId === newItem.productId ? { ...i, qty: i.qty + qty } : i,
        );
        toast.success("Updated cart item");
      } else {
        updated = [...cart, newItem];
        toast.success("Added to cart");
      }

      setItems(updated);
      setGuestCart(updated);
      return;
    }

    try {
      await axios.post("https://jafran-store-server.vercel.app/cart", {
        ...newItem,
        userEmail: user.email,
      });

      const res = await axios.get(
        `https://jafran-store-server.vercel.app/cart?email=${user.email}`,
      );

      setItems(res.data);
      toast.success("Added to cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  // ---------------- UPDATE QTY ----------------
  const updateQty = async (id, qty) => {
    if (qty < 1) return;

    try {
      await axios.patch(`https://jafran-store-server.vercel.app/cart/${id}`, {
        qty,
      });

      setItems((prev) => prev.map((i) => (i._id === id ? { ...i, qty } : i)));

      toast.success("Quantity updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity");
    }
  };

  // ---------------- REMOVE ----------------
  const removeItem = async (id) => {
    try {
      await axios.delete(`https://jafran-store-server.vercel.app/cart/${id}`);

      setItems((prev) => prev.filter((i) => i._id !== id));
      toast.success("Item removed");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

  // ---------------- CLEAR ----------------
  const clearCart = async () => {
    try {
      if (!user?.email) {
        setGuestCart([]);
        setItems([]);
        toast.success("Order placed");

        toast.success("Cart cleared");
        return;
      }

      await axios.delete(
        `https://jafran-store-server.vercel.app/cart?email=${user.email}`,
      );

      setItems([]);
      toast.success("Order placed");

      toast.success("Cart cleared");
    } catch (err) {
      console.error(err);
      toast.error("Failed to clear cart");
    }
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
  const cartTotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

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
        delivery,
        setDelivery,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
