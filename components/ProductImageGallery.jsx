"use client";

import { useState, useEffect, useCallback } from "react";

export default function ProductImageGallery({ images = [], alt = "" }) {
  const [active, setActive] = useState(0);

  const next = useCallback(
    () => setActive((prev) => (prev + 1) % images.length),
    [images.length],
  );

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [next, images.length]);

  return (
    <div className="flex gap-3 md:sticky md:top-6">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[500px] pr-1 scrollbar-hide">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition ${
              active === i
                ? "border-gray-900 dark:border-white"
                : "border-gray-200 dark:border-gray-700 opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={src}
              alt={`${alt} ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative flex-1 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden aspect-square">
        <img
          key={active}
          src={images[active]}
          alt={alt}
          className="w-full h-full object-cover animate-fade"
        />

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all ${
                  active === i
                    ? "w-4 h-1.5 bg-gray-900 dark:bg-white"
                    : "w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
