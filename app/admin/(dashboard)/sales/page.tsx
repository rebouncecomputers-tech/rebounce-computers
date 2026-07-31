import { TrendingUp } from "lucide-react";
import { formatKes } from "@/lib/format";

const stats = [
  { label: "Total Revenue", value: formatKes(0) },
  { label: "Orders Completed", value: "0" },
  { label: "Average Order Value", value: formatKes(0) },
];

export default function SalesPage() {
  return (
    <div>
      <h1 className="font-display font-semibold text-2xl uppercase text-ink mb-6">
        Sales
      </h1>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-line rounded-lg p-5">
            <p className="text-xs font-mono uppercase text-ink/40 mb-1">{stat.label}</p>
            <p className="font-display font-semibold text-xl text-ink">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-line rounded-lg py-20 flex flex-col items-center justify-center text-center">
        <TrendingUp size={40} className="text-ink/20 mb-3" />
        <p className="text-ink/60 font-medium">No sales data yet</p>
        <p className="text-sm text-ink/40 mt-1">
          Charts and trends will populate once orders start coming in.
        </p>
      </div>
    </div>
  );
}