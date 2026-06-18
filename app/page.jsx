"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroBanner from "../components/HeroBanner";
import FeaturedItems from "../components/FeaturedItems";
import TestimonialsSection from "../components/TestimonialsSection";
import Cta from "../components/Cta";
import Fetured from "../components/Fetured";
import Categories from "../components/Categories";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* 1 Hero */}
      <HeroBanner />

      {/* 2 Features */}
      <Fetured />

      {/* 3 Featured Items */}
      <FeaturedItems />

      {/* 4 Categories */}

      <Categories />
      {/* 5 Testimonials */}
      <TestimonialsSection />

      {/* 6 CTA */}
      <Cta />
      {/* 7 Footer */}
      <Footer />
    </>
  );
}
