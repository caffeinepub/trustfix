import { SiWhatsapp } from 'react-icons/si';

export default function FloatingWhatsAppButton() {
  return (
    <a
      href="https://wa.me/918884447229"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebe57] text-white p-4 rounded-full shadow-2xl hover:shadow-[#25D366]/50 transition-all duration-300 transform hover:scale-110 animate-pulse-slow group"
      aria-label="Chat on WhatsApp"
    >
      <SiWhatsapp className="h-7 w-7" />
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
      </span>
    </a>
  );
}
