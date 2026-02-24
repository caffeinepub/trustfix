import { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SuccessPopupProps {
  title: string;
  message: string;
  onClose: () => void;
}

export default function SuccessPopup({ title, message, onClose }: SuccessPopupProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <Card className="max-w-md w-full mx-4 bg-white shadow-2xl animate-slide-up">
        <CardContent className="p-8 text-center relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-2 right-2"
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="mb-4 animate-bounce-slow">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{message}</p>

          <Button
            onClick={onClose}
            className="mt-6 bg-trustfix-green hover:bg-trustfix-green/90 text-white"
          >
            Close
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
