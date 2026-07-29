"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ProductImage = { url: string; altText: string | null };

export default function ProductGallery({
  images,
  productName,
}: {
  images: ProductImage[];
  productName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];

  function goPrev() {
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  }

  function goNext() {
    setActiveIndex((i) => (i + 1) % images.length);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square bg-sand rounded-lg overflow-hidden group">
        {active && (
          <Image
            src={active.url}
            alt={active.altText ?? productName}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronLeft size={20} className="text-ink" />
            </button>
            <button
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronRight size={20} className="text-ink" />
            </button>

            <div className="absolute bottom-2 right-2 bg-ink/60 text-white text-xs font-mono px-2 py-1 rounded">
              {activeIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={image.url}
              onClick={() => setActiveIndex(index)}
              className={`relative w-16 h-16 shrink-0 rounded-md overflow-hidden border-2 transition-colors ${
                index === activeIndex ? "border-harbor" : "border-transparent"
              }`}
            >
              <Image
                src={image.url}
                alt={image.altText ?? `${productName} view ${index + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}