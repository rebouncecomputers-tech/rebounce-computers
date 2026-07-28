import Link from "next/link";
import { Truck, ShieldCheck, Smartphone, BadgeCheck } from "lucide-react";
import FeaturedCardStack from "./featuredCardStack";

const trustMarkers = [
  { icon: ShieldCheck, label: "Genuine warranty on all products" },
  { icon: Truck, label: "Same-day delivery in Mombasa" },
  { icon: Smartphone, label: "Pay via M-Pesa, card, or cash" },
  { icon: BadgeCheck, label: "Verified refurbished stock" },
];

export default function Hero() {
  return (
    <div className="px-4 py-8">
      <section className="max-w-7xl mx-auto bg-harbor text-white rounded-2xl overflow-hidden">
        <div className="px-6 sm:px-10 py-14 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-tight text-white">
              Genuine tech,
              <br />
              <span className="text-coral">honest prices.</span>
            </h1>
            <p className="mt-4 text-white text-base sm:text-lg font-medium leading-relaxed max-w-md">
              Laptops, desktops, printers and accessories — new and verified
              refurbished — delivered across Mombasa and Kenya.
            </p>
            <div className="mt-8 flex gap-3">
              <Link
                href="/catalogue/laptops"
                className="bg-coral hover:bg-coral-dark transition-colors px-6 py-3 rounded-md font-semibold text-base text-white"
              >
                Shop Laptops
              </Link>
              <Link
                href="/deals/hot-deals"
                className="border border-white/60 hover:border-white transition-colors px-6 py-3 rounded-md font-semibold text-base text-white"
              >
                View Hot Deals
              </Link>
            </div>
          </div>

          <FeaturedCardStack />
        </div>

        <div className="border-t border-white/20 bg-harbor-dark">
          <div className="px-6 sm:px-10 py-3 flex flex-wrap gap-x-8 gap-y-2 justify-between text-sm font-semibold text-white">
            {trustMarkers.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={14} className="text-coral" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}