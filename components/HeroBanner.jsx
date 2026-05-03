"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function HeroBanner() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(
          "https://jafran-store-server.vercel.app/banners",
        );
        setBanners(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBanners();
  }, []);

  if (!banners.length) return null;

  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        loop
        className="h-[80vh]"
      >
        {banners.map((banner, i) => (
          <SwiperSlide key={i}>
            <div
              className="h-[80vh] flex items-center justify-center text-center text-white relative"
              style={{
                backgroundImage: `url(${banner.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* overlay */}
              <div className="absolute inset-0 bg-black/60"></div>

              <div className="relative container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  {banner.title}
                </h1>

                <p className="mt-5 text-gray-200 text-lg max-w-2xl mx-auto">
                  {banner.subtitle}
                </p>

                {banner.link && (
                  <div className="mt-8">
                    <Link
                      href={banner.link}
                      className="px-6 py-3 rounded-full bg-white text-black hover:bg-gray-200 transition"
                    >
                      Explore Now
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
