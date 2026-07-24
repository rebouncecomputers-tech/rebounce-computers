const tickerMessages = [
  " Free delivery in Mombasa on orders over KES 5,000",
  " M-Pesa · Card · Cash on Delivery",
  " Genuine warranty on all products",
  " Same-day delivery across Mombasa",
];

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.55.55.9 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 01-1.15 1.76 4.9 4.9 0 01-1.76 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.76-1.15 4.9 4.9 0 01-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76A4.9 4.9 0 015.44 2.53c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.25a3.25 3.25 0 110-6.5 3.25 3.25 0 010 6.5zm5.4-8.5a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 5.82c-.97-.9-1.5-2.16-1.5-3.5h-3.02v13.86c0 1.4-1.14 2.53-2.53 2.53a2.53 2.53 0 01-2.53-2.53c0-1.4 1.13-2.53 2.53-2.53.24 0 .47.03.69.1V10.6a5.6 5.6 0 00-.69-.04A5.55 5.55 0 002.98 16.1a5.55 5.55 0 005.57 5.54 5.55 5.55 0 005.56-5.54V9.29a8.4 8.4 0 004.9 1.56V7.83c-.9 0-1.75-.24-2.4-.83a4.6 4.6 0 01-1.02-1.18z" />
    </svg>
  );
}

export default function TopBar() {
  return (
    <div className="bg-harbor text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-6">
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-12 whitespace-nowrap animate-marquee">
            {[...tickerMessages, ...tickerMessages].map((msg, i) => (
              <span
                key={i}
                className="font-display font-bold text-sm uppercase tracking-wide"
              >
                {msg}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a href="#" aria-label="Facebook" className="hover:text-coral transition-colors">
            <FacebookIcon />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-coral transition-colors">
            <InstagramIcon />
          </a>
          <a href="#" aria-label="TikTok" className="hover:text-coral transition-colors">
            <TikTokIcon />
          </a>
        </div>
      </div>
    </div>
  );
}