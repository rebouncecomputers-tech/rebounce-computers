"use client";

import { useEffect, useState } from "react";

function getTimeLeft(endsAt: Date) {
  const diff = endsAt.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer({ endsAt }: { endsAt: string | Date }) {
  const target = new Date(endsAt);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(interval);
  }, [target]);

  if (!timeLeft) return <span className="font-mono text-xs text-white/60">Deal ended</span>;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center gap-1 font-mono text-sm">
      {timeLeft.days > 0 && (
        <>
          <span className="bg-ink text-white px-1.5 py-0.5 rounded">{timeLeft.days}d</span>
          <span>:</span>
        </>
      )}
      <span className="bg-ink text-white px-1.5 py-0.5 rounded">{pad(timeLeft.hours)}</span>
      <span>:</span>
      <span className="bg-ink text-white px-1.5 py-0.5 rounded">{pad(timeLeft.minutes)}</span>
      <span>:</span>
      <span className="bg-ink text-white px-1.5 py-0.5 rounded">{pad(timeLeft.seconds)}</span>
    </div>
  );
}