import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Truck, BadgeCheck } from "lucide-react";

const perks = [
  { icon: ShieldCheck, label: "Genuine warranty" },
  { icon: Truck, label: "Fast delivery" },
  { icon: BadgeCheck, label: "Track your orders" },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-sand p-2">
      <div className="min-h-[calc(100vh-1rem)] bg-harbor rounded-3xl relative overflow-hidden flex flex-col items-center justify-center px-6 py-12">
        {/* Decorative shapes */}
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/5 rounded-full" />
        <div className="absolute bottom-10 -left-10 w-40 h-40 bg-coral/20 rounded-full" />
        <div className="absolute top-1/4 left-10 w-24 h-24 bg-white/10 rounded-xl rotate-12 hidden sm:block" />
        <div className="absolute bottom-1/4 right-14 w-16 h-16 bg-coral/30 rounded-xl -rotate-12 hidden sm:block" />

        <Link href="/" className="relative z-10 mb-8">
          <Image src="/logo.png" alt="Rebounce" width={90} height={38} />
        </Link>

        <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl p-8 sm:p-10 text-center">
          {children}
        </div>

        <ul className="relative z-10 flex flex-wrap items-center justify-center gap-6 mt-8">
          {perks.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-white/70 text-sm">
              <Icon size={16} className="text-coral shrink-0" />
              {label}
            </li>
          ))}
        </ul>

        <p className="relative z-10 font-mono text-xs text-white/40 mt-6">
          © {new Date().getFullYear()} Rebounce Computers Ltd.
        </p>
      </div>
    </div>
  );
}