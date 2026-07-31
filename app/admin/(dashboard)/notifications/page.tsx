import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div>
      <h1 className="font-display font-semibold text-2xl uppercase text-ink mb-6">
        Notifications
      </h1>
      <div className="bg-white border border-line rounded-lg py-20 flex flex-col items-center justify-center text-center">
        <Bell size={40} className="text-ink/20 mb-3" />
        <p className="text-ink/60 font-medium">All caught up</p>
        <p className="text-sm text-ink/40 mt-1">
          New order alerts and low-stock warnings will appear here.
        </p>
      </div>
    </div>
  );
}