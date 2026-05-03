"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { itemsData } from "@/data/items";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import HeroBanner from "../components/HeroBanner";

export default function Home() {
  const { user, logout } = useAuth();
  const [items, setItems] = useState([]);

  const testimonials = [
    {
      text: "This app is super clean and easy to use!",
      name: "Alex Morgan",
      productImg:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      bg: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    },
    {
      text: "Managing products has never been this simple.",
      name: "Sarah Khan",
      productImg:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      bg: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    {
      text: "Perfect UI and smooth experience!",
      name: "John Doe",
      productImg:
        "https://images.unsplash.com/photo-1580910051074-3eb694886505",
      bg: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },
    {
      text: "Super smooth experience and really user friendly UI!",
      name: "Jihad Rahman",
      productImg:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      bg: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
  ];

  // 🔥 Fetch from backend
  useEffect(() => {
    fetch("http://localhost:5001/products")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  }, []);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      {/* 1 Hero */}
     <HeroBanner />

      {/* 2 Features */}
      <section className="bg-gray-50 dark:bg-gray-950 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Fast Performance",
                desc: "Optimized Next.js architecture for lightning speed",
                icon: "⚡",
              },
              {
                title: "Secure Auth",
                desc: "Firebase authentication with strong security",
                icon: "🔐",
              },
              {
                title: "Easy Management",
                desc: "Simple and powerful product CRUD system",
                icon: "🧩",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group cursor-pointer relative p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl hover:shadow-xl transition duration-300 overflow-hidden"
              >
                {/* glow effect */}
                <div className=" absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition"></div>

                {/* content */}
                <div className="relative">
                  <div className="text-3xl mb-4">{item.icon}</div>

                  <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Featured Items */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Featured Items
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {items.length > 0 ? (
            items.slice(1, 4).map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-md transition"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-40 w-full object-cover"
                />

                {/* Content */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {item.title}
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    {item.description}
                  </p>

                  <button className="mt-4 w-full">
                    <Link
                      href={`/items/${item?._id}`}
                      className="block w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white py-2 rounded-lg text-center transition"
                    >
                      View Details
                    </Link>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              No items found
            </div>
          )}
        </div>
      </section>

      {/* 4 Categories */}
      <section className="bg-white dark:bg-gray-950 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-gray-100">
            Explore Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Electronics", icon: "📱" },
              { name: "Fashion", icon: "👕" },
              { name: "Accessories", icon: "⌚" },
              { name: "More", icon: "✨" },
            ].map((cat) => (
              <div
                key={cat.name}
                className="group relative p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden"
              >
                {/* hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition"></div>

                <div className="relative flex flex-col items-center text-center">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition">
                    {cat.icon}
                  </div>

                  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Browse {cat.name.toLowerCase()} products
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Testimonials */}
      <section className="py-24 overflow-hidden bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
            What Users Say
          </h2>

          {/* viewport */}
          <div className="relative max-w-4xl mx-auto overflow-hidden">
            {/* slider */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${index * 100}%)`,
              }}
            >
              {testimonials.map((item, i) => (
                <div key={i} className="w-full flex-shrink-0 px-3">
                  {/* CARD */}
                  <div className="relative rounded-3xl overflow-hidden shadow-xl h-[360px]">
                    {/* background image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center scale-110"
                      style={{
                        backgroundImage: `url(${item.bg})`,
                      }}
                    />

                    {/* dark overlay */}
                    <div className="absolute inset-0 bg-black/60"></div>

                    {/* content */}
                    <div className="relative z-10 h-full flex items-center justify-between p-10 text-white gap-8">
                      {/* LEFT TEXT */}
                      <div className="max-w-md">
                        <div className="text-6xl text-white/20 font-serif leading-none">
                          “
                        </div>

                        <p className="text-xl leading-relaxed mt-2">
                          {item.text}
                        </p>

                        <div className="flex items-center gap-3 mt-6">
                          <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold">
                            {item.name.charAt(0)}
                          </div>

                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-xs text-white/70">
                              Verified Customer
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT PRODUCT IMAGE */}
                      <div className="hidden md:block">
                        <div className="w-52 h-52 rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                          <img
                            src={item.productImg}
                            alt="product"
                            className="w-full h-full object-cover hover:scale-110 transition duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition ${
                  i === index
                    ? "bg-gray-900 dark:bg-gray-100 scale-125"
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6 CTA */}
      <section
        className="relative w-full py-24 text-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* content */}
        <div className="relative container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Start managing your products today
          </h2>

          <p className="text-gray-200 mt-4 text-lg">
            Join and organize everything in one place with a clean modern
            dashboard
          </p>

          <Link
            href={user ? "/items" : "/login"}
            className="inline-block mt-8 px-10 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* 7 Footer */}
      <Footer />
    </>
  );
}
