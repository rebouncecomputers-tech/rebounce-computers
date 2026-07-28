import Link from "next/link";
import { Phone, Mail, Globe, Smartphone, CreditCard, Truck, ShieldCheck } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms and Conditions", href: "/terms" },
  { name: "Careers", href: "/careers" },
  { name: "Contact Us", href: "/contact" },
];

const businessLinks = [
  { name: "My Account", href: "/account" },
  { name: "Shop", href: "/catalogue" },
  { name: "Wish List", href: "/wishlist" },
  { name: "Cart", href: "/cart" },
  { name: "Checkout", href: "/checkout" },
];

const paymentMethods = [
  { name: "M-Pesa", icon: Smartphone },
  { name: "Visa", icon: CreditCard },
  { name: "Mastercard", icon: CreditCard },
  { name: "Cash on Delivery", icon: Truck },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="max-w-7xl mx-auto px-4 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <h3 className="font-display font-semibold text-white text-lg uppercase mb-4">
            Who We Are
          </h3>
          <p className="text-sm leading-relaxed text-white/60">
            Rebounce Computers is a team of tech enthusiasts dedicated to
            connecting you with the perfect computer solution — genuine and
            verified refurbished hardware for creatives, startups, and
            established businesses.
          </p>
          <div className="flex gap-4 mt-5 text-sm">
            <a href="#" className="hover:text-coral transition-colors flex items-center gap-1.5">
              <Globe size={16} /> Facebook
            </a>
            <a href="#" className="hover:text-coral transition-colors flex items-center gap-1.5">
              <Globe size={16} /> Instagram
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display font-semibold text-white text-lg uppercase mb-4">
            Contact Us
          </h3>
          <ul className="text-sm space-y-2.5 text-white/60">
            <li>Mombasa Branch</li>
            <li>Mwembe Tayari</li>
            <li>HillTop Plaza, Behind Naivas SM</li>
            <li className="flex items-center gap-2 pt-1">
              <Phone size={14} /> +254 792 572737
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} /> +254 101 372737
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} /> info@rebounce.co.ke
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display font-semibold text-white text-lg uppercase mb-4">
            Quick Links
          </h3>
          <ul className="text-sm space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-white/60 hover:text-white transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display font-semibold text-white text-lg uppercase mb-4">
            Business
          </h3>
          <ul className="text-sm space-y-2.5">
            {businessLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-white/60 hover:text-white transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Payment methods & trust badges */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-sm text-white/50">
            <ShieldCheck size={18} className="text-coral" />
            Secure payments, genuine products
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {paymentMethods.map(({ name, icon: Icon }) => (
              <div
                key={name}
                className="flex items-center gap-2 border border-white/15 rounded-md px-3.5 py-2 text-xs font-mono text-white/70"
              >
                <Icon size={14} />
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/40">
          <span>© {new Date().getFullYear()} Rebounce Computers Ltd. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/refund-policy" className="hover:text-white transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}