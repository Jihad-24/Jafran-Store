import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function About() {
  return (
    <div className="">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center px-4 pt-16 pb-40">
        <div className="max-w-5xl w-full">
          {/* BACK BUTTON */}
          <div className="mb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
            >
              ← Back
            </Link>
          </div>

          {/* CARD */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
            {/* IMAGE */}
            <div className="relative w-full h-72 md:h-full min-h-[300px]">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                alt="About"
                className="w-full h-full object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="p-10 flex flex-col justify-center">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                About us
              </span>

              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                About Our App
              </h1>

              <p className="mt-5 text-gray-600 dark:text-gray-300 leading-relaxed">
                This app helps you manage and organize your products in a clean,
                fast, and simple way. Add items, view details, and explore
                related products with ease.
              </p>

              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                Built with modern tools like Next.js and Tailwind CSS to deliver
                a smooth, responsive experience across all devices.
              </p>

              <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm text-gray-700 dark:text-gray-200">
                ⚡ Fast • Simple • Modern UI for product management
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
