"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type CardData = {
  id: number;
  label: string;
  image: string; // swap these for real product images later
};

const CARDS: CardData[] = [
  {
    id: 1,
    label: "Laptops",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    label: "Printers",
    image:
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eabf?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    label: "Accessories",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
  },
];

// Slot 0 = front, 1 = back-right, 2 = back-left (matches your original layout)
const SLOTS = [
  { x: 0, rotate: 0, scale: 1, zIndex: 30 },
  { x: 72, rotate: -6, scale: 0.9, zIndex: 20 },
  { x: -48, rotate: 3, scale: 0.9, zIndex: 10 },
];

export default function FeaturedCardStack() {
  const [order, setOrder] = useState([0, 1, 2]); // indices into CARDS, position = slot

  useEffect(() => {
    const interval = setInterval(() => {
      setOrder((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first]; // rotate front card to the back
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex justify-center items-center relative h-80 w-80">
      {order.map((cardIndex, slotIndex) => {
        const card = CARDS[cardIndex];
        const slot = SLOTS[slotIndex];

        return (
          <motion.div
            key={card.id}
            className="absolute w-64 h-64 rounded-xl shadow-xl overflow-hidden bg-white flex items-center justify-center"
            animate={{
              x: slot.x,
              rotate: slot.rotate,
              scale: slot.scale,
              zIndex: slot.zIndex,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
          >
            {slotIndex === 0 ? (
              <>
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-harbor text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {card.label}
                </span>
              </>
            ) : (
              <div className="w-full h-full bg-white/20" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}