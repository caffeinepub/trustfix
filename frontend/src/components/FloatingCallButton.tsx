import { useRef, useState } from 'react';
import { Phone } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const CALL_NUMBER = 'tel:8884447229';
const LONG_PRESS_DURATION = 500;

export default function FloatingCallButton() {
  const [isPressed, setIsPressed] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCall = () => {
    window.location.href = CALL_NUMBER;
  };

  const handlePointerDown = () => {
    setIsPressed(true);
    longPressTimer.current = setTimeout(() => {
      window.location.href = CALL_NUMBER;
    }, LONG_PRESS_DURATION);
  };

  const handlePointerUp = () => {
    setIsPressed(false);
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handlePointerLeave = () => {
    setIsPressed(false);
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleCall}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerLeave}
            aria-label="Call TrustFix"
            className={`
              fixed left-4 top-1/2 -translate-y-1/2 z-50
              w-13 h-13 md:w-15 md:h-15
              rounded-full
              flex items-center justify-center
              text-white
              shadow-[0_4px_20px_rgba(37,211,102,0.45)]
              transition-transform duration-200 ease-out
              hover:scale-110 focus-visible:scale-110
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2
              select-none
              ${isPressed ? 'scale-95' : ''}
            `}
            style={{
              background: '#25D366',
              width: '52px',
              height: '52px',
            }}
          >
            <Phone
              className="text-white"
              style={{ width: '24px', height: '24px' }}
              strokeWidth={2.2}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={8}
          className="bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded"
        >
          Call TrustFix
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
