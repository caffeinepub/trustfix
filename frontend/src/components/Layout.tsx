import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';
import FloatingCallButton from './FloatingCallButton';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* TrustFix logo watermark background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'url(/assets/file_00000000d2747206831923d1f7e53476.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '300px',
          opacity: 0.04,
        }}
      />

      <Navbar />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
      {/* Left-side floating call button */}
      <FloatingCallButton />
      {/* Right-side floating WhatsApp button */}
      <FloatingWhatsAppButton />
    </div>
  );
}
