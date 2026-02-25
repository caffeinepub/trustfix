import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = router.subscribe('onLoad', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}
