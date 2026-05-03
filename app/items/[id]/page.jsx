import Link from "next/link";
import ProductImageGallery from "@/components/ProductImageGallery";
import AddToCartSection from "@/components/AddToCartSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const StarIcon = ({ half = false, empty = false }) => (
  <span className="relative inline-block w-4 h-4">
    <svg
      className={`w-4 h-4 ${empty ? "text-gray-300 dark:text-gray-600" : "text-amber-400"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 00.95.69h4.16c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.287 3.956c.3.921-.755 1.688-1.538 1.118l-3.37-2.45a1 1 0 00-1.176 0l-3.37 2.45c-.783.57-1.838-.197-1.538-1.118l1.287-3.956a1 1 0 00-.364-1.118l-3.37-2.45c-.783-.57-.38-1.81.588-1.81h4.16a1 1 0 00.95-.69l1.286-3.956z" />
    </svg>
    {half && (
      <span className="absolute inset-0 w-1/2 overflow-hidden">
        <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 00.95.69h4.16c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.287 3.956c.3.921-.755 1.688-1.538 1.118l-3.37-2.45a1 1 0 00-1.176 0l-3.37 2.45c-.783.57-1.838-.197-1.538-1.118l1.287-3.956a1 1 0 00-.364-1.118l-3.37-2.45c-.783-.57-.38-1.81.588-1.81h4.16a1 1 0 00.95-.69l1.286-3.956z" />
        </svg>
      </span>
    )}
  </span>
);

const renderStars = (rating = 0) =>
  Array.from({ length: 5 }).map((_, i) => {
    const v = rating - i;
    if (v >= 1) return <StarIcon key={i} />;
    if (v >= 0.5) return <StarIcon key={i} half />;
    return <StarIcon key={i} empty />;
  });

export default async function Details({ params }) {
  const { id } = await params;

  const [itemRes, allRes] = await Promise.all([
    fetch(`https://odyssey-app-server.vercel.app/items/${id}`, { cache: "no-store" }),
    fetch(`https://odyssey-app-server.vercel.app/products`, { cache: "no-store" }),
  ]);

  if (!itemRes.ok) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">
          Item not found
        </div>
        <Footer />
      </>
    );
  }

  const item = await itemRes.json();
  const allItems = await allRes.json();

  const related = allItems
    .filter((i) => i.category === item.category && i._id !== item._id)
    .slice(0, 4);

  const images = item.images?.length ? item.images : [item.image];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Breadcrumb */}
        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
            <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300 transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/items" className="hover:text-gray-700 dark:hover:text-gray-300 transition">
              Items
            </Link>
            <span>/</span>
            <span className="text-gray-700 dark:text-gray-300 font-medium truncate max-w-[200px]">
              {item.title}
            </span>
          </div>
        </div>

        {/* Product Section */}
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Image Gallery */}
            <div className="relative">
              <ProductImageGallery images={images} alt={item.title} />
              {item.discount > 0 && (
                <span className="absolute top-3 right-3 z-10 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold px-2.5 py-1 rounded-full pointer-events-none">
                  {item.discount}% OFF
                </span>
              )}
            </div>

            {/* Info Panel */}
            <div className="flex flex-col gap-6">
              {/* Category + Title */}
              <div>
                <span className="text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  {item.category}
                </span>
                <h1 className="mt-1.5 text-3xl font-bold text-gray-900 dark:text-gray-50 leading-tight">
                  {item.title}
                </h1>
              </div>

              {/* Rating Row */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {renderStars(item.rating)}
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {item.rating}
                </span>
                <span className="text-sm text-gray-400 dark:text-gray-500">
                  ({item.ratingCount} reviews)
                </span>
              </div>

              {/* Price Block */}
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-gray-900 dark:text-gray-50">
                  ৳{item.price}
                </span>
                {item.oldPrice && (
                  <span className="text-lg text-gray-400 dark:text-gray-500 line-through mb-0.5">
                    ৳{item.oldPrice}
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 -mt-3 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Free delivery available
              </p>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-800" />

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {item.fullDescription || item.description}
              </p>

              {/* Specs */}
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                {[
                  ["Category", item.category],
                  ["Discount", `${item.discount}% off`],
                  ["Availability", "In Stock"],
                  ["SKU", item._id?.slice(-6).toUpperCase()],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <dt className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      {label}
                    </dt>
                    <dd className="text-gray-800 dark:text-gray-200 font-medium">{value}</dd>
                  </div>
                ))}
              </dl>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-800" />

              {/* Quantity + CTA */}
              <AddToCartSection item={item} />
            </div>
          </div>

          {/* Related Items */}
          {related.length > 0 && (
            <section className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Related Items
                </h2>
                <Link
                  href="/items"
                  className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
                >
                  View all →
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {related.map((rel) => (
                  <Link
                    key={rel._id}
                    href={`/items/${rel._id}`}
                    className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-gray-400 dark:hover:border-gray-600 transition"
                  >
                    <div className="overflow-hidden aspect-square bg-gray-100 dark:bg-gray-800">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
                        {rel.category}
                      </p>
                      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
                        {rel.title}
                      </h3>
                      <p className="mt-1.5 text-sm font-bold text-gray-900 dark:text-gray-50">
                        ৳{rel.price}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
