"use client";

import { useState } from "react";
import Image from "next/image";

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

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square bg-sand rounded-lg overflow-hidden">
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
      </div>

      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((image, index) => (
            <button
              key={image.url}
              onClick={() => setActiveIndex(index)}
              className={`relative w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
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